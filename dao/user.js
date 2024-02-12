const bcrypt = require('bcrypt');

const users = {
  "user1@example.com": {
    pwHash: bcrypt.hashSync("password1", 10),
    roles: ["user"],
    id: "176a5673-b9dc-422c-8c8f-142af8927b27"
  },
  "user2:example.com": {
    pwHash: bcrypt.hashSync("password2", 10),
    roles: ["user"],
    id: "b609a04e-8fb2-457d-96c7-4b1275611776"
  },
  "user3@example.com": {
    pwHash: bcrypt.hashSync("password3", 10),
    roles: ["admin"],
    id: "d1db2706-4d57-46d3-adf7-60927f129bc0"
  }
}

// This call would be async and would return a promise in a real application using a real db
async function getUserByEmail(email) {
  const user = users[email];
  return user ? user : Promise.reject("User not found");
}

module.exports = {
  getUserByEmail
}