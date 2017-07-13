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
  console.log(req.body.searchField);
  var jsonString = "[";
  for(i = 0; i < classData.length; i++){
    console.log(classData[i].CourseName);
    if(classData[i].CourseName.search(req.body.searchField) != -1){
      jsonString += "{" + classData[i].CourseName + ","
        + classData[i].UniqueNumber + ","
        + classData[i].Status + ","
        + classData[i].Days + ","
        + classData[i].Days2 + ","
        + classData[i].Time + ","
        + classData[i].Time2 + ","
        + classData[i].Room + ","
        + classData[i].Room2 + ","
        + classData[i]['Instructor Name'] + "}";
    }
  }
  jsonString += "]";
  var jsonData = JSON.stringify(jsonString);
  res.end(jsonData);
});

app.use(cors());
app.listen(process.evn.PORT || 8080);

console.log("Server Listenting on Port: 3000");
