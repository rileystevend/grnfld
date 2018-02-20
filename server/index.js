var express = require('express');
var bodyParser = require('body-parser');

var items = require('../database-pg');


var app = express();


app.use(express.static(__dirname + '/../angular-client'));
app.use(express.static(__dirname + '/../node_modules'));



app.listen(3000, function() {
  console.log('listening on port 3000!');
});

