/* global angular */
(function() {
    function ctrlDB(dbMng, aaData) {
    var vm = this;
    
    aaData.setTitle("AA | DB Management");
    
    vm.pageHeader = {
      title: "Database Management",
      subtitle: "Stories, that's all that matters"
    };
    vm.pageFooter = {
       left: [
        {
          title: "DB Management",
          href: "/db"
        }
      ],
      right: ""
    };
    vm.msg = "";
    
    vm.dropdb = function() {
      var response = dbMng.dropdb();
      if(response.status == 500) {
        vm.error = response.data;
      } else {
        vm.msg = "Database dropped!";
      }
    };
    vm.populatedb = function() {
      var response = dbMng.populatedb();
      if(response.status == 500) {
        vm.error = response.data;
      } else {
        vm.msg = "Database populated with dummy data!";
      }
    };
  }
  ctrlDB.$inject = ['dbMng', 'aaData'];
  
  angular
    .module('aa-novels')
    .controller('db.controller', ctrlDB);
})();