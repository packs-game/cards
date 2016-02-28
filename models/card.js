var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Card = new Schema({
	name: String,
	cost: Number,
	tier: Number,
	type: String,
	subtype: String,
	text: String,
	img: String,
	targetZonePattern: String,
	targets: String,
	power: Number,
	toughness: Number,
	abilities: []
});

Card.methods.x = function() {

};

module.exports = mongoose.model('Card', Card, 'cards');