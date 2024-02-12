const express = require("express");

const router = require("./routes")
const corsMiddleware = require("./middleware/cors")
const session = require("./middleware/session")

const app = express();
app.use(express.json());

// If behind a proxy (e.g. Nginx) you need to set this to true
// app.set("trust proxy", 1);

app.options('*', corsMiddleware)
app.use(corsMiddleware)

app.use(session)
app.use(router)

process.on('warning', e => console.warn(e.stack))

app.listen(8000, () => {
  console.log("Server running on port 8000");
})