(function() {
    /* global angular */
    
    var predmetPodatki = function($http){
        var pridobiPredmet = function(predmet_id){
            return $http.get('/api/v1/predmet/' + predmet_id);
        };
        
        var izpisiVsePredmete = function(){
            return $http.get('api/v1/predmet/vse');
        };
        
        var izpisiVseVeljavnePredmete = function(){
            return $http.get('api/v1/predmet');
        };
        
        var izpisiVseIzbrisanePredmete = function(){
            return $http.get('api/v1/predmet/izbrisane');
        };
        
        var dodajPredmet = function(podatki){
            return $http.post('api/v1/predmet', podatki);
        };
        
        var izbrisiPredmet = function(predmet_id){
            return $http.delete('api/v1/predmet/' + predmet_id);
        };
        
        var obnoviPredmet = function(predmet_id){
            return $http.post('api/v1/predmet/' + predmet_id);
        };
        
        var urediPredmet = function(predmet_id, podatki){
            return $http.put('api/v1/predmet/' + predmet_id, podatki);
        };
        
        var dodajIzvajalcaIzvedbePredmeta = function(predmetId, izvedbaId, podatki)
        {
            return $http.post('api/v1/predmet/' + predmetId + '/izvedba/' + izvedbaId + "/izvajalec", podatki);
        };
        
        var odstraniIzvajalcaIzvedbiPredmeta = function(predmetId, izvedbaId, izvajalecId)
        {
            //console.log("address: ", 'api/v1/predmet/' + predmetId + '/izvedba/' + studijskoLetoId + "/izvajalec/" + izvajalecId);
            return $http.delete('api/v1/predmet/' + predmetId + '/izvedba/' + izvedbaId + "/izvajalec/" + izvajalecId);
        };
        
        var dodajIzvedboPredmetu = function(predmetId, data)
        {
            // /api/v1/predmet/:predmet_id/izvedba
            return $http.post('api/v1/predmet/' + predmetId + '/izvedba', data);
        };
        
        var odstraniIzvedboPredmeta = function(predmetId, izvedbaId)
        {
            // /api/v1/predmet/:predmet_id/izvedba/:studijskoLeto_id 
            return $http.delete('api/v1/predmet/' + predmetId + '/izvedba/' + izvedbaId);
        };
        
        return {
            pridobiPredmet: pridobiPredmet,
            izpisiVsePredmete: izpisiVsePredmete,
            izpisiVseVeljavnePredmete: izpisiVseVeljavnePredmete,
            izpisiVseIzbrisanePredmete: izpisiVseIzbrisanePredmete,
            dodajPredmet: dodajPredmet,
            izbrisiPredmet: izbrisiPredmet,
            obnoviPredmet: obnoviPredmet,
            urediPredmet: urediPredmet,
            dodajIzvajalcaIzvedbePredmeta: dodajIzvajalcaIzvedbePredmeta,
            odstraniIzvajalcaIzvedbiPredmeta: odstraniIzvajalcaIzvedbiPredmeta,
            dodajIzvedboPredmetu: dodajIzvedboPredmetu,
            odstraniIzvedboPredmeta: odstraniIzvedboPredmeta
        };
    };
    
    
    
    predmetPodatki.$inject = ['$http'];
    angular
        .module('tpo')
        .service('predmetPodatki', predmetPodatki);
})();