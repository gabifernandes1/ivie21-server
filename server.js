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
			var dbo = db.db('convidados-lo');
			dbo
				.collection('convidados-lo')
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
			var dbo = db.db('convidados-lo');
			dbo
				.collection('convidados-lo')
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
			var dbo = db.db('convidados-lo');
			dbo
				.collection('convidados-lo')
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
			var dbo = db.db('convidados-lo');
			dbo
				.collection('convidados-lo')
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




app.post('/adicionarTodos', (req, res, err) => {
	try {
		MongoClient.connect(url, function (err, db) {
			if (err) throw err;
			var dbo = db.db('convidados-lo');
			dbo
				.collection('convidados-lo')
				.insertMany([{nome: "Paula", telefone: 11964186142},
				{nome: "Karen", telefone: 11988008579},
				{nome: "Aline Silva", telefone: 11963530867},
				{nome: "Aline", telefone: 11993897386},
				{nome: "Dimas", telefone: 11978052493},
				{nome: "Katia", telefone: 11961050238},
				{nome: "Katia Lopes", telefone: 11910653438},
				{nome: "Deise", telefone: 11961571917},
				{nome: "Baixa", telefone: 11952535174},
				{nome: "Rose", telefone: 11957042391},
				{nome: "Lili", telefone: 11940266036},
				{nome: "Lilian", telefone: 11912739714},
				{nome: "Alberto", telefone: 11980975316},
				{nome: "Cris", telefone: 11988081048},
				{nome: "Tia Carminha", telefone: 11981657029},
				{nome: "Bisa", telefone: 11982143597},
				{nome: "Tia Cris", telefone: 11980768875},
				{nome: "Priscila", telefone: 11949066878},
				{nome: "Talita", telefone: 11982075931}], function (err, response) {
					if (err) throw err;
					res.send(response);
					db.close();
				});
		});
	} catch (e) {
		console.log(err);
	}
});