/* global angular */
(function() {
  var selectGenres = function() {
    return {
      restrict: 'EA',
      scope: {
        genres: '=genres'
        
      },
      templateUrl: "/total/directives/selectGenres/select-genres.html",
      controller: "genres.controller",
      controllerAs: "gvm"
    };
  };
  
  angular
    .module('aa-novels')
    .directive('selectGenres', selectGenres);
})();