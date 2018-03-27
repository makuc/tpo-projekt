var mongoose = require('mongoose');

/* GET home page. */
module.exports.index = function(req, res) {
  res.status(200).json({
    message: "API works",
    version: "v1"
  });
};