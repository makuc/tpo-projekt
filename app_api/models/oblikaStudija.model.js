var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var oblikaStudijaSchema = new mongoose.Schema({
    
});

// Save this Scheme as a model
mongoose.model('OblikaStudija', oblikaStudijaSchema, 'OblikeStudija');