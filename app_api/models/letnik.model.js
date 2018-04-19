var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var letnikSchema = new mongoose.Schema({
    studijskiProgram: {type: ObjectId, ref: 'StudijskiProgram', required: true},
    pogoj_letnik: {type: ObjectId, ref: 'Letnik', required: false},
    naziv: {type: String, required: true}
});

// Save this Scheme as a model
mongoose.model('Letnik', letnikSchema, 'Letniki');