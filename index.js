const express = require("express");

const router = require("./routes")
const session = require("./middleware/session")

const app = express();

// If behind a proxy (e.g. Nginx) you need to set this to true
// app.set("trust proxy", 1);

app.use(session)
app.use(router)

app.listen(8000, () => {
  console.log("Server running on port 8000");
})