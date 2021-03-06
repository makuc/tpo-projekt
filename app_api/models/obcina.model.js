var mongoose = require('mongoose');

var obcinaSchema = new mongoose.Schema({
    sifra: {type: Number, required: true, unique: true},
    ime: {type: String, required: true},
    
    valid: {type: Boolean, "default": true}
});

// Save this Scheme as a model
mongoose.model('Obcina', obcinaSchema, 'Obcine');