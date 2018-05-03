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
    vrsta_studija: {type: ObjectId, ref: 'VrstaStudija', required: false},
    vrsta_vpisa: {type: ObjectId, ref: 'VrstaVpisa', required: false},
    
    nacin_studija: {type: ObjectId, ref: 'NacinStudija', required: false},
    oblika_studija: {type: ObjectId, ref: 'OblikaStudija', required: false},
    
    studijsko_leto_prvega_vpisa_v_ta_program: {type: ObjectId, ref: 'StudijskoLeto', required: false},
    neopravljeni_predmeti: [predmetStudentaSchema],
    
    prosta_izbira: {type: Boolean, "default": false},
    
    izkoriscen: {type: Boolean, "default": false}
});

var studijskoLetoStudenta = new mongoose.Schema({
    studijsko_leto: {type: ObjectId, ref: 'StudijskoLeto', required: true},
    predmeti: [predmetStudentaSchema],
    
    opravil: {type: Boolean, "default": false}
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
    email: {type: String, required: true, unique: true},
    prenosni_telefon: {type: String, required: false},
    stalno_bivalisce_naslov: {type: String, required: false},
    stalno_bivalisce_posta: {type: ObjectId, ref: 'Posta', required: false},
    stalno_bivalisce_obcina: {type: ObjectId, ref: 'Obcina', required: false},
    stalno_bivalisce_drzava: {type: ObjectId, ref: 'Drzava', required: false},
    stalno_bivalisce_vrocanje: {type: Boolean, required: false},
    zacasno_bivalisce_naslov: {type: String, required: false},
    zacasno_bivalisce_posta: {type: ObjectId, ref: 'Posta', required: false},
    zacasno_bivalisce_obcina: {type: ObjectId, ref: 'Obcina', required: false},
    zacasno_bivalisce_drzava: {type: ObjectId, ref: 'Drzava', required: false},
    zacasno_bivalisce_vrocanje: {type: Boolean, required: false},
    
    datum_registracije: {type: Date, "default": Date.now},
    
    // Dodatni podatki - Združena tabela !!
    studijsko_leto_studenta: [studijskoLetoStudenta],
    
    zetoni: [zetonSchema]
});

// Save this Scheme as a model
mongoose.model('Student', studentSchema, 'Studenti');