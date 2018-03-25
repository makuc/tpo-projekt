/* global angular */
(function() {
  var footer = function() {
    return {
      restrict: 'EA',
      templateUrl: "/total/directives/footer/footer.template.html"
    };
  };
  
  angular
    .module('aa-novels')
    .directive('footer', footer);
})();