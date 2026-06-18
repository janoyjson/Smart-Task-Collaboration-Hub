const jwt = require("jsonwebtoken");

const authetincateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({
      msg: "No Token To Verify!!",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ errors: [{ msg: "Invalid Token" }] });
    }
    req.user = user;
    next();
  });
};

module.exports = authetincateToken;
