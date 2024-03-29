const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
  console.log("auth details")
  // console.log(req.headers.authorization);
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      const token = req.headers.authorization.split(' ')[1]
      //console.log(token)
      if (!token) {
        return res.status(401).json({ msg: "No authentication token. Authorization denied." });
      }
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      console.log(verified)
      if (!verified) {
        return res.status(401).json({ msg: "Verification failed. Authorization denied." });
      }
      req.user = verified.id;
      next();
    } catch (err) {
      if (err.message === 'invalid token') {
        return res.json(false);
      }
      res.status(500).json({ error: err.message });
    }
  }
  else {
    return res.status(401).json({ msg: "No authentication token Authorization denied." });
  }
};
module.exports = auth;