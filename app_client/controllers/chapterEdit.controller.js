/* global angular */
(function() {
  function chapterEdit($routeParams, aaData, authentication, $location, $timeout) {
    var vm = this;
    
    vm.editing = true;
    
    vm.isUser = authentication.auth();
    if(!vm.isUser) {
      return $location.path('/login');
    }
    
    vm.user = authentication.currentUser();
    
    vm.chapter_id = $routeParams.chapter_id;
    vm.novel_id = $routeParams.novel_id;
    
    vm.pageHeader = {
      title: 'Replace with chapter title...'
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
            title: "Add new chapter",
            href: "/novel/" + vm.novel_id + "/c/" + vm.chapter_id
        }
        
      ],
      right: "Page 1 / 1"
    };
    
    vm.url = $location.path();
    vm.novelUrl = "/novel/" + vm.novel_id;
    
    if(vm.chapter_id != undefined) {
      aaData.chapter(vm.novel_id, vm.chapter_id).then(
        function success(res) {
          if(vm.user._id != res.data.novel.author._id) {
            return $location.path('/403');
          }
          vm.chapter = res.data;
          vm.pageHeader.title = vm.chapter.title;
          vm.pageHeader.smallTitle = vm.chapter.novel.author.name + ": <small>" + vm.chapter.novel.title + "</small>";
          vm.pageHeader.date = vm.chapter.date;
          vm.pageFooter.left[1].title = vm.chapter.novel.title;
          vm.pageFooter.left[2].title = vm.chapter.title;
          
          aaData.setTitle("AA - " + vm.chapter.title);
        },
        function error(res) {
          $location.path("/novel/" + vm.novel_id);
        }
      );
    } else {
      // At least get details of the novel, to display chapters list!
      aaData.novelDetails(vm.novel_id).then(
        function success(res) {
          vm.chapter = {};
          vm.chapter.title = "";
          vm.chapter.novel = res.data;
          vm.pageHeader.title = vm.chapter.novel.title;
          vm.pageHeader.smallTitle = vm.chapter.novel.author.name + ": <small>" + vm.chapter.novel.title + "</small>";
          vm.pageHeader.date = Date.now();
          vm.pageFooter.left[1].title = vm.chapter.novel.title;
          
          vm.chapter.chapter = "<br>";
          
          aaData.setTitle("AA - New chapter");
        },
        function error(res) {
          $location.path("/mynovels");
        }
      );
    }
    
    // Function for saving data !!!
    vm.sendData = function() {
      parseChapterContent();
      if(validateChapterData()) {
        if(vm.chapter_id == undefined) {
          addChapter();
        } else {
          updateChapter();
        }
      }
    };
    function validateChapterData() {
      vm.error = "";
      if(!vm.chapter.title)
        vm.error += "<li>Title is required</li>";
      if(!vm.chapter.chapter || vm.chapter.chapter == "<br>")
        vm.error += "<li>The actual content of the chapter is required</li>";
      
      if(vm.error == "") {
        vm.error = undefined;
        return true;
      } else {
        vm.error = "<ul>" + vm.error + "</ul>";
        return false;
      }
    }
    function parseChapterContent() {
      if(vm.chapter.chapter != "<br>" && vm.chapter.chapter.indexOf("<p>") != 0) {
        vm.chapter.chapter = "<p>" + vm.chapter.chapter + "</p>";
        vm.chapter.chapter = vm.chapter.chapter.replace(/(<br><br>|<br \/><br \/>|<br\/><br\/>)/igm, "</p><p>&nbsp;</p><p>");
        vm.chapter.chapter = vm.chapter.chapter.replace(/(<br>|<br \/>|<br\/>)/igm, "</p><p>");
        vm.chapter.chapter = vm.chapter.chapter.replace(/<p><\/p>/igm, "");
      }
    }
    function addChapter() {
      aaData.addChapter(vm.novel_id, vm.chapter).then(
        function success(res) {
          $location.path('/novel/' + vm.novel_id + "/c/" + res.data._id);
        },
        function error(res) {
          vm.error = res.status + " - " + res.data.message;
        }
      );
    }
    function updateChapter() {
      aaData.updateChapter(vm.novel_id, vm.chapter_id, vm.chapter).then(
        function success(res) {
          vm.message = "Successfully saved!";
          $timeout(function() {
            vm.message = "";
          }, 1500);
        },
        function error(res) {
          vm.error = res.status + " - " + res.data.message;
        }
      );
    }
  }
  chapterEdit.$inject = ['$routeParams', 'aaData', 'authentication', '$location', '$timeout'];
  
  angular
    .module('aa-novels')
    .controller('chapterEdit.controller', chapterEdit);
})();