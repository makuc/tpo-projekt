(function() {
    /* global angular */
    
    var footer = function() {
        return {
            restrict: 'EA',
            templateUrl: "/total/directives/footer/footer.template.html"
        };
    };
    
    angular
        .module('tpo')
        .directive('footer', footer);
})();