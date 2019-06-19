const express = require('express');
const app = express();
var mysql = require('mysql')
app.get("/", (req, res) => {
    res.send("hello");
})

app.listen(3000, function() {
    console.log('server running on port 300');
})

var connection = mysql.createConnection({
    host    : "localhost",
    port    : 3306,
    user    : "root",
    password: "",
    database: "mysql0918"
})

connection.connect();

connection.query('SELECT * FROM users', function(err, data) {
    if (err) throw err

    app.get('/users', function(req, res) {
        var users = "";
        for ( let i = 0; i < data.length; i++) {
            users += data[i].name + ' ';
        }
        res.send(users);
    })
})

connection.query('SELECT * FROM users', function(err, data) {
    if(err) throw err
    for (let a = 0; a < data.length; a++) {
        app.get('/users/' + data[a].id, function(req, res) {
            res.send(data[a].name);
        })
    }

})


connection.end();