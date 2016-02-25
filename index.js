var express = require('express');
var cors = require('cors');
var lib = require('packs-lib');

//FIX THIS WHEN SPLIT TO ACTUAL APPS
var mongoose = require('mongoose');
mongoose.connect(lib.services.mongo);

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(cors());
var checkAuth = lib.checkAuth;
var checkSuperAdmin = lib.checkSuperAdmin;


var CardModel = require('./models/card');

app.get('/cards', function(req, res) {
	CardModel.find({}, function(err, cards){
		return res.json(cards);
	});
});

app.post('/card', checkSuperAdmin, function(req,res){
	if (!req.body.card) { return res.status(400).send('No card submitted'); }
	var c = new CardModel(req.body.card);
	c.save(function(err, card){
		return res.status(200).json(card);
	});

});

app.post('/card/:id', checkSuperAdmin, function(req,res){
	if (!req.body.card) { return res.status(400).send('No card submitted'); }
	CardModel.findOne({_id: req.params.id }, function(err,card){
		if (err || !card) { res.status(400).send('No card with id');}
		for (var prop in req.body.card) {
			card[prop] = req.body.card[prop];
		}
		card.save(function(err, card){
			return res.status(200).json(card);
		});
	});
});

app.delete('/card/:id', checkSuperAdmin, function(req,res){
	if (!req.params.id) { return res.status(400).send('No card submitted'); }
	console.log(req.params.id);
	CardModel.remove({_id: req.params.id }, function(err,card){
		console.log(err,card)
		if (err) { return res.status(400).send('No card with id');}
		return res.sendStatus(200);
	});
});

app.listen(3007);