var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var studijskiProgramSchema = new mongoose.Schema({
    sifra: {type: Number, required: true},
    naziv: {type: String, required: true}
});

// Save this Scheme as a model
mongoose.model('StudijskiProgram', studijskiProgramSchema, 'StudijskiProgrami');