const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const app = express();
var MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors());

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`App UI available http://localhost:${port}`);
});

app.get('/getConvidados', (req, res, err) => {
	try {
		MongoClient.connect(
			process.env.URL,
			{ useUnifiedTopology: true },
			function (err, db) {
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
			}
		);
	} catch (e) {
		console.log(e);
	}
});
