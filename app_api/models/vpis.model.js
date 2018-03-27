var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var vpisSchema = new mongoose.Schema({
    
});

// Save this Scheme as a model
mongoose.model('Vpis', vpisSchema, 'Vpisi');