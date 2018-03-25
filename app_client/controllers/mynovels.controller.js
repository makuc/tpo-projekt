/* global angular */
(function() {
  function ctrlMyNovels(aaData, authentication, $location) {
    var vm = this;
    
    aaData.setTitle("AA | My novels");
    
    vm.isUser = authentication.auth();
    if(!vm.isUser) {
      return $location.path('/login');
    }
    vm.mynovels = true;
    
    vm.pageHeader = {
      title: "My novels",
      subtitle: "Works I've written"
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
      aaData.mynovels().then(
        function success(res) {
          if(!res.data.novels || res.data.novels.length == 0)
            return vm.message = "Can't find any novels.";
          
          vm.message = "";
          vm.data = res.data;
        }, 
        function error(res) {
          if(vm.isUser) {
            if(res.status == 401) return $location.path("/login");
            else vm.message = "Encountered an error. Response status: " + res.status;
          }
        }
      );
    };
    
    // Ker zgornjega snipeta ne kličem, direktno pridobi podatke !!
    vm.getData();
  }
  ctrlMyNovels.$inject = ['aaData', 'authentication', '$location'];
  
  angular
    .module('aa-novels')
    .controller('mynovels.controller', ctrlMyNovels);
})();