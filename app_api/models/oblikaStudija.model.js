var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var oblikaStudijaSchema = new mongoose.Schema({
    naziv: {type: String, required: true, unique: true}
});

// Save this Scheme as a model
mongoose.model('OblikaStudija', oblikaStudijaSchema, 'OblikeStudija');