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
    //clear previously generated data
    $('#searchedClasses').empty();

    //get value currently in drop down
    var selectedMajor = $("#majorDropDown").val();

    var generatedClassArea = $('#searchedClasses');

    //generatedClassArea.append("<tr>")

    //based on data in drop down, populate site with classes
    for(i = 0; i < fullClassData.length; i++){
      var classMajor = fullClassData[i].CourseName.substring(0,3);
      if(classMajor == selectedMajor){
        generatedClassArea.append("<tr><td >");

        generatedClassArea.append("<label style='border: 3px solid red; border-radius: 5px;' for='" + fullClassData[i].CourseName + "'>" + fullClassData[i].CourseName + "</label>");
        generatedClassArea.append("<input  type='checkbox' name='generatedClassData' value='" + fullClassData[i].CourseName + "'>");

        generatedClassArea.append('</td></tr>');

      }
    }

    //generatedClassArea.append("</tr>");

  });
});
