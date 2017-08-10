var generateSchedules = function(data){
  var chosenClasses = data;


  //initialize 'week' array
  //-----------M--W-T--Th-F
  var week = [[],[],[],[],[]];

  //each day has 64 data slots so that it can cover from 8AM to 12AM with each hour broken down into
  //15 minute intervals (8AM - 12AM = 16 Hours * 4 = 64)
  for(i = 0; i < 5; i++){
    for(c = 0; c < 64; c++){
      week[i].push(i);
    }
  }

  getTime(chosenClasses[0].Time);

  var indexes = getIndexNumber(chosenClasses);

};

//get time based on string given, and return numeric value
function getTime(timeString){
  var startHour = timeString.substring(0, timeString.indexOf(':'));
  var startMinute = timeString.substring((timeString.indexOf(':') + 1), (timeString.indexOf(':') + 3));

  var endHour = timeString.substring((timeString.indexOf('-') + 1), timeString.lastIndexOf(':'));
  var endMinute = timeString.substring((timeString.lastIndexOf(':')+1), (timeString.lastIndexOf(':')+3));

  return [parseInt(starHour), parseInt(startMinute), parseInt(endHour), parseInt(endMinute)];
}

function getIndexNumber(chosenClasses){
  //get the title of all chosen classes e.g. "E E  411 CIRCUIT THEORY" --> "E E  411 ", "E E  107S INTRODUCTION TO LINUX" --> "E E  107S" ------SPACE AT END MATTERS-------
  var classTitle = [];
  for(i = 0; i < chosenClasses.length; i++){
    classTitle.push(getClassNumber(chosenClasses[i].CourseName));
  }

  //search for identical classes and create an array of only those unique names
  var uniqueClassTitles = [];
  for(i = 0; i < classTitle.length; i++){
    var add = true;
    //if element in classTitle array is already in uniqueclassTitles, then do not add
    uniqueClassTitles.forEach(function(element){
      if(classTitle[i] === element){
        add = false;
      }
    });

    if(add === true){
      uniqueClassTitles.push(classTitle[i]);
    }
  }

  //using the array just created, go through classList and find the indexes of all matching elements, put them into an array, and then push that array into the Indexes array
  var indexes = [];
  for(i = 0; i < uniqueClassTitles.length; i++){
    var matchingNameIndexes = [];

    for(c = 0; c < classTitle.length; c++){
      if(uniqueClassTitles[i] === classTitle[c]){
        matchingNameIndexes.push(c);
      }
    }
    indexes.push(matchingNameIndexes);
  }

  return indexes;
}

function getClassNumber(classNameString){
  return classNameString.substring(0,9);
}

exports.generateSchedules = generateSchedules;
