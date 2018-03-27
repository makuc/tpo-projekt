var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var nacinStudijaSchema = new mongoose.Schema({
    naziv: {type: String, required: true}
});

// Save this Scheme as a model
mongoose.model('NacinStudija', nacinStudijaSchema, 'NaciniStudija');