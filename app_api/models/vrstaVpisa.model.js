var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var vrstaVpisaSchema = new mongoose.Schema({
    koda: {type: Number, required: true},
    naziv: {type: String, required: true},
    opis: {type: String, required: false}
    // incomplete
});

// Save this Scheme as a model
mongoose.model('VrstaVpisa', vrstaVpisaSchema, 'VrsteVpise');