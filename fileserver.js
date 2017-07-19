var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express(); //create new instance of express application

var classData = JSON.parse(fs.readFileSync('jsonData.json', 'utf8'));

app.use(bodyParser.urlencoded({ extended: false}));

app.use(function(req, res, next){
  console.log(`Method: ${req.method} from: ${req.url}`);
  next();
});


app.use(express.static("./public"));

app.post("/queryDatabase", function(req, res){
  //convert user input to a reg-exp object
  var dataRegExp = new RegExp(req.body.searchField.toLowerCase());

  //find matches using query
  var jsonArray = []; //matching data to be added in here
  for(i = 0; i < classData.length; i++){
    if(dataRegExp.test(classData[i].CourseName.toLowerCase())){
      console.log("found!");
      jsonArray.push(classData[i]);
    }
  }

  var jsonString = JSON.stringify(jsonArray);
  res.end(jsonString);
});

app.use(cors());
app.listen(process.env.PORT || 8080);

console.log("Server Listenting on Port: 8080");
