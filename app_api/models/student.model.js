var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


var zetonSchema = new mongoose.Schema({
    letnik: {type: ObjectId, ref: 'Letnik', required: true},
    studijski_program: {type: ObjectId, ref: 'StudijskiProgram', required: true},
    vrsta_vpisa: {type: ObjectId, ref: 'VrstaVpisa', required: true},
    
    // Incomplete
    
    izkoriscen: {type: Boolean, "default": false}
});

var predmetiStudentaSchema = new mongoose.Schema({
    predmeti: [{
        zaporedni_poskus: {type: Number, min: 0, max: 7},
        predmet: {type: ObjectId, ref: 'Predmet', required: true}
    }]
});

var studijskoLetoStudenta = new mongoose.Schema({
    studijsko_leto: {type: ObjectId, ref: 'StudijskoLeto', required: true},
    predmeti: [predmetiStudentaSchema],
    zetoni: [zetonSchema]
});

var studentSchema = new mongoose.Schema({
    vpisna_stevilka: {type: String, required: true, unique: true},
    priimek: {type: String, required: true},
    ime: {type: String, required: true},
    datum_rojstva: {type: String, required: true},
    kraj_rojstva: {type: String, required: true},
    drzava_rojstva: {type: ObjectId, ref: 'Drzava', required: true},
    obcina_rojstva: {type: String, required: false},
    drzavljanstvo: {type: String, required: true},
    spol: {type: String, required: true},
    emso: {type: String, required: true},
    davcna_stevilka: {type: String, required: true},
    e_posta: {type: String, required: true, unique: true},
    prenosni_telefon: {type: String, required: true},
    stalno_bivalisce_naslov: {type: String, required: true},
    stalno_bivalisce_posta: {type: ObjectId, ref: 'Posta', required: true},
    stalno_bivalisce_obcina: {type: ObjectId, ref: 'Obcina', required: true},
    stalno_bivalisce_drzava: {type: ObjectId, ref: 'Drzava', required: true},
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