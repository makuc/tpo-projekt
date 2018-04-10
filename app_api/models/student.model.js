var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


var zetonSchema = new mongoose.Schema({
    studijsko_leto: {type: ObjectId, ref: 'StudijskoLeto', required: true},
    letnik: {type: ObjectId, ref: 'Letnik', required: true},
    studijski_program: {type: ObjectId, ref: 'StudijskiProgram', required: true},
    vrsta_studija: {type: ObjectId, ref: 'VrstaStudija', required: true},
    vrsta_vpisa: {type: ObjectId, ref: 'VrstaVpisa', required: true},
    
    nacin_studija: {type: ObjectId, ref: 'NacinStudija', required: true},
    oblika_studija: {type: ObjectId, ref: 'OblikaStudija', required: true},
    
    izkoriscen: {type: Boolean, "default": false}
});

var predmetStudentaSchema = new mongoose.Schema({
    predmet: {type: ObjectId, ref: 'Predmet', required: true},
    zaporedni_poskus: {type: Number, min: 0, max: 7}
});

var studijskoLetoStudenta = new mongoose.Schema({
    studijsko_leto: {type: ObjectId, ref: 'StudijskoLeto', required: true},
    predmeti: [predmetStudentaSchema],
    zetoni: [zetonSchema]
});

var studentSchema = new mongoose.Schema({
    vpisna_stevilka: {type: String, required: true, unique: true},
    priimek: {type: String, required: true},
    ime: {type: String, required: true},
    datum_rojstva: {type: String, required: false},
    kraj_rojstva: {type: String, required: false},
    drzava_rojstva: {type: ObjectId, ref: 'Drzava', required: false},
    obcina_rojstva: {type: String, required: false},
    drzavljanstvo: {type: String, required: false},
    spol: {type: String, required: false},
    emso: {type: String, required: false},
    davcna_stevilka: {type: String, required: false},
    e_posta: {type: String, required: true, unique: true},
    prenosni_telefon: {type: String, required: false},
    stalno_bivalisce_naslov: {type: String, required: false},
    stalno_bivalisce_posta: {type: ObjectId, ref: 'Posta', required: false},
    stalno_bivalisce_obcina: {type: ObjectId, ref: 'Obcina', required: false},
    stalno_bivalisce_drzava: {type: ObjectId, ref: 'Drzava', required: false},
    stalno_bivalisce_vrocanje: {type: Boolean, "default": true},
    zacasno_bivalisce_naslov: {type: String, required: false},
    zacasno_bivalisce_posta: {type: ObjectId, ref: 'Posta', required: false},
    zacasno_bivalisce_obcina: {type: ObjectId, ref: 'Obcina', required: false},
    zacasno_bivalisce_drzava: {type: ObjectId, ref: 'Drzava', required: false},
    zacasno_bivalisce_vrocanje: {type: Boolean, "default": false},
    
    datum_registracije: {type: Date, "default": Date.now},
    
    // Dodatni podatki - Združena tabela !!
    studijsko_leto_studenta: [studijskoLetoStudenta]
});

// Save this Scheme as a model
mongoose.model('Student', studentSchema, 'Studenti');