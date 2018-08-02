var config = require('./config');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(config.profileDbPath);
const db = low(adapter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/profile/', function (req, res) {

  var phoneNumber = req.body.phoneNumber;
  var username = req.body.username;

  console.log(username);
  console.log(phoneNumber);

  try{
    db.defaults({ profiles: [] })
    .write();

    db.get('profiles')
    .push({ username: username, phoneNumber: phoneNumber})
    .write();

    res.send();

}catch(ex){
  console.log(ex);
}

})

app.get('/api/profile/:phonenumber', function (req, res) {

  var phoneNumber = req.params.phonenumber;

  console.log(phoneNumber);

  try{
    var stuff = db.get('profiles')
    .find({ phoneNumber: "+" + phoneNumber })
    .value();

    console.log(stuff);

    res.send(stuff);

  }catch(ex){
  console.log(ex);
  }

})

app.listen(3008);
