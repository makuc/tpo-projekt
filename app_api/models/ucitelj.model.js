var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var uciteljSchema = new mongoose.Schema({
    
});

// Save this Scheme as a model
mongoose.model('Ucitelj', uciteljSchema, 'Ucitelji');