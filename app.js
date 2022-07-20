
const express = require("express");
const adminRoutes = require('./router/admin')

const app = express();

console.log('hello');

   console.log('app');

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.set('view engine', 'ejs');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5678',
  database: 'dbms_project',
  multipleStatements: true
});
 //connection = mysql.createConnection({multipleStatements: true});
connection.connect(function(err) {
    if (err) throw err;
    connection.query("SHOW TABLES;Select * from available; select * from sold", function (err, result, fields) {
      if (err) throw err;
      console.log(result[0]);
      console.log(result[1]);
      console.log(result[2]);
      
    });
    
  });
  


app.use(adminRoutes);


app.listen(7000, function() {
    console.log("Server started on port 7000");
});
  