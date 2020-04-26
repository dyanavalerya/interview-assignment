const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const crypto = require('crypto');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'node_and_mysql'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE node_and_mysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});


function checksum(str, algorithm, encoding) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex')
}


function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename)
    var fileSizeInBytes = stats["size"]
    return fileSizeInBytes
}

// Select users
app.get('/getusers', (req, res) => {
    let sql = 'SELECT * FROM users';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Users fetched...');

        // stringify JSON Object
        var jsonContent = JSON.stringify(results);
        fs.writeFile('users.json', jsonContent, 'utf8', function(err){
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }    
        console.log("JSON file has been saved.");
        }); 

        var hash = crypto.createHash('md5'),
        stream = fs.createReadStream('users.json')

        stream.on('data', function(data) {
          hash.update(data, 'utf8')
        })

        stream.on('end', function() {
            var data1 = hash.digest('hex')
          
            var data2 = checksum(jsonContent);
            var filesize = getFilesizeInBytes('users.json');
            console.log('File size: ', filesize);
            if(data1 === data2 & filesize > 0){
                console.log('Data is written and integrity is maintained :)');
                    let sql = 'DELETE FROM users';
                    let query = db.query(sql, (err, result) => {
                        if(err) throw err;
                        console.log(result);
                        console.log('Table users from the database deleted...');
                    });
            }
            else{
                console.log('Data integrity was not maintained :(');
            }
        });
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});