var generateSchedules = function(data){
  var chosenClasses = data;
  var allSchedules = [];

  //initialize 'week' array
  //-----------M--W-T--Th-F
  var week = [[],[],[],[],[]];

  //each day has 64 data slots so that it can cover from 8AM to 12AM with each hour broken down into
  //15 minute intervals (8AM - 12AM = 16 Hours * 4 = 64)
  for(i = 0; i < 5; i++){
    for(c = 0; c < 64; c++){
      week[i].push(0);
    }
  }

  var indexes = getIndexNumber(chosenClasses);
  var currentCombination = [];

  //initialize currentCombination with a length depending on indexes[]
  for(i = 0; i < indexes.length; i++){
    currentCombination.push(0);
  }
  //change currentCombination in order to get next class
  while(true){
    //add current combinations classes to 'week' array
    for(z = 0; z < currentCombination.length; z++){
      var classObject = chosenClasses[indexes[z][currentCombination[z]]];
      //get military time of classes and convert it to week Index
      var time1 = convertRawToWeek(getTime(classObject.Time));

      //get index of days (e.g. 0 = monday, 3 = thursday) given 'day' string from class object
      var day1 = getDays(classObject.Days);

      //add times to 'week' array
      for(i = 0; i < day1.length; i++){
        for(c = time1[0]; c <= time1[1]; c++){
          week[day1[i]][c] += 1;
        }
      }

      //if a second time and day is associated with this class, perform the same operations as for time/day 1
      if(classObject.Time2 != null && classObject.Days2 != null){
        var time2 = convertRawToWeek(getTime(classObject.Time2));
        var day2 = getDays(classObject.Days2);
        for(i = 0; i < day2.length; i++){
          for(c = time2[0]; c <= time2[1]; c++){
            week[day2[i]][c] += 1;
          }
        }
      }

    }

    //check if current combination of classes is valid (has no conflicts)
    var conflicts = false;
    for(i = 0; i < week.length; i++){
      for(c = 0; c < week[i].length; c++){
        if(week[i][c] > 1){
          conflicts = true;
          break;
        }
      }
      if (conflicts = true){
        break;
      }
    }

    //if no conflicts exist, then add this combination to the list of possible schedules
    if(conflicts === false){
      allSchedules.push(currentCombination);
    }

    //reset week array to all 0's
    for(i = 0; i < week.length; i++){
      for(c = 0; c < week.length; c++){
        week[i][c] = 0;
      }
    }

    //change to next combination, and if all have been iterated through, exit while loop
    var allCombinationsChecked = false;

    for(i = currentCombination.length - 1; i >= 0; i--){
      if((currentCombination[i]+1)%indexes[i].length === 0){
        //if index 0 of currentCombination has to be changed back to zero, that means all possible combinations have been iterated through
        if(i === 0){
          allCombinationsChecked = true;
          break;
        }
        currentCombination[i] = 0;
      }else{
        currentCombination[i] += 1;
        break;
      }

    }
    if(allCombinationsChecked === true){
      break;
    }
  }

  return allSchedules;
};


//takes the "Day" data value of a class object
//returns an array with an index 0-4 corresponding to the days for that class
function getDays(dayString){
  var days = [];

  if(dayString.includes("M") === true){
    days.push(0);
  }
  //tuesday thursday check
  if(dayString.includes("TWTH") === true){
    days.push(1);
    days.push(3);
  }else if(dayString.includes("TTH") === true){
    days.push(1);
    days.push(3);
  }else if(dayString.includes("TH") === true){
    days.push(3);
  }else if(dayString.includes("T") === true){
    days.push(1);
  }

  if(dayString.includes("W") === true){
    days.push(2);
  }

  if(dayString.includes("F") === true){
    days.push(4);
  }

  return days;

}

//takes input in terms of [startHour, startMinute, endHour, endMinute] -- what getTime produces
//converts info in that array into an index that can be used in 'Week' array
//return an array of length 2
function convertRawToWeek(timeArray){
  var indexStart = ((timeArray[0] - 8) * 4) + timeArray[1]/15;
  var indexEnd = ((timeArray[2] - 8) * 4) + timeArray[3]/15;
  return [indexStart, indexEnd];
}

//get time based on string given, and return numeric value
function getTime(timeString){

  var startHour = parseInt(timeString.substring(0, timeString.indexOf(':')));
  if(timeString.substring(timeString.indexOf(':') + 4, timeString.indexOf(':') + 5) === 'p' && startHour != 12){
    startHour += 12;
  }

  var startMinute = parseInt(timeString.substring((timeString.indexOf(':') + 1), (timeString.indexOf(':') + 3)));

  var endHour = parseInt(timeString.substring((timeString.indexOf('-') + 1), timeString.lastIndexOf(':')));
  if(timeString.substring(timeString.lastIndexOf(':') + 4, timeString.lastIndexOf(':') + 5) === 'p' && endHour != 12){
    endHour += 12;
  }

  var endMinute = parseInt(timeString.substring((timeString.lastIndexOf(':')+1), (timeString.lastIndexOf(':')+3)));

  return [startHour, startMinute, endHour, endMinute];
}

//takes in an array of class objects
//returns a 2D array with each column being a unique class and each element in each column containing the index of an element from the passed array
function getIndexNumber(chosenClasses){
  //create array of online Course Titles for selected courses
  var classTitle = [];

  for(i = 0; i < chosenClasses.length; i++){
    classTitle.push(chosenClasses[i].CourseName);
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

exports.generateSchedules = generateSchedules;
