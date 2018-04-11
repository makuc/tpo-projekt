var jwt = require("jsonwebtoken");

var Student = require("../student.controller");
//var Zaposlen = require("../zaposlen.controller");


module.exports.private = function(req, res, next) {
    req.splitUrl = req.originalUrl;
    req.splitUrl = req.splitUrl.split(/[\/?#]/g);
    
    if(req.splitUrl[1] == "api") {
        // Check if user has been authenticated
        if (!req.user) 
            return res.status(403).send({ auth: false, message: 'Ni podanega veljavnega tokena JWT' });
        return next();
    } else
        next();
};
module.exports.authenticate = function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if(token) {
        // verifies secret and checks expiration
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {      
            if (err) {
                /*if(req.headers['static-page'] !== 'true')
                    console.log("UserID: Guest with invalid token | Url: " + req.originalUrl);*/
                return next();
            }
            // if everything is good, save to request for use in other routes
            req.user = decoded;
            console.log(decoded);
            
            /*if(req.headers['static-page'] !== 'true')
                console.log("UserID: " + decoded._id + " | Email: " + decoded.email + " | Url: " + req.originalUrl);*/
            next();
        });
    } else {
        /*if(req.headers['static-page'] !== 'true')
            console.log("UserID: Guest | Url: " + req.originalUrl);*/
        next();
    }
};
module.exports.admin = function(req, res, next) {
    if(req.splitUrl[1] == "api") {
        // Check if user has been authenticated
        
        //console.log(req.user);
        
        if (!req.user.zaposlen && !req.user.zaposlen.skrbnik) 
            return res.status(403).send({ auth: false, message: 'Token JWT nima skrbniških pravic' });
        return next();
    } else
        next();
}