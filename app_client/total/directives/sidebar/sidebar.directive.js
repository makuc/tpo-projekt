/* global angular */
(function() {
  var sidebar = function() {
    return {
      restrict: 'EA',
      scope: {
        vm: '=vm'
      },
      templateUrl: "/total/directives/sidebar/sidebar.template.html",
      controller: "sidebar.controller",
      controllerAs: "sdbvm"
    };
  };
  
  angular
    .module('aa-novels')
    .directive('sidebar', sidebar);
})();