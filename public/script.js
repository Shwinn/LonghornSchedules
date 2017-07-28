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
    $("#majorDropDown").append("<option value='" + studentMajorData[i] + "'>" + studentMajorData[i] + "</option");
  }
}


$(document).ready(function(){
  $('#submitSearch').click(function(){
    $('#searchedClasses').empty();
    $('#searchedClasses').append("<ul>");


    var selectedMajor = $("#majorDropDown").val();
    console.log(selectedMajor);

    for(i = 0; i < fullClassData.length; i++){
      var classMajor = fullClassData[i].CourseName.substring(0,3);
      if(classMajor == selectedMajor){
        $('#searchedClasses').append("<li>" + fullClassData[i].CourseName + "</li>");
      }
    }
    $('#searchedClasses').append("</ul>");
  });
});
