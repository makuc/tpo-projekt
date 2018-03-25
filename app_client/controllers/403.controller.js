/* global angular */
(function() {
  function ctrlForbidden(aaData) {
    var vm = this;
    
    aaData.setTitle("AA | 403");
    
    var content = "<p>You are not permitted to visit the page you requested</p>";
    
    vm.pageHeader = {
      title: "403 - Forbidden",
      subtitle: "Trying to be sneaky, huh..."
    };
    vm.pageFooter = {
       left: [
        {
          title: "Forbidden",
          href: "/403"
        }
      ],
      right: ""
    };
    vm.content = content;
  }
  ctrlForbidden.$inject = ['aaData'];
  
  angular
    .module('aa-novels')
    .controller('403.controller', ctrlForbidden);
})();