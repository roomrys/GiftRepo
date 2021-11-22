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
app.use('/user:userid', function(req, res, next) {
    // db.createTable(req.params.userid); //sets db.connectedTable and db.dictArr
    // db.connectedTable = req.params.userid; //
    db.dictArr = {img: './public/svg/present.svg', 
        price:'$888', 
        link:'https://codepen.io/sosuke/pen/Pjoqqp',
        title: 'T'}
    next();
});

// set template
app.set('view engine', 'ejs');

// http requests
app.get('/user:userid', function(req, res) {
    res.render('index', {data : {userid: req.params.userid}});
});
app.get('/getDictArray', function(req, res) {
    console.log(db.dictArr)
    res.send(db.dictArr)
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