const authMiddleware = (req, res, next) => {
  const header = req.headers["authorization"];
  console.log(header);
};
module.exports = authMiddleware;
