module.exports = function(req, res, next) {
  var exec;
  
  if(Array.isArray(next)) {
    if(next.length == 0) {
      console.log("[callNext]: ni naslednje funkcije");
      return res.status(403).json({ message: "Napačna konfiguracija funkcije [callNext]" });
    }
    
    exec = next.shift();
    
  } else {
    exec = next;
  }
  
  if(typeof exec === 'function') {
    if(next.length > 0) {
      exec(req, res, next);
    } else{
      exec(req, res);
    }
  } else {
    console.log("[callNext]: naslednja funkcija neveljavna");
    return res.status(403).json({ message: "Napačna konfiguracija funkcije [callNext]" });
  }
};