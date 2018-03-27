var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var studijskoLetoSchema = new mongoose.Schema({
    studijsko_leto: {type: String, unique: true, required: true}
});

// Save this Scheme as a model
mongoose.model('StudijskoLeto', studijskoLetoSchema, 'StudijskaLeta');