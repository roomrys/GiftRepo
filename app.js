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

db.createTable = function(tableName) {
    let sql = `CREATE TABLE IF NOT EXISTS ` + username + `(
        title TEXT PRIMARY KEY,
        link TEXT,
        image TEXT,
        price TEXT)`;
    console.log('\x1b[44m\x1b[30m%s\x1b[0m', sql);
    return this.run(sql, (err) => {
            if (err) {
                return console.log(err.message);
            }
            else
                console.log(`Connected to table named ${username}`)
        })
};

db.insert = function(tableName, dict) {
    let sql = `INSERT INTO ` + tableName + ` (title,link,image,price)
        values (?,?,?,?)`;
    console.log('\x1b[42m\x1b[30m%s\x1b[0m', sql);
    return this.run(sql, [dict.title, dict.link, dict.image, dict.price], function(err) {
            if (err) {
                return console.log(err.message);
            }
            else
                console.log(`A row has been inserted with rowid ${this.lastID}`);
        })
};

let dictArr = [];
db.read = function(tableName, rowId=-1) {
    let sqlBase = `SELECT * FROM ${tableName}`;
    let sql = (rowId>=0)?(sqlBase + ` WHERE rowid = '${rowId}'`):sqlBase;
    console.log('\x1b[41m\x1b[30m%s\x1b[0m', sql);
    return this.all(sql, [], (err, rows) => {
        if (err) {
        throw `\t${err}`;
        }
        else {
            dictArr.splice(0, dictArr.length);
            console.log('dict Arr = ', dictArr);
            rows.forEach((row) => {
                dictArr.push({title: row.title, link: row.link, image: row.image, price: row.price});
            });
            console.log(dictArr);
        }
  });
};

db.update = function(tableName, rowId, newDict) {
    let sql = `UPDATE ${tableName}
         SET (title,link,image,price) = (?,?,?,?)
         WHERE rowid = ${rowId}`;
    console.log('\x1b[43m\x1b[30m%s\x1b[0m', sql);
    return this.run(sql, [newDict.title, newDict.link, newDict.image, newDict.price], (err) => {
        if (err) {
            console.log(err);
        }
  });
};

db.deleteTable = function(tableName) {
    let sql = `DROP TABLE ${tableName}`;
    console.log('\x1b[45m\x1b[30m%s\x1b[0m', sql);
    return this.run(sql, [], (err) => {
        if (err) {
            console.log(err);
        }
    })
}

db.serialize(() => {
    db.createTable(username)
    .read(username)
    .insert(username, {title: "NEW title", link: "new link", image: "new image", price: "new price"})
    .insert(username, {title: "NEW1 title", link: "new1 link", image: "new1 image", price: "new price"})
    .read(username)
    .update(username, 2, {title: "title", link: "link", image: "image", price: "price"})
    .read(username)
    .deleteTable(username)
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