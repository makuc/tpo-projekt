(function() {
    /* global angular */
    
    var ostaloPodatki = function($http){
        function pridobiObcine() {
            return $http.get('/api/v1/obcina');
        }
        function pridobiDrzave() {
            return $http.get('/api/v1/drzava');
        }
        function pridobiPoste() {
            return $http.get('/api/v1/posta');
        }
        
        return {
            pridobiObcine: pridobiObcine,
            pridobiDrzave: pridobiDrzave,
            pridobiPoste: pridobiPoste
        };
    };
    
    
    ostaloPodatki.$inject = ['$http'];
    angular
        .module('tpo')
        .service('ostaloPodatki', ostaloPodatki);
})();