module.exports = function(req, res, next) {
    var exec;
    
    if(Array.isArray(next)) {
        if(next.length == 0) {
            console.log("Vnašanje začetnih podatkov[callNext]: ni naslednje funkcije");
            res.status(403).json({ message: "Napačna konfiguracija funkcij za vnos podatkov" });
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
        console.log("Vnašanje začetnih podatkov[callNext]: naslednja funkcija neveljavna");
        res.status(403).json({ message: "Napačna konfiguracija funkcij za vnos podatkov" });
    }
}