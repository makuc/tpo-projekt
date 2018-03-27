var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var predmetSchema = new mongoose.Schema({
    
});

// Save this Scheme as a model
mongoose.model('Predmet', predmetSchema, 'Predmeti');