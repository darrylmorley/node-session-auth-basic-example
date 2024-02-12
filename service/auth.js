const bcrypt = require('bcrypt')

const { getUserByEmail } = require( "../dao/user");

async function LoginService(email, password) {
  try {   
    // lookup user in database by email
    const user = await getUserByEmail(email)
  
    // if user is found, compare password with stored password
    const match = await bcrypt.compare(password, user.pwHash)
  
    if (match) {
      return {id: user.id, roles: user.roles}
    } else {
      return Promise.reject("Invalid credentials")
    }
  } catch (error) {
    return Promise.reject("User not found")
  }
}

module.exports = {
  LoginService
}