var express = require('express');
var app = express();

//local script
app.use("/util", express.static(__dirname + "/util"));

app.set('view engine', 'ejs');

app.listen(3000, function() {
  console.log('listening on 3000');
});

app.get('/', function(rew, res) {
  res.render('index.ejs');
});
