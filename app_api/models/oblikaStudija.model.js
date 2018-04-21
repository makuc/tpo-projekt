var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var oblikaStudijaSchema = new mongoose.Schema({
    sifra: {type: Number, required: true, unique: true},
    naziv: {type: String, required: true},
    
    valid: {type: Boolean, "default": true}
});

// Save this Scheme as a model
mongoose.model('OblikaStudija', oblikaStudijaSchema, 'OblikeStudija');