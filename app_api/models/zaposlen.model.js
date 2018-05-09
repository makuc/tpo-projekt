var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var uciteljSchema = new mongoose.Schema({
    priimek: {type: String, required: true},
    ime: {type: String, required: true},
    naziv: {type: String, required: false},
    email: {type: String, required: true},
    
    predavatelj: {type: Boolean, "default": false},
    
    valid: {type: Boolean, "default": true}
});

// Save this Scheme as a model
mongoose.model('Zaposlen', uciteljSchema, 'Zaposleni');