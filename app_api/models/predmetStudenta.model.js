var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var predmetStudentaSchema = new mongoose.Schema({
    
});

// Save this Scheme as a model
mongoose.model('PredmetStudenta', predmetStudentaSchema, 'PredmetiStudentov');