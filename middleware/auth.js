const jwt = require('jsonwebtoken');
const {transErrors} = require('../lang/vi')

exports.auth = async function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  // Check if not token
  if (!token) {
    return res.status(401).json({ error: transErrors.enter_account });
  }
  // Verify token
  try {
    await jwt.verify(token, process.env.JWT_SECRET, (error, decoded)=>{
      if(error){
        res.status(401).json({ message: transErrors.token_undefined });
      }
      else{
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    res.status(500).json({ error: transErrors.server_error });
  }
};