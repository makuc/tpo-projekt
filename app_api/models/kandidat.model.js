var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var kandidatSchema = new mongoose.Schema({
    vpisna_stevilka: {type: ObjectId, ref: 'Student', required: true},
    studijski_program: {type: ObjectId, ref: 'StudijskiProgram', required: true}
});

// Save this Scheme as a model
mongoose.model('Kandidat', kandidatSchema, 'Kandidati');