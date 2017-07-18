$(document).ready(function(){
  $('#submitSearch').click(function(){
    $.post("/queryDatabase", $('#classSearch').serialize(), function(data){
      var jsonQuery = JSON.parse(data); //parse queried JSON Data
      console.log(jsonQuery);

    });
  });
});
