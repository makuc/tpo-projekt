var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var delPredmetnikaSchema = new mongoose.Schema({
    sifra: {type: String, ref: 'Predmet', required: true},
    naziv: {type: String, required: true}
});

// Save this Scheme as a model
mongoose.model('DelPredmetnika', delPredmetnikaSchema, 'DeliPredmetnikov');