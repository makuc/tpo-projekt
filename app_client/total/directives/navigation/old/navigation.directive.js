/* global angular */
(function() {
  var navigation = function() {
    return {
      restrict: 'EA',
      templateUrl: "/total/directives/navigation/navigation.template.html",
      controller: 'navigation.controller',
      controllerAs: 'navvm'
    };
  };
  
  angular
    .module('aa-novels')
    .directive('nav', navigation);
})();