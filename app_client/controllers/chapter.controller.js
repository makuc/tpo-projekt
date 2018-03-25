/* global angular */
(function() {
  function chapter($routeParams, aaData, authentication, $location) {
    var vm = this;
    
    vm.isUser = authentication.auth();
    
    vm.chapter_id = $routeParams.chapter_id;
    vm.novel_id = $routeParams.novel_id;
    
    vm.pageHeader = {
      title: 'Chapter details'
    };
    vm.pageFooter = {
       left: [
        {
          title: "Browse",
          href: "/browse"
        },
        {
          title: "Novel name",
          href: "/novel/" + vm.novel_id
        },
        {
            title: "Chapter name",
            href: "/novel/" + vm.novel_id + "/c/" + vm.chapter_id
        }
        
      ],
      right: "Page 1 / 1"
    };
    
    vm.url = $location.path();
    vm.novelUrl = "/novel/" + vm.novel_id;
    
    aaData.chapter(vm.novel_id, vm.chapter_id).then(
      function success(res) {
        vm.chapter = res.data;
        vm.pageHeader.title = vm.chapter.title;
        vm.pageHeader.smallTitle = vm.chapter.novel.author.name + ": <small>" + vm.chapter.novel.title + "</small>";
        vm.pageHeader.date = vm.chapter.date;
        vm.pageFooter.left[1].title = vm.chapter.novel.title;
        vm.pageFooter.left[2].title = vm.chapter.title;
        
        aaData.setTitle("AA | " + vm.chapter.title);
      },
      function error(res) {
        $location.path('/novel/' + vm.novel_id);
      }
    );
    
    vm.deleteEntry = function() {
      aaData.deleteChapter(vm.novel_id, vm.chapter_id).then(
        function success(res) {
          return $location.path('/novel/' + vm.novel_id);
        },
        function error(res) {
          vm.message = "Error. Please try again later! Response status: " + res.status + " - " + res.data.message;
        }
      );
    };
  }
  chapter.$inject = ['$routeParams', 'aaData', 'authentication', '$location'];
  
  angular
    .module('aa-novels')
    .controller('chapter.controller', chapter);
})();