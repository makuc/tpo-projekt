/* global angular */
(function() {
  function ctrlSearch($scope, aaData, $routeParams, $route, $location) {
    var vm = this;
    
    aaData.setTitle("AA | Search");
    
    vm.pageHeader = {
      title: "Search",
      subtitle: "A fine taste indeed!"
    };
    vm.pageFooter = {
       left: [
        {
          title: "Previous page",
          href: "#"
        },
        {
          title: "Next page",
          href: ""
        }
      ],
      right: "Page 1 / 1"
    };
    vm.message = "Getting list of novels...";
    
    vm.getData = function() {
      var search = $routeParams.s;
      var genres = $routeParams.g;
      if(!search) {
        return $location.path('/');
      } else {
        aaData.search(search, genres).then(
          function success(res) {
            if(!res.data.novels || res.data.novels.length == 0) return vm.message = "Can't find any novels.";
            vm.message = "";
            vm.data = res.data;
          }, 
          function error(res) {
            vm.message = "Encountered an error getting novels!";
          }
        );
      }
    };
    
    // Ker zgornjega snipeta ne kličem, direktno pridobi podatke !!
    vm.getData();
  }
  ctrlSearch.$inject = ['$scope', 'aaData', '$routeParams', '$route', '$location'];
  
  angular
    .module('aa-novels')
    .controller('search.controller', ctrlSearch);
})();