var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


var predmetStudentaSchema = new mongoose.Schema({
    letnik: {type: ObjectId, ref: 'Letnik', required: true},
    predmet: {type: ObjectId, ref: 'Predmet', required: true},
    
    zaporedni_poskus: {type: Number, min: 0, max: 7}
});

var zetonSchema = new mongoose.Schema({
    studijsko_leto: {type: ObjectId, ref: 'StudijskoLeto', required: true},
    letnik: {type: ObjectId, ref: 'Letnik', required: true},
    studijski_program: {type: ObjectId, ref: 'StudijskiProgram', required: true},
    vrsta_studija: {type: ObjectId, ref: 'VrstaStudija', required: true},
    vrsta_vpisa: {type: ObjectId, ref: 'VrstaVpisa', required: true},
    
    nacin_studija: {type: ObjectId, ref: 'NacinStudija', required: true},
    oblika_studija: {type: ObjectId, ref: 'OblikaStudija', required: true},
    
    neopravljeni_predmeti: [predmetStudentaSchema],
    
    prosta_izbira: {type: Boolean, "default": false},
    
    izkoriscen: {type: Boolean, "default": false}
});


var vpisSchema = new mongoose.Schema({
    student: {type: ObjectId, ref: 'Student', required: true},
    studijsko_leto: {type: ObjectId, ref: 'StudijskoLeto', required: true},
    letnik: {type: ObjectId, ref: 'Letnik', required: true},
    studijski_program: {type: ObjectId, ref: 'StudijskiProgram', required: true},
    vrsta_studija: {type: ObjectId, ref: 'VrstaStudija', required: true},
    vrsta_vpisa: {type: ObjectId, ref: 'VrstaVpisa', required: true},
    kraj_izvajanja: {type: String, required: false},
    
    studijsko_leto_prvega_vpisa_v_ta_program: {type: ObjectId, red: 'StudijskoLeto', required: true},
    
    nacin_studija: {type: ObjectId, ref: 'NacinStudija', required: true},
    oblika_studija: {type: ObjectId, ref: 'OblikaStudija', required: true},
    
    usmeritev: {type: String, required: false},
    izbirna_skupina: {type: String, required: false},
    
    priloge: [{type: String}],
    
    potrjen: {type: Boolean, "default": false},
    
    vpisan: {type: Date, "default": Date.now()}
});

// Save this Scheme as a model
mongoose.model('Vpis', vpisSchema, 'Vpisi');