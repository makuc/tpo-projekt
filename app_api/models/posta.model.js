var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var postaSchema = new mongoose.Schema({
    postna_stevilka: {type: String, required: true},
    naziv: {type: String, required: true}
});

// Save this Scheme as a model
mongoose.model('Posta', postaSchema, 'Poste');