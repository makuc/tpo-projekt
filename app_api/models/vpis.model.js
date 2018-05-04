var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;



var vpisSchema = new mongoose.Schema({
    student: {type: ObjectId, ref: 'Student', required: true},
    studijsko_leto: {type: ObjectId, ref: 'StudijskoLeto', required: true},
    letnik: {type: ObjectId, ref: 'Letnik', required: true},
    studijski_program: {type: ObjectId, ref: 'StudijskiProgram', required: true},
    vrsta_studija: {type: ObjectId, ref: 'VrstaStudija', required: true},
    vrsta_vpisa: {type: ObjectId, ref: 'VrstaVpisa', required: true},
    kraj_izvajanja: {type: String, required: false},
    
    studijsko_leto_prvega_vpisa_v_ta_program: {type: ObjectId, red: 'StudijskoLeto', required: true},
    
    nacin_studija: {type: ObjectId, ref: 'NacinStudija', required: false},
    oblika_studija: {type: ObjectId, ref: 'OblikaStudija', required: false},
    
    usmeritev: {type: String, required: false},
    izbirna_skupina: {type: String, required: false},
    
    prosta_izbira: {type: Boolean, "default": false},
    
    priloge: [{type: String}],
    
    valid: {type: Boolean, "default": false},
    potrjen: {type: Boolean, "default": false},
    
    vpisan: {type: Date, "default": Date.now()},
    
    predmeti: [{type: ObjectId, ref: 'Predmet'}],
    
    modulniPredmeti: [{type: ObjectId, ref: 'Predmet'}],
    moduli: [{type: ObjectId, ref: 'Predmetnik'}],
    splosniIzbirniPredmeti: [{type: ObjectId, ref: 'Predmet'}],
    strokovniIzbirniPredmeti: [{type: ObjectId, ref: 'Predmet'}],
    obvezniPredmeti: [{type: ObjectId, ref: 'Predmet'}]
});

// Save this Scheme as a model
mongoose.model('Vpis', vpisSchema, 'Vpisi');