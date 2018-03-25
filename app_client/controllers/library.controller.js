/* global angular */
(function() {
  function ctrlLibrary(aaData, authentication, $location) {
    var vm = this;
    
    aaData.setTitle("AA | Library");
    
    vm.isUser = authentication.auth();
    if(!vm.isUser) {
      return $location.path('/login');
    }
    
    vm.pageHeader = {
      title: "My library",
      subtitle: "All the novels saved to your library"
    };
    vm.pageFooter = {
       left: [
        {
          title: "Previous page",
          href: ""
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
      aaData.library().then(
        function success(res) {
          if(!res.data.novels || res.data.novels.length == 0) return vm.message = "Can't find any novels.";
          vm.message = "";
          vm.data = res.data;
        }, 
        function error(res) {
          if(vm.isUser) {
            vm.message = "Status: " + res.status + " - " + res.data.message;
          }
        }
      );
    };
    
    // Ker zgornjega snipeta ne kličem, direktno pridobi podatke !!
    vm.getData();
  }
  ctrlLibrary.$inject = ['aaData', 'authentication', '$location'];
  
  angular
    .module('aa-novels')
    .controller('library.controller', ctrlLibrary);
})();