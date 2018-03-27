var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var izpitSchema = new mongoose.Schema({
    
});

// Save this Scheme as a model
mongoose.model('Izpit', izpitSchema, 'Izpiti');