const session = require("express-session")
const RedisStore = require("connect-redis").default
const redisClient = require("../db/redis")

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "session:",
})

module.exports = session({
  store: redisStore,
  secret: "nodesessionauth",  
  name: "sessonId",
  saveUninitialized: false,
  resave: false, // when false it won't save the session if it didn't change
  cookie: {
    secure: false, // if true only transmit cookie over https - this should always be true in production
    httpOnly: true, // if true prevent client side JS from reading the cookie - always set to true
    maxAge: 1000 * 60 * 60, // session max age in miliseconds - 1hr
    sameSite: "lax", // sets cookie sameSite policy
  }
})

