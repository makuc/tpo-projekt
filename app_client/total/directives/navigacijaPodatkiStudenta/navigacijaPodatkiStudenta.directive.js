(function() {
    /* global angular */
    
    var navigacijaPodatkiStudenta = function(){
        return {
            restrict: 'EA',
            templateUrl: '/total/directives/navigacijaPodatkiStudenta/navigacijaPodatkiStudenta.template.html'
        };
    };
    
    angular
        .module('tpo')
        .directive('navigacijapodatkistudenta', navigacijaPodatkiStudenta);
})();