//send get request to server and load full data locally
var fullClassData;

//send request to server to load Student Major Name data
var studentMajorData;

var selectedClasses = [];

$.get("/getFullData", function(data){
  fullClassData = JSON.parse(data);
});

$.get("/getMajorData", function(data){
  studentMajorData = JSON.parse(data);
  studentMajorData.sort();
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


    generatedClassArea.append("<input type='button' id='addSelectedClasses' value='Add Selected Classes'>");

    //based on data in drop down, populate site with classes
    for(i = 0; i < fullClassData.length; i++){
      var classMajor = fullClassData[i].CourseName.substring(0,3);
      if(classMajor == selectedMajor){
        var uniqueNumber = fullClassData[i]['Unique Number'];
        generatedClassArea.append("<div class='generatedClasses'>");

        generatedClassArea.append("<tr>");

        generatedClassArea.append(`<td><input  type='checkbox' class='generatedClass' name='generatedClassData' value='${uniqueNumber}' id='${uniqueNumber}'></td>`);
        generatedClassArea.append(`<td><label class='textLabel' for='${uniqueNumber}'>Unique Number: ${uniqueNumber} <br/>Name: ${fullClassData[i].CourseName} <br/>Instructor Name: ${fullClassData[i]['Instructor Name']} </label><td>`);

        generatedClassArea.append('</tr>');

        generatedClassArea.append("</div>");

      }
    }




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

    //generate buttons to generate schdules and clear selected classes -- we only want them
    //when there are classes chosen
    if($('#removeSelectedClassesButton').children().length === 0){
      $('#removeSelectedClassesButton').append("<input type='button' class='aButton' id='clearSelectedClasses' value='Clear Selected Classes'>");
      $('#removeSelectedClassesButton').append("<input type='button' class='aButton' id='generateSchedules' value= 'Generate Schedules'>");
    }else{

    }

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
      selectedClasses = [];

      //locally save the data  -- have to clear later
      window.localStorage.setItem("classSchedules", data);
      //set window to generated schedules page
      var url = './generatedSchedules.html'
      var win = window.open(url, '_blank',);
      win.focus();
    });

  });
});
