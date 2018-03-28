/* global angular */
(function() {
  var noDefault = function() {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        elem.on('click', function(e){
          e.preventDefault();
        });
      }
    };
  };
  //noDefault.$inject = ['scope', 'elem', 'attrs'];
  
  angular
    .module('aa-novels')
    .directive('noDefault', noDefault);
})();