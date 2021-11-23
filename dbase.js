// dbase.js: deal with databases
const sqlite3 = require('sqlite3').verbose();

// database functions
sqlite3.Database.prototype.createTable = function(tableName, readAllColumns=false) {
    let sql = `CREATE TABLE IF NOT EXISTS ` + tableName + `(
        id INTEGER,
        title TEXT,
        link TEXT,
        img TEXT,
        price TEXT)`;
    console.log('\x1b[44m\x1b[30m%s\x1b[0m', sql);
    return this.run(sql, (err) => {
            if (err) {
                return console.log(err.message);
            }
            else {
                db.connectedTable = tableName;
                console.log('\x1b[34m%s\x1b[0m', `Connected to table named ${tableName}`)
            }
        }).read(tableName, -1, readAllColumns)
};

sqlite3.Database.prototype.insert = function(dict, tableName, readAllColumns=false) {
    let sql = `INSERT INTO ` + tableName + ` (id,title,link,img,price)
        values (?,?,?,?,?)`;
    console.log('\x1b[46m\x1b[30m%s\x1b[0m', sql);
    return this.shiftIds(tableName).run(sql, [1, dict.title, dict.link, dict.img, dict.price], function(err) {
            if (err) {
                return console.log(err.message);
            }
            else
            {
                db.lastID = this.lastID;
                console.log('\x1b[36m%s\x1b[0m', `A row has been inserted with rowid ${this.lastID}`);
            }
        }).read(tableName, -1, readAllColumns)
};

sqlite3.Database.prototype.read = function(tableName, rowId=-1, readAllColumns=false) {
    let sqlBase = `SELECT rowid,* FROM ${tableName} ORDER BY id`;
    let sql = (rowId>=0)?(sqlBase + ` WHERE rowid = '${rowId}'`):sqlBase;
    console.log('\x1b[42m\x1b[30m%s\x1b[0m', sql);
    return this.all(sql, [], (err, rows) => {
        if (err) {
        throw `\t${err}`;
        }
        else {
            let dArr = [];
            rows.forEach((row) => {
                dArr.push(readAllColumns?row:(({title, price, img, link})=>({title, price, img, link}))(row));
            });
            readAllColumns?console.log('\x1b[32m%s\x1b[0m', 'Read Only: this.dictArray not updated'):(this.dictArr = [...dArr]);
            console.log('\x1b[32m%s\x1b[0m', 'dict Arr =');
            console.log(dArr);
        }
  });
};

sqlite3.Database.prototype.update = function(tableName, ID, newDict, readAllColumns=false) {
    let sql = `UPDATE ${tableName}
         SET (title,link,img,price) = (?,?,?,?)
         WHERE id = ${ID}`;
    console.log('\x1b[43m\x1b[30m%s\x1b[0m', sql);
    return this.run(sql, [newDict.title, newDict.link, newDict.img, newDict.price], (err) => {
        if (err) {
            console.log(err);
        }
        else
            console.log('\x1b[33m%s\x1b[0m', `Updated row with id = ${ID}`);
  }).read(tableName, -1, readAllColumns);
};

sqlite3.Database.prototype.shiftIds = function(tableName, isShiftUp=true, ID=1) {
    let sql = `UPDATE ${tableName}
         SET id = id ${isShiftUp?'+':'-'} 1
         WHERE id >= ${ID}`;
    console.log('\x1b[43m\x1b[30m%s\x1b[0m', sql);
    return this.run(sql, (err) => {
        if (err) {
            console.log(err);
        }
        else
            console.log('\x1b[33m%s\x1b[0m', `Updated ids with id >= ${ID}`);
  });
};

sqlite3.Database.prototype.deleteRow = function(tableName, ID, readAllColumns=false) {
    let sql = `DELETE FROM ${tableName}
         WHERE id = ${ID}`;
    console.log('\x1b[41m\x1b[30m%s\x1b[0m', sql);
    return this.run(sql, (err) => {
        if (err) {
            console.log(err);
        }
        else
            console.log('\x1b[31m%s\x1b[0m', `Deleted row with id = ${ID}`);
  }).shiftIds(tableName, false, ID).read(tableName, -1, readAllColumns);
};

sqlite3.Database.prototype.deleteTable = function(tableName) {
    let sql = `DROP TABLE ${tableName}`;
    console.log('\x1b[45m\x1b[30m%s\x1b[0m', sql);
    return this.run(sql, [], (err) => {
        if (err) {
            console.log(err);
        }
        else
            console.log('\x1b[35m%s\x1b[0m', `Dropped table named ${tableName}`);
    })
};

sqlite3.Database.prototype.closeDB = function() {
    this.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        else
            console.log('Close the database connection.')
        })
    };

sqlite3.Database.prototype.example = function(tableName, readAllColumns=false) {
    this.serialize(() => {
        this.createTable(tableName)
        .insert({title: "title1", link: "link1", img: "image1", price: "price1"}, tableName, readAllColumns)
        .insert({title: "title2", link: "link2", img: "image2", price: "price2"}, tableName, readAllColumns)
        .insert({title: "title3", link: "link3", img: "image3", price: "price3"}, tableName, readAllColumns)
        .update(tableName, 1, {title: "updated_title", link: "updated_link", img: "updated_img", price: "updated_price"}, readAllColumns)
        .deleteRow(tableName, 1, readAllColumns)
        .deleteTable(tableName)
    });
    this.closeDB();
};

function connectDB(dbPath, dbName) {
    return new sqlite3.Database(dbPath + dbName + '.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        else
            console.log('Connected to the ' + dbName + ' database.');
    });
};

// export function
module.exports.connectDB = connectDB;

// UNCOMMENT CODE BELOW TO RUN EXAMPLE in dbase.js

// // connect to database
// let dbPath = './db/';
// let dbName = 'xmaslist';
// db = connectDB(dbPath, dbName);

// // variables needed
// let username = 'Torin';

// // database example
// db.example(username, true);