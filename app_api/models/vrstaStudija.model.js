var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var vrstaStudijaSchema = new mongoose.Schema({
    sifra: {type: Number, unique: true, required: true},
    opis: {type: String, required: true},
    klasiusSRV: {type: String, required: true},
    predpona: {type: String, required: true},
    
    valid: {type: Boolean, "default": true}
});

// Save this Scheme as a model
mongoose.model('VrstaStudija', vrstaStudijaSchema, 'VrsteStudija');