/* global angular */
(function() {
  function ctrlNav($location, authentication, $routeParams) {
    var navvm = this;
    
    navvm.searchTerm = $routeParams.s;
    
    navvm.prevPage = navvm.currentLocation;
    navvm.currentLocation = $location.path();
    
    navvm.isUser = authentication.auth();
    
    navvm.currentUser = authentication.currentUser();
    
    navvm.search = function() {
      if(navvm.searchTerm) {
        $location.path('/search');
        $location.search('s', navvm.searchTerm);
      }
    };
    
    navvm.logout = function() {
      authentication.logout();
      $location.path('/login');
    };
  }
  ctrlNav.$inject = ['$location', 'authentication', '$routeParams'];
  
  angular
    .module('aa-novels')
    .controller('navigation.controller', ctrlNav);
})();