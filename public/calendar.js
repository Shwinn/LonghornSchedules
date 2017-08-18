$(document).ready(function(){
  generateCalendars();
});

function generateCalendars(){
  var classSchedules = JSON.parse(window.localStorage.getItem('classSchedules'));

  for(i = 0; i < classSchedules.length; i++){
    var calendarNumber = 'calendar' + i;
    $('body').append("<div class='generatedCalendar' id = '" + calendarNumber + "'></div>");

    //create the event array of objects
    var classEvents = [];
    for(c = 0; c < classSchedules[i].length; c++){
      //get Days
      var classDays = getDays(classSchedules[i][c].Days);
      var classTimes1 = getTime(classSchedules[i][c].Time);

      for(z = 0; z < classDays.length; z++){

        var dates = getDateString(classDays[z], classTimes1);

        var eventObject = {
          title : classSchedules[i][c].CourseName,
          start : dates[0],
          end : dates[1]
        }

        classEvents.push(eventObject);
      }


      if(classSchedules[i][c].Days2 !== "None"){
        //get Days
        var classDays2 = getDays(classSchedules[i][c].Days2);
        var classTimes2 = getTime(classSchedules[i][c].Time2);


        for(z = 0; z < classDays2.length; z++){
          var dates = getDateString(classDays2[z], classTimes2);

          var eventObject = {
            title : classSchedules[i][c].CourseName,
            start : dates[0],
            end : dates[1]
          }
          classEvents.push(eventObject);
        }
      }
    }

    var concatonatedCalendarName = '#' + calendarNumber;
    $(concatonatedCalendarName).fullCalendar({
      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      defaultDate: '2017-05-05',
      weekends: false,
      defaultView: 'agendaWeek',
      minTime: '08:00:00',
      allDaySlot: false,
      header: false,
      columnFormat: 'ddd',
      events: classEvents
    });
  }
}

//given a Time array and Day string, returns array of concatonated startDate and endDate strings
function getDateString(days, classTimes){
  day = days + 1;
  var startDate = '2017-05-0' + day + 'T' + pad(classTimes[0]) + ':' + pad(classTimes[1]) + ':00';
  var endDate = '2017-05-0' + day + 'T' + pad(classTimes[2]) + ':' + pad(classTimes[3]) + ':00';

  return [startDate, endDate];
}

//pads given number and returns a string
function pad(number){
  if(number < 10){
    return "0" + number;
  }
  return "" + number;
}

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
