var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var vrstaVpisaSchema = new mongoose.Schema({
    koda: {type: Number, unique: true, required: true},
    naziv: {type: String, required: true}
});

// Save this Scheme as a model
mongoose.model('VrstaVpisa', vrstaVpisaSchema, 'VrsteVpise');