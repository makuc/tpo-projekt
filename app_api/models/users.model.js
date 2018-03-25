var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    hashed: {type: String, required: true},
    salt: {type: String, required: true},
    
    date_registered: {type: Date, "default": Date.now},
    library: [{type: mongoose.Schema.Types.ObjectId, ref: 'Novel', required: false}]
});
userSchema.virtual('mynovels', {
    ref: 'Novel',
    localField: '_id',
    foreignField: 'author'
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
    var exp = "1h";
    var expires = Date.now();
    if(remember) {
        exp = "31d";
        expires += (31 * 24 * 60 *60 * 1000); // = 31 dni * 24 ur * 60 min * 60s * 1000
    } else
        expires += 60 * 60 * 1000; // = 60 min * 60s * 1000 = 1h

    // User successfully registered -> make a token for it
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
            expires: expires
        },
        process.env.JWT_SECRET,
        {
              expiresIn: exp 
        }
    );
};

// Save this Scheme as a model
mongoose.model('User', userSchema, 'Users');