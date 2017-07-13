$(document).ready(function(){
  $('#submitSearch').click(function(){
    $.post("/queryDatabase", $('#classSearch').serialize(), function(data){
      console.log(data);
    }, 'json');
  });
});


/*
$(document).ready(function(){
  $("#button1").click(function(){
    $.post('/getData', function(data){
      console.log("getting server side text");
      $('#insertText').append(data);
    });
  });
});
*/
