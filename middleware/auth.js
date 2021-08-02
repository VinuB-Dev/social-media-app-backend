const jwt = require("jsonwebtoken");
const secret = process.env['jwt-secret'];

const verifyAuth = (req, res, next) => {
  const userToken = req.headers.authorization;
  const decoded  = jwt.verify(userToken, secret);
  if(decoded  && decoded.uid){
    req.uid = decoded.uid;
    next();
  }else{
    res.status(401).json({
      success: false,
      error: {
        message: "Unauthorized"
      }
    })
  }
}

module.exports = verifyAuth;