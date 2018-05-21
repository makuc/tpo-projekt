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
        
        var dodajIzvajalcaIzvedbePredmeta = function(predmetId, studijskoLetoId, podatki)
        {
            return $http.post('api/v1/predmet/' + predmetId + '/izvedba/' + studijskoLetoId + "/izvajalec", podatki);
        };
        
        var odstraniIzvajalcaIzvedbiPredmeta = function(predmetId, studijskoLetoId, izvajalecId)
        {
            //console.log("address: ", 'api/v1/predmet/' + predmetId + '/izvedba/' + studijskoLetoId + "/izvajalec/" + izvajalecId);
            return $http.delete('api/v1/predmet/' + predmetId + '/izvedba/' + studijskoLetoId + "/izvajalec/" + izvajalecId);
        };
        
        var dodajIzvedboPredmetu = function(predmetId, data)
        {
            // /api/v1/predmet/:predmet_id/izvedba
            return $http.post('api/v1/predmet/' + predmetId + '/izvedba', data);
        };
        
        var odstraniIzvedboPredmeta = function(predmetId, studijskoLetoId)
        {
            // /api/v1/predmet/:predmet_id/izvedba/:studijskoLeto_id 
            return $http.delete('api/v1/predmet/' + predmetId + '/izvedba/' + studijskoLetoId);
        };
        
        var najdiPredmeteIzvajalca = function()
        {
            // https://tpo-1-robert-barachini.c9users.io/api/v1/predmet/zaposlen
            return $http.get('api/v1/predmet/zaposlen');
        };
        
        var najdiVpisaneVPredmet = function(predmetId, studijskoLetoId)
        {
            // /api/v1/predmet/:predmet_id/:studijskoLeto_id
            //console.log("predmetId: ", predmetId);
            //console.log("studijskoLetoId: ", studijskoLetoId);
            return $http.get('api/v1/predmet/' + predmetId + '/leto/' + studijskoLetoId);
        };
        
        var pridobiPredmeteSStevilomVpisanih = function(programId, studijskoLetoId, letnikId)
        {
            //return $http.get("api/v1/predmet/program/5ac8c4739a223311d219b718/leto/5ac3c4553f0fb21a058ff3d8/letnik/5ac8d21c962f7b1a105fd312");
            return $http.get('api/v1/predmet/program/' + programId + "/leto/" + studijskoLetoId + "/letnik/" + letnikId);
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
            odstraniIzvedboPredmeta: odstraniIzvedboPredmeta,
            najdiPredmeteIzvajalca: najdiPredmeteIzvajalca,
            najdiVpisaneVPredmet: najdiVpisaneVPredmet,
            pridobiPredmeteSStevilomVpisanih: pridobiPredmeteSStevilomVpisanih
        };
    };
    
    
    
    predmetPodatki.$inject = ['$http'];
    angular
        .module('tpo')
        .service('predmetPodatki', predmetPodatki);
})();