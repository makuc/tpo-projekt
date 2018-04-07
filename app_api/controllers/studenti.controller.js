var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Student = mongoose.model('Student');

/* GET home page. */
module.exports.getStudenti = function(req, res) {
  // TEST response
  /*res.status(200).json({
    message: "Tu bodo studenti.",
  });*/
  getStudenti(req, res);
};

function getStudenti(req, res) {
    var koncniObject = {};
    Student
        .find().limit(0)
        .exec(function(err, studenti) {
            if(err) {
                return res.status(404).send({ message: "Studenti not found 1" });
            }
            if(!studenti) return res.status(404).send({ message: "Studenti not found 2" });
            
            koncniObject.studenti = studenti;
            return res.status(200).json(koncniObject);
        });
}

module.exports.uvozStudentov = function(req, res) {
       
}