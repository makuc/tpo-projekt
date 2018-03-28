var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


var izvedbaPredmetaSchema = new mongoose.Schema({
    studijsko_leto: {type: ObjectId, ref: 'StudijskoLeto', required: true},
    ucitelj: [{type: ObjectId, ref: 'Zaposlen'}],
    roki: [{type: ObjectId, ref: 'Izpit'}]
});

var predmetSchema = new mongoose.Schema({
    sifra: {type: String, unique: true, required: true},
    naziv: {type: String, required: true},
    opis: {type: String, required: false},
    
    izvedbe_predmeta: [izvedbaPredmetaSchema]
});

// Save this Scheme as a model
mongoose.model('Predmet', predmetSchema, 'Predmeti');