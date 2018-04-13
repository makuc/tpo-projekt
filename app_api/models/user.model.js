var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
var Zaposlen = mongoose.model("Zaposlen");
var Student = mongoose.model("Student");

var userSchema = new mongoose.Schema({
    student: {type: ObjectId, ref: 'Student', required: false},
    zaposlen: {type: ObjectId, ref: 'Zaposlen', required: false},
    email: {type: String, required: true, unique: true},
    hashed: {type: String, required: true},
    salt: {type: String, required: true},
    
    opombe: {type: String, required: false},
    ponastavi_geslo: {type: String, required: false},
    
    napacne_prijave: {type: String, required: false},
    zadnja_napacna_prijava: {type: Date, required: false}
});
userSchema.virtual('password').set(function(password) {
    this.preHashed = password;
});

userSchema.pre('validate', function(next) {
    if (this.preHashed === undefined)
        return next();
    
    this.setPassword(this.preHashed, next);
});

userSchema.methods.setPassword = function(password, next) {
    var user = this;
    bcrypt.genSalt(10, function(err, salt) {
        if(err) return next(err, false);
        
        bcrypt.hash(password, salt, function(err, hash) {
            if(err) return next(err, false);
            
            user.salt = salt;
            user.hashed = hash;
            return next(null, true); // null = error
        });
    });
};
userSchema.methods.validatePassword = function(password, next) {
    bcrypt.compare(password, this.hashed, function(err, res) {
        if(err) {
            console.log(err);
            return next(err, false);
        }
        
        return next(null, res); // null = error
    });
};
userSchema.methods.genJwt = function(remember) {
    var tokenData = {
        _id: this._id,
        student: this.student,
        zaposlen: this.zaposlen,
        email: this.email,
        exp: "1h",
        expires: Date.now()
    };
    if(remember) {
        tokenData.exp = "31d";
        tokenData.expires += (31 * 24 * 60 *60 * 1000); // = 31 dni * 24 ur * 60 min * 60s * 1000
    } else
        tokenData.expires += 60 * 60 * 1000; // = 60 min * 60s * 1000 = 1h

    // User successfully registered -> make a token for it
   
    return jwt.sign(
        {
            _id: tokenData._id,
            student: tokenData.student,
            zaposlen: tokenData.zaposlen,
            email: tokenData.email,
            expires: tokenData.expires
        },
        process.env.JWT_SECRET,
        {
              expiresIn: tokenData.exp 
        }
    );
};

// Save this Scheme as a model
mongoose.model('User', userSchema, 'Users');