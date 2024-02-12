const express = require("express")

const authenticate = require("../middleware/authenticate");
const handlePublicRoute = require("../controllers/public")
const handleGetUser = require("../controllers/user")
const handleLogin = require("../controllers/auth")

const router = express.Router()

router.get("/", handlePublicRoute)

router.post("/login", handleLogin)

// all routes below are protected and can only be accessed if the user is logged in
router.use(authenticate)

// add all routes that need authentication here
router.get("/user", handleGetUser)

module.exports = router