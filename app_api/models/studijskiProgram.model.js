var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var studijskiProgramSchema = new mongoose.Schema({
    sifra: {type: String, required: true},
    naziv: {type: String, required: true},
    vrstaStudija: {type: ObjectId, ref: 'VrstaStudija', required: false},
    semestri: {type: Number, required: false},
    sifraEVS: {type: Number, required: false}
});

// Save this Scheme as a model
mongoose.model('StudijskiProgram', studijskiProgramSchema, 'StudijskiProgrami');