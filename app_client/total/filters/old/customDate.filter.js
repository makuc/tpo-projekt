/* global angular */
(function() {
  var customDate = function() {
    return function(origDate) {
      if(!origDate) return "";
      
      var date = new Date(origDate);
      var monthsNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var d = date.getDate();
      var m = monthsNames[date.getMonth()];
      var y = date.getFullYear();
      var formatted = "";
      if(d == 1 || d == 21 || d == 31)
        formatted += d + "st ";
      else if(d == 2 || d == 22)
        formatted += d + "nd";
      else if(d == 3 || d == 23)
        formatted += d + "rd";
      else
        formatted += d + "th";
      
      var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});
      
      formatted += " of " + m + ", " + y + " - " + time;
      return formatted;
    };
  };
  
  angular
    .module('aa-novels')
    .filter('customDate', customDate);
})();