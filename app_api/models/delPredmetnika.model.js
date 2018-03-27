var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var delPredmetnikaSchema = new mongoose.Schema({
    
});

// Save this Scheme as a model
mongoose.model('DelPredmetnika', delPredmetnikaSchema, 'DeliPredmetnikov');