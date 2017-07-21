var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express(); //create new instance of express application

var classData = JSON.parse(fs.readFileSync('./Data_Parsing/jsonData.json', 'utf8'));
var majorNames = JSON.parse(fs.readFileSync('./majorListingScript/majorNames.json', 'utf8'));

app.use(bodyParser.urlencoded({ extended: false}));

app.use(function(req, res, next){
  console.log(`Method: ${req.method} from: ${req.url}`);
  next();
});


app.use(express.static("./public"));

/*
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
*/

//send full list of data to server

app.get("/getFullData", function(req, res){
  var jsonString = JSON.stringify(classData);
  res.end(jsonString);
});

//send list of majorNames

app.get("/getMajorData", function(req, res){
  var jsonString = JSON.stringify(majorNames);
  res.end(jsonString);
})


app.use(cors());
app.listen(process.env.PORT || 8080);

console.log("Server Listenting on Port: 8080");
