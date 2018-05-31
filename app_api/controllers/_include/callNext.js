let debug = require("debug")("callNext");

module.exports = function(req, res, next) {
  var exec;
  
  var cont = true;
  
  if(Array.isArray(next)) {
    if(next.length == 0) {
      debug("ni naslednje funkcije");
      
      res.status(403).json({ message: "Napačna konfiguracija funkcije [callNext]" });
      cont = false;
    }
    
    exec = next.shift();
    
  } else {
    exec = next;
  }
  
  if(cont)
  {
    if(typeof exec === 'function') {
      if(next.length > 0) {
        exec(req, res, next);
      } else{
        process.nextTick( function() {
            exec(req, res);
        });
      }
    } else {
      debug("naslednja funkcija neveljavna");
      
      res.status(403).json({ message: "Napačna konfiguracija funkcije [callNext]" });
    }
  }
};