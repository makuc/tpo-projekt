var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var predmetnikSchema = new mongoose.Schema({
    
});

// Save this Scheme as a model
mongoose.model('Predmetnik', predmetnikSchema, 'Predmetniki');