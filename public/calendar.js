$(document).ready(function(){
  $('#calendar').fullCalendar({
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    weekends: false,
    defaultView: 'agendaWeek',
    minTime: '08:00:00',
    allDaySlot: false,

    events: [
      {
        title : 'birthday!',
        start : '2017-08-14T14:00:00',
        end : '2017-08-14T16:15:00'
      }
    ],

    titleFormat: ' ',
    columnFormat: 'ddd',
    buttonIcons: false
  });
});
