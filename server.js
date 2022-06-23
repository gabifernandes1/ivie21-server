const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const app = express();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectId;

require('dotenv/config');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors());

const port = process.env.PORT || 8000;

app.listen(process.env.PORT || 8000, () => {
	console.log(`App UI available http://localhost:${port}`);
});

const url = process.env.URL;
app.get('/getConvidados', (req, res, err) => {
	try {
		MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
			if (err) throw err;
			var dbo = db.db('convidados');
			dbo
				.collection('convidados')
				.find({})
				.toArray(function (err, result) {
					if (err) throw 'err';
					res.header('Access-Control-Allow-Origin', '*');
					res.send(result);
				});
		});
	} catch (e) {
		console.log(err);
	}
});
app.post('/adicionar', (req, res, err) => {
	try {
		MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
			if (err) throw err;
			var dbo = db.db('convidados');
			dbo
				.collection('convidados')
				.insertOne(req.body, function (err, response) {
					if (err) throw 'err';
					res.header('Access-Control-Allow-Origin', '*');
					res.send('1 document inserted');
					res.end('Success');
					db.close();
				});
		});
	} catch (e) {
		console.log(err);
	}
});
app.post('/confirmacao', (req, res, err) => {
	console.log('?');
	try {
		MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
			if (err) throw err;
			let newId = new ObjectID(req.body.data._id);
			req.body.data._id = newId;
			let usuario = req.body.data;
			let confirmacao = req.body.confirmacao;
			var dbo = db.db('convidados');
			var myquery = usuario;
			var newvalues = { $set: { vou: confirmacao } };
			dbo
				.collection('convidados')
				.updateOne(myquery, newvalues, function (err, response) {
					if (err) throw err;
					console.log(response);
					res.header('Access-Control-Allow-Origin', '*');
					res.send('1 document updated');
					db.close();
				});
		});
	} catch (e) {
		console.log(err);
	}
});

app.post('/check', (req, res, err) => {
	try {
		MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
			if (err) throw err;
			let id = new ObjectID(req.body._id);
			req.body._id = id;
			var dbo = db.db('convidados');
			dbo
				.collection('convidados')
				.find(req.body)
				.toArray(function (err, response) {
					if (err) throw err;
					console.log(response);
					res.header('Access-Control-Allow-Origin', '*');
					res.send('1 convidado confirmed');
					db.close();
				});
		});
	} catch (e) {
		console.log(err);
	}
});
