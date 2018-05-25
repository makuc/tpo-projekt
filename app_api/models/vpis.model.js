var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


var predmetStudentaSchema = new mongoose.Schema({
    predmet: {type: ObjectId, ref: 'Predmet', required: true},
    
    ocena: {type: Number, "default": -1, min: -1, max: 10},
    izpit: {type: ObjectId, ref: "Izpit", required: false},
    
    zaporedni_poskus: {type: Number, min: 0, "default": 0},
    zaporedni_poskus_skupaj: {type: Number, min: 0, "default": 0}
});
var vpisSchema = new mongoose.Schema({
    student: {type: ObjectId, ref: 'Student', required: true},
    studijsko_leto: {type: ObjectId, ref: 'StudijskoLeto', required: true},
    letnik: {type: ObjectId, ref: 'Letnik', required: true},
    studijski_program: {type: ObjectId, ref: 'StudijskiProgram', required: true},
    vrsta_studija: {type: ObjectId, ref: 'VrstaStudija', required: true},
    vrsta_vpisa: {type: ObjectId, ref: 'VrstaVpisa', required: true},
    kraj_izvajanja: {type: String, required: false},
    
    studijsko_leto_prvega_vpisa_v_ta_program: {type: ObjectId, ref: 'StudijskoLeto', required: true},
    
    nacin_studija: {type: ObjectId, ref: 'NacinStudija', required: false},
    oblika_studija: {type: ObjectId, ref: 'OblikaStudija', required: false},
    
    usmeritev: {type: String, required: false},
    izbirna_skupina: {type: String, required: false},
    
    prosta_izbira: {type: Boolean, "default": false},
    
    priloge: [{type: String}],
    
    valid: {type: Boolean, "default": false},
    potrjen: {type: Boolean, "default": false},
    
    vpisan: {type: Date, "default": Date.now},
    
    neopravljeni_predmeti: [predmetStudentaSchema],
    
    predmeti: [{type: ObjectId, ref: 'Predmet'}],
    
    modulniPredmeti: [{type: ObjectId, ref: 'Predmet'}],
    moduli: [{type: ObjectId, ref: 'Predmetnik'}],
    splosniIzbirniPredmeti: [{type: ObjectId, ref: 'Predmet'}],
    strokovniIzbirniPredmeti: [{type: ObjectId, ref: 'Predmet'}],
    obvezniPredmeti: [{type: ObjectId, ref: 'Predmet'}]
});

// Save this Scheme as a model
mongoose.model('Vpis', vpisSchema, 'Vpisi');