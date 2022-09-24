const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next) {
  // const token = req.header('auth');

  const token = req.cookies.auth;
  if (!token) return res.status(401).send('Session Expired : Login Again');

  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    console.log (decoded)
    req.body.uid = decoded.id;
    next();
  } catch (ex) {
    return res.status(400).send('Session Expired : Login Again');
  }

  return 0;
}

module.exports = auth;
