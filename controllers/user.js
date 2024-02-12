function handleGetUser(req, res) {
  return res.json(req.session.user);
}

module.exports = handleGetUser