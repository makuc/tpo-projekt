(function() {
    /* global angular */
    
    var predmetPodatki = function($http){
        var pridobiPredmet = function(predmet_id){
            return $http.get('/api/v1/predmet/' + predmet_id);
        };
        
        return {
            pridobiPredmet: pridobiPredmet,
        };
    };
    
    
    predmetPodatki.$inject = ['$http'];
    angular
        .module('tpo')
        .service('predmetPodatki', predmetPodatki);
})();