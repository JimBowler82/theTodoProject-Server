const jwt = require("jsonwebtoken");

function authoriseUser(req, res, next) {
  console.log(`Authorise middleware`);
  try {
    const [type, token] = req.headers.authorization.split(" ");
    if (type !== "Bearer") {
      console.log(`Type not Bearer`);
      res.status(401).json({
        success: false,
        message: "User is not logged in",
      });
    } else {
      console.log("Token found, attempting to verify ...");
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        // if error
        if (err) {
          console.log("Error decoding token");
          res.status(401).json({
            success: false,
            message: "User is not logged in",
          });
        } else {
          console.log("Token decode success!");
          req.userId = decoded.id;
          next();
        }
      });
    }
  } catch (err) {
    console.log(`Error on checkLoggedIn, proceeding to log in route `);
    next();
  }
}

function checkLoggedIn(req, res, next) {}

module.exports = { authoriseUser, checkLoggedIn };
