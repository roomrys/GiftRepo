// dbase.js: deal with databases
const sqlite3 = require('sqlite3').verbose();

// connect to database
let dbPath = './db/';
let dbName = 'xmaslist';
db = connectDB(dbPath, dbName);

// 
let dictArr = [];
db.connectedTable = '';
let username = 'Liezl';

// database functions
function connectDB(dbPath, dbName) {
    return new sqlite3.Database(dbPath + dbName + '.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        else
            console.log('Connected to the ' + dbName + ' database.');
    });
};

db.createTable = function(tableName) {
    let sql = `CREATE TABLE IF NOT EXISTS ` + tableName + `(
        id INTEGER,
        title TEXT,
        link TEXT,
        image TEXT,
        price TEXT)`;
    console.log('\x1b[44m\x1b[30m%s\x1b[0m', sql);
    return this.run(sql, (err) => {
            if (err) {
                return console.log(err.message);
            }
            else {
                db.connectedTable = tableName;                
                console.log(db.connectedTable)
                console.log('\x1b[34m%s\x1b[0m', `Connected to table named ${username}`)
            }
        }).read(tableName)
};

db.insert = function(dict, tableName) {
    let sql = `INSERT INTO ` + tableName + ` (id,title,link,image,price)
        values (?,?,?,?,?)`;
    console.log('\x1b[46m\x1b[30m%s\x1b[0m', sql);
    return this.shiftIds(tableName).run(sql, [1, dict.title, dict.link, dict.image, dict.price], function(err) {
            if (err) {
                return console.log(err.message);
            }
            else
            {
                db.lastID = this.lastID;
                console.log('\x1b[36m%s\x1b[0m', `A row has been inserted with rowid ${this.lastID}`);
            }
        }).read(tableName)
};

db.read = function(tableName, rowId=-1) {
    let sqlBase = `SELECT rowid,* FROM ${tableName} ORDER BY id`;
    let sql = (rowId>=0)?(sqlBase + ` WHERE rowid = '${rowId}'`):sqlBase;
    console.log('\x1b[41m\x1b[30m%s\x1b[0m', sql);
    return this.all(sql, [], (err, rows) => {
        if (err) {
        throw `\t${err}`;
        }
        else {
            dictArr.splice(0, dictArr.length);
            rows.forEach((row) => {
                dictArr.push(row); //(({title, price, image, link})=>({title, price, image, link}))(row));
            });
            console.log('\x1b[31m%s\x1b[0m', 'dict Arr =');
            console.log(dictArr);
        }
  });
};

db.update = function(tableName, ID, newDict) {
    let sql = `UPDATE ${tableName}
         SET (title,link,image,price) = (?,?,?,?)
         WHERE id = ${ID}`;
    console.log('\x1b[43m\x1b[30m%s\x1b[0m', sql);
    return this.run(sql, [newDict.title, newDict.link, newDict.image, newDict.price], (err) => {
        if (err) {
            console.log(err);
        }
        else
            console.log('\x1b[33m%s\x1b[0m', `Updated row with id = ${ID}`);
  }).read(tableName);
};

db.shiftIds = function(tableName) {
    // let tableName = this.connectedTable;
    let sql = `UPDATE ${tableName}
         SET id = id + 1
         WHERE id >= ${1}`;
    console.log('\x1b[43m\x1b[30m%s\x1b[0m', sql);
    return this.run(sql, (err) => {
        if (err) {
            console.log(err);
        }
        else
            console.log('\x1b[33m%s\x1b[0m', `Updated ids with id >= ${1}`);
  });
};

db.deleteTable = function(tableName) {
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

db.closeDB = function() {
    this.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        else
            console.log('Close the database connection.')
        })
    };

db.example = function(tableName) {
    db.serialize(() => {
        db.createTable(tableName)
        // .read(username)
        
        // .shiftIds(username)
        .insert({title: "title1", link: "link1", image: "image1", price: "price1"}, tableName)
        // .read(username)
        
        // .shiftIds(username)
        .insert({title: "title2", link: "link2", image: "image2", price: "price2"}, tableName)
        // .read(username)
        
        .update(tableName, 2, {title: "updated_title", link: "updated_link", image: "updated_image", price: "updated_price"})
        // .read(username)
        
        .deleteTable(tableName)
    });
    db.closeDB();
};

// database example
db.example(username);