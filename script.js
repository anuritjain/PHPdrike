$(document).ready(function() {

 $("#getResults").on("click", function() {
  var SearchVal = $('#getText').val()
  if (SearchVal === "") {
   return;
  }
  select();
 });

 function select() {
  var Miles = $('#miles').val();
  var SearchVal = $('#getText').val()
  var searchCity = "&q=" + SearchVal;
  var res = {
   "async": true,
   "crossDomain": true,
   "url": "https://developers.zomato.com/api/v2.1/search?entity_id=" + valueDropdown + "&entity_type=city" + searchCity + "&count=5",
   "method": "GET",
   "headers": {
    "user-key": "d710754ce67200fb6fb9b5e26139f50e",
    'Content-Type': 'application/x-www-form-urlencoded'
   }
  }

  $.getJSON(res, function(data) {

   data = data.restaurants;
   var html = "";

   $.each(data, function(index, value) {

    var x = data[index];
    $.each(x, function(index, value) {
     var location = x.restaurant.location;
     var userRating = x.restaurant.user_rating;
     html += "<div class='data'>";
     html += "<div class='rating'>";

     html += "<span title='" + userRating.rating_text + "'><p style='color:white;background-color:#" + userRating.rating_color + ";border-radius:4px;border:none;padding:2px 10px 2px 10px;text-align: center;text-decoration:none;display:inline-block;font-size:16px;float:right;'><strong>" + userRating.aggregate_rating + "</strong></p></span><br>";
     html += "  <strong class='text-info'>" + userRating.votes + " votes</strong>";
     html += "</div>";
     html += "<img class='resimg img-rounded' src=" + value.thumb + " alt='Restaurant Image' height='150' width='185'>";
     html += "<a href=" + value.url + " target='_blank' class='action_link'><h3 style='color:#cb202d;'><strong>" + value.name + "</strong></h3></a>";
     html += "  <strong class='text-primary'>" + location.locality + "</strong><br>";
     html += "  <h6 style='color:grey;'><strong>" + location.address + "</strong></h6>";
     html += "  <strong>Cuisines</strong>: " + value.cuisines + "<br>";
     html += "  <strong>Cost For Two</strong>: " + value.currency + value.average_cost_for_two + "<br>";
     html += "</div><br>";
    });
   });
   $(".results").html(html);
  });

 }

});