
// Check if provided string is formatted as a proper EMAIL
module.exports.isEmail = function(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
};

// Kliče naslednjo funkcijo podano v Array-u "next"
module.exports.callNext = function(req, res, next) {
    var exec;
    
    if(Array.isArray(next)) {
        if(next.length == 0) {
            console.log("[callNext]: ni naslednje funkcije");
            res.status(403).json({ message: "Napačna konfiguracija funkcije [callNext]" });
        }
        
        exec = next.shift();
    } else
        exec = next;
    
    if(typeof exec === 'function') {
        if(next.length === 0)
            exec(req, res);
        else
            exec(req, res, next);
    } else {
        console.log("[callNext]: naslednja funkcija neveljavna");
        res.status(403).json({ message: "Napačna konfiguracija funkcije [callNext]" });
    }
};