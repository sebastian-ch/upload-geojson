var fs = require('fs');
var express = require('express');
/*var multer = require('multer');
var upload = multer({
  dest: 'uploads/'
}); */
var bodyParser = require('body-parser');
//var geojsonhint = require('@mapbox/geojsonhint');

var app = express();

app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 1000000
}));

//local script
app.use("/util", express.static(__dirname + "/util"));
app.use("/uploads", express.static(__dirname + "/uploads"));

var port = 8080;

app.set('view engine', 'ejs');

app.listen(port, function() {
  console.log('listening on ' + port);
});

app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.post('/upload', function(req, res) {

  var file = JSON.stringify(req.body.fileInput);
  var name = req.body.fileName;

  console.log(JSON.stringify(req.body.fileName));
/////
/////successfully saves input as JSON
/////
  /*saveInputAsJson(file, name, function(err) {
    if (err) {
      console.log(err);
      return;
    }
  }); */
  res.redirect('/');
  res.end();

});

function saveInputAsJson(file, name, callback) {
  var outputName = __dirname + '/uploads/' + name;
  fs.writeFile(outputName, file, callback);
}
