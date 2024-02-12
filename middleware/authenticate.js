// create another middleware to check if user is authenticated
function authenticate(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json("Unauthenticated");
  } else {
    next();
  }
}

module.exports = authenticate