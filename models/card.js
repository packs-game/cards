var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Card = new Schema({
	name: String
});

Card.methods.x = function() {

};

module.exports = mongoose.model('Card', Card, 'cards');