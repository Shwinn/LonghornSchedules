//send get request to server and load full data locally
var fullClassData;

//send request to server to load Student Major Name data
var studentMajorData;

$.get("/getFullData", function(data){
  fullClassData = JSON.parse(data);
  console.log(fullClassData);
});

$.get("/getMajorData", function(data){
  studentMajorData = JSON.parse(data);
  console.log(studentMajorData);
  populateMajorDropDown();
});

function populateMajorDropDown(){
  for(i = 0; i < studentMajorData.length; i++){
    $("#majorDropDown").append("<option value=" + studentMajorData[i] + ">" + studentMajorData[i] + "</option");
  }
}


$(document).ready(function(){
  $('#submitSearch').click(function(){
    /*
    $.post("/queryDatabase", $('#classSearch').serialize(), function(data){
      var jsonQuery = JSON.parse(data); //parse queried JSON Data
      console.log(jsonQuery);

    });
    */

    console.log($('#classSearch').serialize())
  });
});
