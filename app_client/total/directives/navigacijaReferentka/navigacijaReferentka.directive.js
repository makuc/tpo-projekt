(function() {
    /* global angular */
    
    var navigacijaReferentka = function(){
        return {
            restrict: 'EA',
            templateUrl: '/total/directives/navigacijaReferentka/navigacijaReferentka.template.html'
        };
    };
    
    angular
        .module('tpo')
        .directive('navigacijareferentka', navigacijaReferentka);
})();