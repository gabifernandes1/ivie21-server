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
	console.log('GETCONVIDADOS');
	try {
		MongoClient.connect(url, function (err, db) {
			if (err) throw err;
			var dbo = db.db('convidados');
			dbo
				.collection('convidados')
				.find({})
				.toArray(function (err, result) {
					if (err) throw 'err';
					res.send(result);
					db.close();
				});
		});
	} catch (e) {
		console.log(err);
	}
});
app.post('/adicionar', (req, res, err) => {
	try {
		MongoClient.connect(url, function (err, db) {
			if (err) throw err;
			var dbo = db.db('convidados');
			dbo
				.collection('convidados')
				.insertOne(req.body, function (err, response) {
					if (err) throw err;
					res.send(response);
					db.close();
				});
		});
	} catch (e) {
		console.log(err);
	}
});

app.post('/confirmacao', (req, res, err) => {
	console.log('/CONFIRMACAO');
	try {
		MongoClient.connect(url, function (err, db) {
			if (err) throw err;
			let newId = new ObjectID(req.body.data._id);
			req.body.data._id = newId;
			let usuario = req.body.data;
			let confirmacao = req.body.confirmacao;
			var myquery = usuario;
			var newvalues = { $set: { vou: confirmacao } };
			var dbo = db.db('convidados');
			dbo
				.collection('convidados')
				.updateOne(myquery, newvalues, function (err, response) {
					if (err) throw err;
					res.send('1 document updated');
					db.close();
				});
		});
	} catch (e) {
		console.log(err);
	}
});

app.post('/entrou', (req, res, err) => {
	console.log('/ENTROU');
	try {
		MongoClient.connect(url, function (err, db) {
			if (err) throw err;
			var query = { _id: ObjectID(req.body[0]) };
			var newvalues = { $set: { ENTROU: 'S' } };
			var dbo = db.db('convidados');
			dbo
				.collection('convidados')
				.updateOne(query, newvalues, function (err, response) {
					if (err) throw err;
					res.send('1 document updated');
					db.close();
				});
		});
	} catch (e) {
		console.log(err);
	}
});

app.post('/check', (req, res, err) => {
	console.log('/check');
	try {
		MongoClient.connect(url, function (err, db) {
			if (err) throw err;
			let id = ObjectID(req.body._id);

			var query = { _id: ObjectID(req.body[0]) };
			var dbo = db.db('convidados');
			dbo
				.collection('convidados')
				.find(query)
				.toArray(function (err, response) {
					if (err) throw err;
					res.send(response);
					db.close();
				});
		});
	} catch (e) {
		console.log(err);
	}
});

