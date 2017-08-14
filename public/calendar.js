$(document).ready(function(){
  $('#calendar').fullCalendar({
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    weekends: false,
    defaultView: 'agendaWeek',
    minTime: '08:00:00'
  });
});
