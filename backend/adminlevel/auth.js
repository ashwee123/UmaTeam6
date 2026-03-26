// backend/adminlevel/auth.js
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(403);
  }
}

module.exports = authenticate;