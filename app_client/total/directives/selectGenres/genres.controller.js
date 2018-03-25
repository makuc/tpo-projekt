/* global angular */
(function() {
  function ctrlGenres($window, $location) {
    var gvm = this;
    
    gvm.genreStates = {};
    
    if($window.localStorage['genreStates'] != undefined)
      gvm.genreStates = JSON.parse($window.localStorage['genreStates']);
    
    gvm.saveGenreStates = function() {
      $window.localStorage['genreStates'] = JSON.stringify(gvm.genreStates);
    };
    
    gvm.sendData = function() {
      var tags = [];
      for(var tag in gvm.genreStates) {
        if(gvm.genreStates[tag])
          tags.push(tag);
      }
      $location.search('g', tags  );
    };
    
    gvm.clear = function() {
      gvm.genreStates = {};
      gvm.saveGenreStates();
    };
  }
  ctrlGenres.$inject = ['$window', '$location'];
  
  angular
    .module('aa-novels')
    .controller('genres.controller', ctrlGenres);
})();