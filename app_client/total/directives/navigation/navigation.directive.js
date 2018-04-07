(function() {
    /* global angular */
    
    var navigation = function(){
        return {
            restrict: 'EA',
            templateUrl: "/total/directives/navigation/navigation.template.html"
        };
    };
    
    angular
        .module('tpo')
        .directive('navigation', navigation);
})();