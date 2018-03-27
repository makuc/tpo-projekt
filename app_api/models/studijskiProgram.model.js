var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var studijskiProgramSchema = new mongoose.Schema({
    
});

// Save this Scheme as a model
mongoose.model('StudijskiProgram', studijskiProgramSchema, 'StudijskiProgrami');