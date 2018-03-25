/* global angular */
(function() {
  function ctrlBrowse(/*$scope,*/ aaData, $routeParams /* , geolokacija */) {
    var vm = this;
    
    aaData.setTitle("AA | Browse");
    
    vm.pageHeader = {
      title: "Browse",
      subtitle: "Find that novel you're dying to read"
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
      var genres = $routeParams.g;
      aaData.browse(genres).then(
        function success(res) {
          if(!res.data.novels || res.data.novels.length == 0) return vm.message = "Can't find any novels.";
          vm.message = "";
          vm.data = res.data;
        }, 
        function error(res) {
          vm.message = "Encountered an error! Response status: " + res.status + " - " + res.data.message;
        }
      );
    };
    /*
    vm.showError = function(napaka) {
      $scope.$apply(function() {
        vm.sporocilo = napaka.message;
      });
    };
  
    vm.noLocation = function() {
      $scope.$apply(function() {
        vm.sporocilo = "Vaš brskalnik ne podpira geolociranja!";
      });
    };
    
    geolokacija.vrniLokacijo(vm.getData, vm.showError, vm.noLocation);
    */
    
    // Ker zgornjega snipeta ne kličem, direktno pridobi podatke !!
    vm.getData();
  }
  ctrlBrowse.$inject = [/*'$scope',*/ 'aaData', '$routeParams' /*, 'geolokacija' */ ];
  
  angular
    .module('aa-novels')
    .controller('browse.controller', ctrlBrowse);
})();