var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var vrstaStudijaSchema = new mongoose.Schema({
    klasius: {type: String, required: true},
    srv: {type: String, required: true},
    opis_ravni: {type: String, required: true}
});

// Save this Scheme as a model
mongoose.model('VrstaStudija', vrstaStudijaSchema, 'VrsteStudija');