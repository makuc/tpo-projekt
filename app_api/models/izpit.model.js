var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


var polagalecSchema = new mongoose.Schema({
    student: {type: ObjectId, ref: 'Student', required: true},
    zaporedni_poskus: {type: Number, min: 0, "default": 0},
    zaporedni_poskus_skupaj: {type: Number, min: 0, "default": 0},
    
    placano: {type: Boolean, "default": true},
    
    tock: {type: Number, min: -1, max: 100, "default": -1},
    koncna_ocena: {type: Number, min: -1, max: 10, "default": -1},
    
    valid: {type: Boolean, "default": true},
    
    odjavljen: {type: Boolean, "default": false},
    odavil: {type: ObjectId, ref: 'Zaposlen', required: false},
    cas_odjave: {type: Date, required: false},
    
    strinjanje: {type: Boolean, "default": false}
});

var izpitSchema = new mongoose.Schema({
    predmet: {type: ObjectId, ref: 'Predmet', required: true},
    studijsko_leto: {type: ObjectId, ref: 'StudijskoLeto', required: true},
    datum_izvajanja: {type: Date, required: true},
    
    lokacija: {type: String, required: false},
    opombe: {type: String, required: false},
    
    izvajalci: [{type: ObjectId, ref: 'Zaposlen', required: false}],
    polagalci: [polagalecSchema],
    
    valid: {type: Boolean, "default": true},
    
    obdelava: {type: Boolean, "default": false},
    sprememba: {type: Number, "default": 0, min: 0, max: 2}, // 1 = urejanje, 2 = brisanje
    spremenil: {type: ObjectId, ref: 'Zaposlen', required: false},
    
    spremembe: {
        datum_izvajanja: {type: Date, required: false},
        lokacija: {type: String, required: false},
        opombe: {type: String, required: false},
        izvajalci: [{type: ObjectId, ref: 'Zaposlen', required: false}]
    }
});

// Save this Scheme as a model
mongoose.model('Izpit', izpitSchema, 'Izpiti');