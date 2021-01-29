const jwt = require("jsonwebtoken");

function authoriseUser(req, res, next) {
  console.log(`Authorise middleware`);
  if (req.headers.reject === true) return res.send("Access Denied!");
  next();
}

module.exports = { authoriseUser };
