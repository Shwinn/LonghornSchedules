var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var logic = require('./schedulingAlgorithm/logic.js');

var app = express(); //create new instance of express application

var classData = JSON.parse(fs.readFileSync('./Data_Parsing/jsonData.json', 'utf8'));
var majorNames = JSON.parse(fs.readFileSync('./majorListingScript/majorNames.json', 'utf8'));

app.use(bodyParser.urlencoded({ extended: false}));

app.use(function(req, res, next){
  console.log(`Method: ${req.method} from: ${req.url}`);
  next();
});


app.use(express.static("./public"));

//send full list of data to server

app.get("/getFullData", function(req, res){
  var jsonString = JSON.stringify(classData);
  res.end(jsonString);
});

app.post("/sendChosenData", function(req, res){
  var data = req.body["chosenClasses[]"];

  var classes = [];
  //data type of 'data' changes depending on whether it is given 1 class or multiple from client. If 1 is passed from client, then data type is string, otherwise it is object
  if(typeof(data) == 'object'){
    for(i = 0; i < data.length; i++){
      for(c = 0; c < classData.length; c++){
        if(data[i] === classData[c]["Unique Number"]){
          classes.push(classData[c]);
        }
      }
    }
  }else{
    for(i = 0; i < classData.length; i++){
      if(classData[i]["Unique Number"] === data){
        classes.push(classData[i]);
      }
    }
  }

  res.end(JSON.stringify(logic.generateSchedules(classes)));
})

//send list of majorNames

app.get("/getMajorData", function(req, res){
  var jsonString = JSON.stringify(majorNames);
  res.end(jsonString);
})


app.use(cors());
app.listen(process.env.PORT || 8080);

console.log("Server Listenting on Port: 8080");
