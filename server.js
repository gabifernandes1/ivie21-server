const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const app = express();
var MongoClient = require('mongodb').MongoClient;
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
