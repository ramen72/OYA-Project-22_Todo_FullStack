const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.send({ error: `You are not Authorized.` });
  }
  const token = header.split(" ")[1];

  // verify token which get from header by Authorization field.
  jwt.verify(token, process.env.ACCESS_SECRET, (error, decode) => {
    if (error) {
      return res.send({ error: `You are not Authorized.` });
    }
    // set decode value as userInfo into req
    req.userInfo = decode;
    next();
  });
};
module.exports = authMiddleware;
