var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var letnikSchema = new mongoose.Schema({
    naziv: {type: String, required: true}
});

// Save this Scheme as a model
mongoose.model('Letnik', letnikSchema, 'Letniki');