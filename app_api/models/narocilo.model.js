var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var vrstaVpisaSchema = new mongoose.Schema({
    datum: {type: Date, "default": Date.now()},
    vpis: {type: ObjectId, ref: "Vpis", required: true},
    
    izvodov: {type: Number, "default": 1},
    
    opravljeno: {type: Boolean, "default": false}
});

// Save this Scheme as a model
mongoose.model('Narocilo', vrstaVpisaSchema, 'Narocila');