(function() {
    /* global angular */
    
    var header = function(){
        return {
            restrict: 'EA',
            templateUrl: "/total/directives/header/header.template.html"
        };
    };
    
    angular
        .module('tpo')
        .directive('header', header);
})();