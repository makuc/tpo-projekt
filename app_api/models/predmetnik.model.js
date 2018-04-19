var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var predmetnikSchema = new mongoose.Schema({
    studijski_program: {type: ObjectId, ref: 'StudijskiProgram', required: true},
    studijsko_leto: {type: ObjectId, ref: 'StudijskoLeto', required: true},
    letnik: {type: ObjectId, ref: 'Letnik', required: true},
    del_predmetnika: {type: ObjectId, ref: 'DelPredmetnika', required: true},
    predmeti: [{type: ObjectId, ref: 'Predmet', required: true}],
    
    valid: {type: Boolean, "default": true}
});

// Save this Scheme as a model
mongoose.model('Predmetnik', predmetnikSchema, 'Predmetniki');