var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var rokSchema = new mongoose.Schema({
    
});

// Save this Scheme as a model
mongoose.model('Rok', rokSchema, 'Roki');