const {LoginService} = require("../service/auth");

async function handleLogin(req, res) {
    const {email, password} = req.body;

    // perform payload validation - in production, you should use a library like joi to validate the payload
    if (!email || !password) return res.status(400).json("Both email and password are required");
  
    // check credentials are correct and return user
  
    try {
      const user = await LoginService(email, password);
      req.session.user = user;
      return res.sendStatus(200);
    } catch (error) {
    // in production you should use a proper loggin library like winston
     console.error(error); 
     return res.status(401).json(error);
    } 
}

module.exports = handleLogin
