// start localhost
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const dbase = require('./dbase.js'); // database stuff
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, originalname);
    }
});
const upload = multer({ storage });

// connect to database
let dbPath = './db/';
let dbName = 'xmaslist';
db = dbase.connectDB(dbPath, dbName);

// middleware
app.use(express.json()); // needed to read json in body of request
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/user:userid', function(req, res, next) {
    db.createTable(req.params.userid); //sets db.connectedTable and db.dictArr
    next();
});

// set template
app.set('view engine', 'ejs');

// http requests
app.get('/user:userid', function(req, res) {
    res.render('index', {data : {userid: req.params.userid}});
    db.read(req.params.userid, -1, true);
});
app.get('/getDictArray', function(req, res) {
    res.send(db.dictArr)
});
app.post('/addDictArray', function(req, res) {
    db.insert(req.body, db.connectedTable, true);
});
app.post('/editDictArray', function(req, res) {
    db.update(db.connectedTable, req.body.id, req.body.dict, true);
});
app.post('/deleteRowDictArray', function(req, res) {
    console.log(req.body)
    db.deleteRow(db.connectedTable, req.body.id, true);
});
app.post('/uploadImg', upload.single('fileToUpload'), function(req, res) {
    console.log('fetched /uploadImg')
    // return res.formData = req.body;
});

// server listens for requests on port
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