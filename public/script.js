//send get request to server and load full data locally
var fullClassData;

//send request to server to load Student Major Name data
var studentMajorData;

var selectedClasses = [];

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

//generate classes based on major chosen in dropdown
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

    generatedClassArea.append("<input type='button' id='addSelectedClasses' value='Add Selected Classes'>");

    //generatedClassArea.append("</tr>");

  });
});

//add selected classes to array and display on screen
$(document).ready(function(){
  $('#searchedClasses').on("click", "#addSelectedClasses" , function(){
    $('.generatedClass:checkbox:checked').each(function (){
      //push unique number into golbal array if the value is not already there
      if(selectedClasses.includes($(this).val()) === false){
        selectedClasses.push($(this).val());

        var className = '';

        //because we need to display the name of the class as well, we need to find it using the unique number
        for(i = 0; i < fullClassData.length; i++){
          if(fullClassData[i]['Unique Number'] === $(this).val()){
            className = fullClassData[i].CourseName;
          }
        }

        //area where selected class names will go
        var selectedClassArea = $('#selectedClasses');

        //add class name to text area
        selectedClassArea.append("<tr>");
        selectedClassArea.append("<td>" + $(this).val() + " " + className + "</td>");
        selectedClassArea.append("</tr>");
      }

    });

    if($('#removeSelectedClassesButton').children().length === 0){
      $('#removeSelectedClassesButton').append("<input type='button' id='clearSelectedClasses' value='Clear Selected Classes'>");
      $('#removeSelectedClassesButton').append("<input type='button' id='generateSchedules' value= 'Generate Schedules'>");
    }else{

    }

    /*
    $.post("/sendChosenData", {"chosenClasses" : chosenClasses}, function(data){
      //parse returned jason file
      //var generatedClasses = JSON.parse(data);
    });
    */
  });
});

//remove classes when 'remove selected classes button' is pressed
$(document).ready(function(){
  $('#removeSelectedClassesButton').on('click', '#clearSelectedClasses', function(){
    //clear text area and buttons
    $('#selectedClasses').empty();
    $('#removeSelectedClassesButton').empty();
    //empty golbal selectedClasses array
    selectedClasses = [];
  });
});



//send selected classes to server
$(document).ready(function(){
  $('#removeSelectedClassesButton').on('click', "#generateSchedules", function(){
    $.post("/sendChosenData", {"chosenClasses" : selectedClasses}, function(data){
      //locally save the data  -- have to clear later
      window.localStorage.setItem("classSchedules", data);
      window.location.href = './generatedSchedules.html';
    });

  });
});
