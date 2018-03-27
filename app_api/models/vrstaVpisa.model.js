var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var imeSchema = new mongoose.Schema({
    koda: {type: Number, required: true},
    naziv: {type: String, required: true},
    
});

// Save this Scheme as a model
mongoose.model('Ime', imeSchema, 'Imena');