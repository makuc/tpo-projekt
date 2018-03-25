/* global angular */
(function() {
  function novelEdit($routeParams, $uibModal, aaData, authentication, $location, $timeout) {
    var vm = this;
    
    vm.editing = true;
    
    vm.isUser = authentication.auth();
    if(!vm.isUser) {
      return $location.path('/login');
    }
    
    vm.user = authentication.currentUser();
    
    vm.novel_id = $routeParams.novel_id;
    vm.pageHeader = {
      title: '',
      smallTitle: vm.user.name
    };
    vm.pageFooter = {
       left: [
        {
          title: "Browse",
          href: "/browse"
        },
        {
          title: "Create new novel",
          href: "/novel"
        }
      ],
      right: ""
    };
    
    vm.novelUrl = "/novel/" + vm.novel_id;
    vm.url = $location.path();
    
    if(vm.novel_id != undefined) {
      aaData.novelDetails(vm.novel_id).then(
        function success(res) {
          vm.novel = res.data;
          vm.pageHeader.title = vm.novel.title;
          vm.pageHeader.smallTitle = vm.novel.author.name;
          vm.pageFooter.left[1].title = vm.novel.title;
          vm.pageFooter.left[1].href = "/novel/" + vm.novel._id;
          vm.library = vm.novel.library;
          
          aaData.setTitle("AA | " + vm.novel.title);
          
          vm.novel.stringTags = "";
          for(var i = 0; i < vm.novel.tags.length; i++) {
            vm.novel.stringTags += vm.novel.tags[i] + ", ";
          }
        },
        function error(res) {
          return $location.path('/novel/' + res.data._id);
        }
      );
    } else {
      aaData.setTitle("AA | Create new novel");
      vm.novel = {
        title: "",
        description: "<br>",
        stringTags: ""
      };
    }
    
    vm.sendData = function() {
      if(!vm.novel) return vm.message = "<p>You must enter required data</p>";
      
      if(validateNovelDetails()) {
        parseNovelDescription();
        
        if(!vm.novel_id) {
          addNovel();
        } else {
          updateNovel();
        }
      }
    };
    function validateNovelDetails() {
      vm.error = "";
      if(!vm.novel.title)
        vm.error += "<li>Title is required</li>";
      if(!vm.novel.description || vm.novel.description == "<br>")
        vm.error += "<li>Short description is required</li>";
      if(!vm.novel.stringTags)
        vm.error += "<li>Write at least one tag down below</li>";
      
      vm.novel.tags = parseTags(vm.novel.stringTags);
      tagsToString();
      
      if(vm.error == "") {
        vm.error = undefined;
        return true;
      } else {
        vm.error = "<ul>" + vm.error + "</ul>";
        return false;
      }
    }
    function parseNovelDescription() {
      if(vm.novel.description != "<br>" && vm.novel.description.indexOf("<p>") != 0) {
        vm.novel.description = "<p>" + vm.novel.description + "</p>";
        vm.novel.description = vm.novel.description.replace(/(<br><br>|<br \/><br \/>|<br\/><br\/>)/igm, "</p><p>&nbsp;</p><p>");
        vm.novel.description = vm.novel.description.replace(/(<br>|<br \/>|<br\/>)/igm, "</p><p>");
        vm.novel.description = vm.novel.description.replace(/<p><\/p>/igm, "");
      }
    }
    function addNovel() {
      aaData.addNovel(vm.novel).then(
        function success(res) {
          return $location.path('/novel/' + res.data._id);
        },
        function error(res) {
          vm.error = "Error while adding this novel. Please try again!";
        }
      );
    }
    function updateNovel() {
      aaData.updateNovel(vm.novel_id, vm.novel).then(
        function success(res) {
          vm.message = "<p>Successfully saved.</p>";
          $timeout(function() {
            vm.message = "";
          }, 1500);
        },
        function error(res) {
          vm.error = "<p>Error while saving this novel. Please try again later!</p>";
        }
      );
    }
    
    function tagsToString() {
      vm.novel.stringTags = "";
      for(var i = 0; i < vm.novel.tags.length; i++) {
        vm.novel.stringTags += vm.novel.tags[i] + ", ";
      }
    }
    function parseTags(tagsObject) {
        var tag, tags = [], i, j;
        
        if(Array.isArray(tagsObject)) {
            for(i = 0; i < tagsObject.length && Array.isArray(tagsObject); i++) {
                tagsObject[i] = module.exports.parseTags(tagsObject[i]);
                for(j = 0; j < tagsObject[i].length; j++)
                    tags.push(tagsObject[i][j]);
            }
        } else if(typeof tagsObject == "string") {
            tag = tagsObject;
            tag = tag.split(/[,;]+/);
            
            for(i = 0; i < tag.length; i++) {
                tag[i] = tag[i].trim();
                tag[i] = tag[i].replace(/\s/g, '-');
                tag[i] = tag[i].replace(/[\[\]\{\}\(\)\*\+\?\.\\\^\$\|\#\]\<\>]/g, '');
                if(tag[i] !== "") {
                    tag[i] = tag[i].trim();
                    if(tags.indexOf(tag[i]) == -1)
                        tags.push(tag[i]);
                }
            }
        }
        return tags;
    };
  }
  novelEdit.$inject = ['$routeParams', '$uibModal', 'aaData', 'authentication', '$location', '$timeout'];
  
  angular
    .module('aa-novels')
    .controller('novelEdit.controller', novelEdit);
})();