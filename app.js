// start localhost
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const dbase = require('./dbase.js'); // database stuff

// connect to database
let dbPath = './db/';
let dbName = 'xmaslist';
db = dbase.connectDB(dbPath, dbName);

// middleware
app.use('/public', express.static(path.join(__dirname, 'public')));

// set template
app.set('view engine', 'ejs');

// http requests
app.get('/user:userid', function(req, res) {
    db.createTable(req.params.userid);
    db.connectedTable = req.params.userid;
    db.dictArr = db.read(req.params.userid);
    // db.example(db.connectedTable);
    
    res.render('index', {data : {userid: req.params.userid}});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

// DATABASE EXAMPLE CODE
// // connect to database
// let dbPath = './db/';
// let dbName = 'xmaslist';
// db = dbase.connectDB(dbPath, dbName);

// // variables needed
// let username = 'Liezl';

// // database example
// db.example(username);