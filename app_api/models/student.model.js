var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var studentSchema = new mongoose.Schema({
    vpisna_stevilka: {type: String, required: true, unique: true},
    priimek: {type: String, required: true},
    ime: {type: String, required: true},
    datum_rojstva: {type: Date, required: true},
    kraj_rojstva: {type: String, required: true},
    drzava_rojstva: {type: ObjectId, ref: 'Drzava', required: true},
    obcina_rojstva: {type: ObjectId, ref: 'Obcina', required: false},
    drzavljanstvo: {type: String, required: true},
    spol: {type: String, required: true},
    emso: {type: String, required: true},
    davcna_stevilka: {type: String, required: true},
    e_posta: {type: String, required: true, unique: true},
    prenosni_telefon: {type: String, required: true},
    stalno_bivalisce_naslov: {type: String, required: true},
    stalno_bivalisce_posta: {type: ObjectId, ref: 'Posta', required: true},
    stalno_bivalisce_drzava_obcina: {type: String, required: true},
    stalno_bivalisce_vrocanje: {type: Boolean, "default": true},
    zacasno_bivalisce_naslov: {type: String, required: false},
    zacasno_bivalisce_posta: {type: ObjectId, ref: 'Posta', required: false},
    zacasno_bivalisce_drzava_obcina: {type: String, required: false},
    zacasno_bivalisce_vrocanje: {type: Boolean, "default": false},
    
    datum_registracije: {type: Date, "default": Date.now},
});

// Save this Scheme as a model
mongoose.model('Student', studentSchema, 'Studenti');