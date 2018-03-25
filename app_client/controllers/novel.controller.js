/* global angular */
(function() {
  function novelDetails($routeParams, $uibModal, aaData, authentication, $location) {
    var vm = this;
    
    vm.isUser = authentication.auth();
    
    vm.novel_id = $routeParams.novel_id;
    vm.pageHeader = {
      title: 'AA - Novels'
    };
    vm.pageFooter = {
       left: [
        {
          title: "Browse",
          href: "/browse"
        },
        {
          title: "Doesn't exist",
          href: "/novel/" + vm.novel_id
        }
      ],
      right: ""
    };
    
    vm.novelUrl = "/novel/" + vm.novel_id;
    vm.url = $location.path();
    
    aaData.novelDetails(vm.novel_id).then(
      function success(res) {
        vm.novel = res.data;
        vm.pageHeader.title = vm.novel.title;
        vm.pageHeader.smallTitle = vm.novel.author.name;
        vm.pageFooter.left[1].title = vm.novel.title;
        vm.library = vm.novel.library;
        
        aaData.setTitle("AA | " + vm.novel.title);
      },
      function error(res) {
        return $location.path("/browse");
      }
    );
    vm.addToLibrary = function() {
      if(vm.isUser) {
        aaData.addToLibrary(vm.novel_id).then(
          function success(res) {
            vm.library = true;
          },
          function error(res) {
            vm.message = "Error saving novel to library - reponse status: " + res.status;
          }
        );
      } else {
        return $location.path('/login');
      }
    };
    vm.removeFromLibrary = function() {
      aaData.removeFromLibrary(vm.novel_id).then(
        function success(res) {
          vm.library = false;
        },
        function error(res) {
          vm.message = "Error removing this novel from library - response status: " + res.status;
        }
      );
    };
    vm.showAddReview = function(){
      var modalInstance = $uibModal.open({
        templateUrl: "/modules/review/addReview.template.html",
        controller: "reviewModalWindow",
        controllerAs: 'vm',
        resolve: {
          novel: function() {
            return {
              novel_id: vm.novel_id,
              title: vm.novel.title
            };
          }
        }
      });
      modalInstance.result.then(
        function(review) {
          if(typeof review == 'undefined') return;
          // Recalculate rating of the novel locally
          vm.novel.rating = (vm.novel.rating * vm.novel.reviews.length + review.rating) / (vm.novel.reviews.length + 1);
          // Append actual data of the current user, since we received only _id
          review.author = authentication.currentUser();
          // Save and display the review locally
          vm.novel.reviews.push(review);
        },
        function() {
          // catch the event but DO NOTHING
        }
      );
    };
    
    vm.deleteEntry = function() {
      aaData.deleteNovel(vm.novel_id).then(
      function success(res) {
        return $location.path('/mynovels');
      },
      function error(res) {
        vm.message = "Error deleting this novel. Please try again later! Response status: " + res.status;
      }
    );
    };
  }
  novelDetails.$inject = ['$routeParams', '$uibModal', 'aaData', 'authentication', '$location'];
  
  angular
    .module('aa-novels')
    .controller('novel.controller', novelDetails);
})();