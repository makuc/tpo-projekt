var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var izvedbaPredmetaSchema = new mongoose.Schema({
    
});

// Save this Scheme as a model
mongoose.model('IzvedbaPredmeta', izvedbaPredmetaSchema, 'IzvedbePredmetov');