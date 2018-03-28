var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


var polagalecSchema = new mongoose.Schema({
    student: {type: ObjectId, ref: 'Student', required: true},
    zaporedni_poskus: {type: Number, min: 1, max: 7},
    
    podatki_o_placilu: {type: String, "default": "Ni plačano"},
    
    ocena: {type: Number, min: 0, max: 10, "default": 0},
    veljavnost: {type: Boolean, "default": true}
});

var izpitSchema = new mongoose.Schema({
    predmet: {type: ObjectId, ref: 'Predmet', required: true},
    studijsko_leto: {type: ObjectId, ref: 'StudijskoLeto', required: true},
    datum_izvajanja: {type: Date, required: true},
    opombe: {type: String, required: false},
    
    ucitelji: [{type: ObjectId, ref: 'Zaposlen', required: false}],
    polagalci: [polagalecSchema],
    
    veljavnost: {type: Boolean, "default": true}
});

// Save this Scheme as a model
mongoose.model('Izpit', izpitSchema, 'Izpiti');