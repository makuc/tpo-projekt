var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


var izvedbaPredmetaSchema = new mongoose.Schema({
    studijsko_leto: {type: ObjectId, ref: 'StudijskoLeto', required: true},
    ucitelji: [{type: ObjectId, ref: 'Zaposlen'}],
    izpiti: [{type: ObjectId, ref: 'Izpit'}]
});

var predmetSchema = new mongoose.Schema({
    sifra: {type: String, unique: true, required: true},
    naziv: {type: String, required: true},
    opis: {type: String, "defaule": ""},
    KT: {type: Number, "default": 6},
    
    izvedbe_predmeta: [izvedbaPredmetaSchema],
    
    valid: {type: Boolean, "default": true}
});

// Save this Scheme as a model
mongoose.model('Predmet', predmetSchema, 'Predmeti');