var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var delPredmetnikaSchema = new mongoose.Schema({
    sifra: {type: Number, required: true},
    naziv: {type: String, required: true},
    
    obvezen: {type: Boolean, required: true},
    
    strokovni: {type: Boolean, "default": false},
    modul: {type: Boolean, "default": false},
    
    valid: {type: Boolean, "default": true}
});

// Save this Scheme as a model
mongoose.model('DelPredmetnika', delPredmetnikaSchema, 'DeliPredmetnika');