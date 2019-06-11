const jwt =  require("jsonwebtoken");
const config = require("../config");
const errorHandler = require("../Controllers/customers/errorResponse");

module.exports = (req,res,next) => {
  var token = req.headers['USER-KEY'];
  if (!token) return res.status(403).send(errorHandler({code: "NO TOKEN", sqlMessage: null}));
  jwt.verify(token,config.secret, (err,decoded) => {
    if (err) return res.status(401).send(errorHandler({code: "AUTH FAILED", sqlMessage: null}));
    //save to request for use in other routes
    req.customer_id = decoded.id;
    next();
  })

}