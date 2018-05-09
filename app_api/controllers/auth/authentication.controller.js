var jwt = require("jsonwebtoken");

module.exports.skrbnik = function(req, res, next) {
  if(req.user && req.user.skrbnik)
    next();
  else
    return res.status(403).json({ message: "Nimaš pravic za dostopanje do te povezave"});
};
module.exports.referentka = function(req, res, next) {
  if(req.user && req.user.referentka)
    next();
  else
    return res.status(403).json({ message: "Nimaš pravic za dostopanje do te povezave"});
};
module.exports.authenticate = function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if(token) {
        // verifies secret and checks expiration
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {      
            if (err) {
                return next();
            }
            // if everything is good, save to request for use in other routes
            req.user = decoded;
            //console.log(decoded);
            
            next();
        });
    } else {
        next();
    }
};
