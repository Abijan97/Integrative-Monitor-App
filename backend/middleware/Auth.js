const tokenAdapter = require("../adapters/token");

module.exports = (req, res, next) => {
  try {
    const token = req.body.user;
    if (!token)
      return res
        .status(401)
        .json({ error: "Access denied. No token provided" });

    const decoded = tokenAdapter.decodeToken(token);

    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};
