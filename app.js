// deal with databases
const sqlite3 = require('sqlite3').verbose();

let dbPath = './db/';
let dbName = 'xmaslist';
let db = new sqlite3.Database(dbPath + dbName + '.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    else
        console.log('Connected to the ' + dbName + ' database.');
});

let username = 'Liezl';

// db.createTable = function(tableName) {
//     db.run(`CREATE TABLE IF NOT EXISTS ` + username + `(
//         title TEXT PRIMARY KEY,
//         link TEXT,
//         image TEXT,
//         price TEXT)`, (err) => {
//             if (err) {
//                 return console.log(err.message);
//             }
//             else
//                 console.log(`Created table named ${username}`)
//         })
// };

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS ` + username + `(
        title TEXT PRIMARY KEY,
        link TEXT,
        image TEXT,
        price TEXT)`, (err) => {
            if (err) {
                return console.log(err.message);
            }
            else
                console.log(`Created table named ${username}`)
        })
    .run(`INSERT INTO Liezl ( title,link,image,price ) 
            values( ?, ?, ?, ? )`, ['tt', 'l', 'i', 'p'], function(err) {
        if (err) {
            return console.log(err.message);
        }
        else
            console.log(`A row has been inserted with rowid ${this.lastID}`);
    })
});

db.close((err) => {
    if (err) {
        return console.error(err.mmessage);
    }
    else
        console.log('Close the database connection.');
});

// start localhost
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.get('/:userid', function(req, res) {
    res.render('index', {data : {userid: req.params.userid}});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});