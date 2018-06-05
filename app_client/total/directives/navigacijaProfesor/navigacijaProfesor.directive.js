(function() {
    /* global angular */
    
    var navigacijaProfesor = function(){
        return {
            restrict: 'EA',
            templateUrl: '/total/directives/navigacijaProfesor/navigacijaProfesor.template.html'
        };
    };
    
    angular
        .module('tpo')
        .directive('navigacijaprofesor', navigacijaProfesor);
})();