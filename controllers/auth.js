function handleLogin(req, res) {
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
}

module.exports = handleLogin
