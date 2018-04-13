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
        function uvoziStudente(vsebina) {
            
            return $http.post('/api/v1/student/uvoz-sprejetih', {
                Podatki:vsebina
            });
        }
        
        return {
            pridobiObcine: pridobiObcine,
            pridobiDrzave: pridobiDrzave,
            pridobiPoste: pridobiPoste,
            uvoziStudente: uvoziStudente
        };
    };
    
    
    ostaloPodatki.$inject = ['$http'];
    angular
        .module('tpo')
        .service('ostaloPodatki', ostaloPodatki);
})();