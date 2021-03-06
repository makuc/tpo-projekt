var mongoose = require('mongoose');
var callNext = require("./_include/callNext");
var Utils = require("./_include/utils");
var User = mongoose.model('User');
var Student = mongoose.model("Student");
var Zaposlen = mongoose.model("Zaposlen");
var NeveljavnaPrijava = mongoose.model("NeveljavnaPrijava");


module.exports.login = function(req, res) {
    if(!(req.body && req.body.email && req.body.password))
        return res.status(400).send("Manjkajoči prijavni podatki");
    
    findUserByEmail(req, res, [
        veljavnostPrijave, validatePassword, returnToken
    ]);
};
module.exports.logout = function(req, res) {
    res.status(200).send({ auth: false, token: null });
};

module.exports.getUsers = function(req, res) {
    User
        .find()
        .populate([
            {
                path: "student",
                populate: [
                    {
                        path: "drzava_rojstva",
                        select: "slovenski_naziv -_id"
                    },
                    // Stalno bivališče
                    {
                        path: "stalno_bivalisce_posta",
                        select: "naziv -_id"
                    },
                    {
                        path: "stalno_bivalisce_obcina",
                        select: "ime -_id"
                    },
                    {
                        path: "stalno_bivalisce_drzava",
                        select: "slovenski_naziv -_id"
                    },
                    // Začasno bivališče
                    {
                        path: "zacasno_bivalisce_posta",
                        select: "naziv -_id"
                    },
                    {
                        path: "zacasno_bivalisce_obcina",
                        select: "ime -_id"
                    },
                    {
                        path: "zacasno_bivalisce_drzava",
                        select: "slovenski_naziv -_id"
                    }
                ]
            },
            {
                path: "zaposlen"
            }
        ])
        .exec(function(err, users) {
            if(err) {
                //console.log(err)
                return res.status(400).send({ message: "Napaka pri pridobivanju uporabnikov iz baze" });
            }
            
            res.status(200).json(users);
        });
};

module.exports.getUser = function(req, res) {
    findUserById(req, res, [ returnUser ]);
};
module.exports.updateUser = function(req, res) {
    if(!req.body)
        return res.status(400).json({ message: "Ni podatkov za posodobit uporabnika" });
    
    findUserById(req, res, [ editUser, saveUserChanges, returnUser ]);
};
module.exports.deleteUser = function(req, res) {
    User
        .findByIdAndRemove(req.params.user)
        .exec(function(err, user) {
            if(err) {
                //console.log(err);
                return res.status(404).send({ message: "Requested user cannot be found" });
            }
            
            res.status(204).send(null);
        });
};
module.exports.addUser = function(req, res) {
    if(!req.body)
        return res.status(400).json({ message: "Ni podatkov za kreiranje uporabnika" });
    
    validateNewUserData(req, res, [
        checkEmailAlreadyExists, validateStudent, validateZaposlen,
        
        createUser, returnUser
    ]);
};

module.exports.pozabljenoGeslo = function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if(err || !user) {
            return res.status(404).json({ message: "Uporabnik ne obstaja" });
        }
        
        user.ponastavi_geslo = getRandomId();
        req.user = user;
        
        req.user.save(function(err, user) {
            if(err) {
                //console.log(err);
                return res.status(400).send({ message: "Encountered error while saving user" });
            }
            
            res.status(200).json({ ponastavi_geslo: user.ponastavi_geslo });
        });
    });
};
module.exports.ponastaviGeslo = function(req, res) {
    User.findOne({ ponastavi_geslo: req.params.ponastavi_geslo }, function(err, user) {
        if(err || !user) {
            return res.status(404).json({ message: "Uporabnika za ponastavitev ne najdem" });
        }
        user.password = req.body.password;
        user.ponastavi_geslo = undefined;
        
        user.save(function(err, user) {
            if(err) {
                //console.log(err);
                return res.status(400).send({ message: "Napaka pri shranjevanju uporabnika" });
            }
            
            res.status(200).json({ success: true });
        });
    });
};

function validateNewUserData(req, res, next) {
    
    if(!(req.body && (req.body.student || req.body.zaposlen) && req.body.email && req.body.password))
        return res.status(400).send({ message: "Ni dovolj podatkov za kreiranje novega uporabnika" });
    
    if(!Utils.isEmail(req.body.email))
        return res.status(400).send({ message: "Neveljaven email maslov" });
    
    callNext(req, res, next);
}
function validateZaposlen(req, res, next) {
    if(!req.body.zaposlen)
        return callNext(req, res, next);
    
    Zaposlen.findOne({ "_id": req.body.zaposlen }, function(err, zaposlen) {
        if(err) {
            //console.log(err);
            return res.status(400).json({ message: "Neveljaven zaposlen" });
        }
        req.body.zaposlen = zaposlen;
        
        callNext(req, res, next);
    });
}
function validateStudent(req, res, next) {
    if(!req.body.student)
        return callNext(req, res, next);
    
    Student.findOne({ "_id": req.body.student }, function(err, student) {
        if(err) {
            //console.log(err);
            return res.status(400).json({ message: "Neveljaven študent" });
        }
        req.body.student = student;
        
        callNext(req, res, next);
    });
}
function checkEmailAlreadyExists(req, res, next) {
    // Check if user with this email already exists
    User.findOne({email: req.body.email}, function(err, user) {
        if(err)
        {
            console.log("---checkEmailAlreadyExists:\n" + err);
            return res.status(404).send({ message: "Napaka pri pregledu obstoja tega email naslova" });
        }
        
        if(user && !(req.user && user._id.equals(req.user._id)))
            return res.status(409).send({ message: "Ta email naslov je že v uporabi" });
        
        callNext(req, res, next);
    });
}
function createUser(req, res, next) {
    User.create(
        {
            student: req.body.student,
            zaposlen: req.body.zaposlen,
            email: req.body.email,
            password: req.body.password,
            opombe: req.body.opombe
        }, function(err, user) {
            if(err) {
                //console.log(err);
                return res.status(403).send({ message: "Napaka pri ustvarjanju uporabnika" });
            }
            
            req.user = user;
            callNext(req, res, next);
        }
    );
}

