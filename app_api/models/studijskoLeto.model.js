var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var studijskoLetoSchema = new mongoose.Schema({
    
});

// Save this Scheme as a model
mongoose.model('StudijskoLeto', studijskoLetoSchema, 'StudijskaLeta');