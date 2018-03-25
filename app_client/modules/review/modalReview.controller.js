/* global angular */
(function() {
  function reviewModalWindow($uibModalInstance, aaData, novel) {
    var vm = this;
    
    vm.novel = novel;
    
    vm.modalWindow = {
      close: function(res) {
        $uibModalInstance.close(res);
      },
      cancel: function() {
        $uibModalInstance.close();
      }
    };
    vm.addReview = function(novel_id, formData) {
      aaData.addReview(novel_id, {
        rating: formData.rating,
        review: formData.review
      }).then(
        function success(res) {
          vm.modalWindow.close(res.data);
        },
        function error(res) {
          vm.formError = "Error while saving the review. Please try again.";
        }
      );
      return false;
    };
    vm.sendData = function() {
      vm.formError = "";
      if(!vm.formData || !vm.formData.rating) {
        vm.formError = "You must, at the very least, provide a rating for the novel";
        return false;
      }
      vm.addReview(vm.novel.novel_id, vm.formData);
    };
  }
  reviewModalWindow.$inject = ['$uibModalInstance', 'aaData', 'novel'];
  
  angular
    .module('aa-novels')
    .controller('reviewModalWindow', reviewModalWindow);
})();