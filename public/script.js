$(document).ready(function(){
  $('#submitSearch').click(function(){
    $.post("/queryDatabase", $('#classSearch').serialize(), function(data){
      var jsonQuery = JSON.parse(data); //parse queried JSON Data
      console.log(jsonQuery);
    });
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
