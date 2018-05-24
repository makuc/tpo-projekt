var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var narociloIzpitovSchema = new mongoose.Schema({
    datum: {type: Date, "default": Date.now},
    student: {type: ObjectId, ref: "Student", required: true},
    
    izvodov: {type: Number, "default": 1},
    
    opravljeno: {type: Boolean, "default": false}
});

// Save this Scheme as a model
mongoose.model('NarociloIzpitov', narociloIzpitovSchema, 'NarocilaIzpitov');