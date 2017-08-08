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
  getTimeOne(chosenClasses[0].Time);
}

function getTimeOne(timeString){
  
}

function getClassNumer(classNameString){

}

exports.generateSchedules = generateSchedules;
