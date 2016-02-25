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

app.post('/cards', checkSuperAdmin, function(req,res){
	res.send('NEW CARD ADDED')
});

app.listen(3007);