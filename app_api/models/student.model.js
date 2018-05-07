var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var predmetStudentaSchema = new mongoose.Schema({
    predmet: {type: ObjectId, ref: 'Predmet', required: true},
    
    ocena: {type: Number, "default": 0, min: 0, max: 10},
    izpit: {type: ObjectId, required: false},
    
    zaporedni_poskus: {type: Number, min: 0, "default": 0},
    zaporedni_poskus_skupaj: {type: Number, min: 0, "default": 0}
});

var zetonSchema = new mongoose.Schema({
    studijsko_leto: {type: ObjectId, ref: 'StudijskoLeto', required: true},
    letnik: {type: ObjectId, ref: 'Letnik', required: true},
    studijski_program: {type: ObjectId, ref: 'StudijskiProgram', required: true},
    vrsta_studija: {type: ObjectId, ref: 'VrstaStudija', required: false},
    vrsta_vpisa: {type: ObjectId, ref: 'VrstaVpisa', required: false},
    
    kraj_izvajanja: {type: String, required: true},
    
    nacin_studija: {type: ObjectId, ref: 'NacinStudija', required: false},
    oblika_studija: {type: ObjectId, ref: 'OblikaStudija', required: false},
    
    studijsko_leto_prvega_vpisa_v_ta_program: {type: ObjectId, ref: 'StudijskoLeto', required: true},
    neopravljeni_predmeti: [predmetStudentaSchema],
    
    prosta_izbira: {type: Boolean, "default": false},
    
    izkoriscen: {type: Boolean, "default": false}
});

var studijskoLetoStudenta = new mongoose.Schema({
    studijsko_leto: {type: ObjectId, ref: 'StudijskoLeto', required: true},
    letnik: {type: ObjectId, ref: 'Letnik', required: true},
    predmeti: [predmetStudentaSchema],
    
    kraj_izvajanja: {type: String, required: true},
    oblika_studija: {type: ObjectId, ref: 'OblikaStudija', required: true},
    vrsta_studija: {type: ObjectId, ref: 'VrstaStudija', required: true},
    nacin_studija: {type: ObjectId, ref: 'NacinStudija', required: true},
    vrsta_vpisa: {type: ObjectId, ref: 'VrstaVpisa', required: true},
    
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
    
    predhodna_izobrazba: {
        zavod: {type: String, required: false},
        kraj: {type: String, required: false},
        drzava: {type: ObjectId, ref: 'VrstaStudija', required: false},
        program: {type: ObjectId, ref: 'VrstaStudija', required: false},
        leto_zakljucka: {type: Number, required: false},
        uspeh: {type: Number, min: 1, max: 5, required: false},
        smer_strokovna_izobrazba: {type: String, required: false},
        nacin_koncanja: {type: String, required: false},
        najvisja_dosezena_izobrazba: {type: ObjectId, ref: 'VrstaStudija', required: false}
    },
    
    datum_registracije: {type: Date, "default": Date.now},
    
    // Dodatni podatki - Združena tabela !!
    studijska_leta_studenta: [studijskoLetoStudenta],
    
    zetoni: [zetonSchema]
});

// Save this Scheme as a model
mongoose.model('Student', studentSchema, 'Studenti');