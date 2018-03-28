/* global angular */
(function() {
  var header = function() {
    return {
      restrict: 'EA',
      templateUrl: "/total/directives/header/header.template.html"
    };
  };
  
  angular
    .module('aa-novels')
    .directive('header', header);
})();