var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var letnikSchema = new mongoose.Schema({
    
});

// Save this Scheme as a model
mongoose.model('Letnik', letnikSchema, 'Letniki');