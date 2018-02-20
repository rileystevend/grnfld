var express = require('express');
var bodyParser = require('body-parser');

var items = require('../database-pg');


var app = express();


app.use(express.static(__dirname + '/../app'));
app.use(express.static(__dirname + '/../node_modules'));



app.listen(process.env.PORT || 3000, function() {
  console.log('listening on port 3000!');
});

