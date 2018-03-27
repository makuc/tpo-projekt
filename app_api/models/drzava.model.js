var mongoose = require('mongoose');

var drzavaSchema = new mongoose.Schema({
    dvomestna_koda: {type: String, required: true, unique: true},
    trimestna_koda: {type: String, required: true, unique: true},
    numericna_oznaka: {type: Number, required: true, unique: true},
    ISO_naziv: {type: String, required: true},
    slovenski_naziv: {type: String, required: true},
    opomba: {type: String, required: false}
});

// Save this Scheme as a model
mongoose.model('Drzava', drzavaSchema, 'Drzave');