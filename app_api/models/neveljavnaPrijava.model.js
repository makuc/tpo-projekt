var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var neveljavnaPrijava = new mongoose.Schema({
    ip: {type: String, required: true, unique: true},
    poskusi: {type: Number, required: true, min: 0, max: 4},
    zadnji_poskus: {type: Date, required: true}
});

mongoose.model('NeveljavnaPrijava', neveljavnaPrijava, 'NeveljavnePrijave');