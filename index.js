const express = require("express");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis").default

// Create a new express application
const app = express();

// If behind a proxy (e.g. Nginx) you need to set this to true
// app.set("trust proxy", 1);

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

redisClient.connect().catch(console.error)
redisClient.on('error', err => console.log('Redis Client Error', err));

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "session:",
})


// Use the session middleware
app.use(session({
  store: redisStore,
  secret: "nodesessionauth",  
  saveUninitialized: false,
  resave: false, // when false it won't save the session if it didn't change
  cookie: {
    secure: false, // if true only transmit cookie over https - this should always be true in production
    httpOnly: true, // if true prevent client side JS from reading the cookie - always set to true
    maxAge: 1000 * 60 * 60, // session max age in miliseconds - 1hr
    sameSite: "lax", // sets cookie sameSite policy
  }
}))

// create a login endpont
app.post("/login", (req, res) => {
  const {email, password} = req;

  // check credentials are correct and return user

  let user = {
    clientId: "12345",
    name: "John Doe",
    email: "test@test.com"
  }

  // if credentials are valid
  req.session.user = user

  res.json("Logged in");
})

// create another middleware to check if user is authenticated
app.use((req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json("Unauthenticated");
  } else {
    next();
  }
})

// add all routes that need authentication here
app.get("/user", (req, res) => {
  return res.json(req.session.user);
})

app.listen(8000, () => {
  console.log("Server running on port 8000");
})