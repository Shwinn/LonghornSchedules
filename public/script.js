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
        generatedClassArea.append("<tr>");
        generatedClassArea.append("</td><input  type='checkbox' class='generatedClass' name='generatedClassData' value='" + fullClassData[i]['Unique Number'] + "'></td>");

        generatedClassArea.append("<td>" + fullClassData[i]['Unique Number'] + "<td>");

        generatedClassArea.append("<td ><label style='border: 3px solid red; border-radius: 5px;' for='" + fullClassData[i].CourseName + "'>" + fullClassData[i].CourseName + "</label></td>");


        generatedClassArea.append('</tr>');


      }
    }

    generatedClassArea.append("<input type='button' id='sendChosenData' value='Generate Data'>");

    //generatedClassArea.append("</tr>");

  });
});

$(document).ready(function(){
  $('#searchedClasses').on("click", "#sendChosenData" , function(){
    var chosenClasses = [];
    $('.generatedClass:checkbox:checked').each(function (){
      chosenClasses.push($(this).val());
    });

    $.post("/sendChosenData", {"chosenClasses" : chosenClasses}, function(data){
      //parse returned jason file
      //var generatedClasses = JSON.parse(data);
    });

  });
});
