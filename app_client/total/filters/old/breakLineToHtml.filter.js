/* global angular */
(function() {
  var breakLineToHtml = function() {
    return function(content) {
      if(!content) return "";
      var result = content.replace(/\n/g, '<br/>');
      return result;
    };
  };
  
  angular
    .module('aa-novels')
    .filter('breakLineToHtml', breakLineToHtml);
})();