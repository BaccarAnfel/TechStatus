const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pfa'
});

db.connect((err) => {
    if(err) {
        console.err('Error connectiong to MySQL : ', err);
        return;
    }
    console.log('Connected to MySQL database!');
});

app.get('/api/locaux', (req, res) => {
    db.query('SELECT localId, nom FROM local', (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Erreur de la base de données' });
        } else {
            res.json(results); // Send results as a JSON response
        }
    });
});


app.listen(5000, () => {
    console.log("server running");
});