function findUserById(req, res, next) {
    User
        .findById(req.params.user)
        .exec(function(err, user) {
            if(err || !user) {
                // console.log(err);
                return res.status(404).send({ message: "Uporabnik s podanim ID-jem ne obstaja" });
            }
            
            req.user = user;
            
            callNext(req, res, next);
        });
}
function findUserByEmail(req, res, next) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if(err || !user) {
            //console.log(err);
            return res.status(404).send({ message: "Ne najdem uporabnika s tem email naslovom" });
        }
        
        req.user = user;
        callNext(req, res, next);
    });
}
function returnUser(req, res) {
    req.user.salt = undefined;
    req.user.hashed = undefined;
    res.status(200).send(req.user);
}
function returnToken(req, res) {
    // If user is found and password is valid, create a token
    var remember_me = false;
    if(req.body.remember) remember_me = true;
    
    var token = req.user.genJwt(remember_me);
    res.status(201).send({ auth: true, token: token });
}

function editUser(req, res, next) {
    if(req.body.password) {
        req.user.password = req.body.password;
    }
    
    if(req.body.email && req.body.email != req.user.email) {
        // Look for duplicate !!
        return checkEmailAlreadyExists(req, res, next);
    } else
        req.body.email = undefined;
    
    callNext(req, res, next);
}
function saveUserChanges(req, res, next) {
    if(req.body.email)
        req.user.email = req.body.email;
    
    req.user.save(function(err, user) {
        if(err) {
            //console.log(err);
            return res.status(400).send({ message: "Encountered error while saving user" });
        }
        
        req.user = user;
        callNext(req, res, next);
    });
}

function validatePassword(req, res, next) {
    // Check if password is valid
    req.user.validatePassword(req.body.password, function(err, valid) {
        if(err || !valid) {
            //console.log(err);
            neveljavnaPrijava(req, res);
            return res.status(401).send({ auth: false, token: null });
        }
        
        callNext(req, res, next);
    });
}

function neveljavnaPrijava(req, res) {
    NeveljavnaPrijava.findOne({ ip: req.headers['x-forwarded-for'] }, function(err, prijava) {
        if(err || !prijava) {
            return dodajNeveljavnoPrijavo(req, res);
        }
        
        // Uredi neuspešno prijavo
        NeveljavnaPrijava.findOne({ ip: req.headers['x-forwarded-for'] }, function(err, prijava) {
            if(err) {
                return;
            }
            prijava.poskusi += 1;
            prijava.zadnji_poskus = Date.now();
            
            prijava.save(function(err, prijava) {
                if(err) {
                    console.log(err);
                    return ;
                }
                console.log("Neveljavna prijava: " + prijava.ip + " - zaporedni poskus: " + prijava.poskusi);
            });
        });
    });
}
function dodajNeveljavnoPrijavo(req, res) {
    NeveljavnaPrijava.create({
        ip: req.headers['x-forwarded-for'],
        poskusi: 1,
        zadnji_poskus: Date.now()
    }, function(err, prijava) {
        if(err) {
            return console.log(err);
        }
        console.log("Neveljavna prijava: " + prijava.ip + " - zaporedni poskus: 1");
    });
}
function veljavnostPrijave(req, res, next) {
    NeveljavnaPrijava.findOne({ ip: req.headers['x-forwarded-for'] }, function(err, prijava) {
        if(err || !prijava) {
            return callNext(req, res, next);
        }
        if(prijava.zadnji_poskus < Date.now() - 15 * 60 * 1000) { // 15 minut
            prijava.poskusi = 0;
        }
        if(prijava.poskusi > 3) {
            return res.status(401).json({ message: "Začasno onemogočena prijava" });
        }
        
        prijava.save(function(err, prijava) {
            if(err) {
                return console.log(err);
            }
            callNext(req, res, next);
        });
    });
}

function getRandomId() {
    var nabor = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_";
    var dolzina = 20;
    var geslo = "";
    for (var i = 0; i < dolzina; ++i) 
    {
        geslo += nabor.charAt(Math.floor(Math.random() * nabor.length * 12345) % nabor.length);
    }
    return geslo;
};