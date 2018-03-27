var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var prijavaSchema = new mongoose.Schema({
    
});

// Save this Scheme as a model
mongoose.model('Prijava', prijavaSchema, 'Prijave');