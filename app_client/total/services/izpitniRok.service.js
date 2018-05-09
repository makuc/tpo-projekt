(function() {
    /* global angular */
    
    var izpitniRokPodatki = function($http){
        function najdiVseIzpiteZaStudijskoLeto(idLeta){
            return $http.get('/api/v1/izpit/leto/' + idLeta);
        }
        
        function najdiVseIzpiteZaPredmet(idPredmeta){
            return $http.get('/api/v1/predmet/' + idPredmeta);
        }
        
        function najdiVseIzpitePredmetaZaStudijskoLeto(idLeta, idPredmeta){
            return $http.get('/api/v1/izpit/leto/' + idLeta + '/predmet/' + idPredmeta);
        }
        
        function ustvariIzpitniRok(data){
            return $http.post('/api/v1/izpit', data);
        }
        
        function izbrisiIzpitniRok(id){
            return $http.delete('/api/v1/izpit/' + id);
        }
        
        function urediIzpitniRok(id, data){
            return $http.put('/api/v1/izpit/' + id, data);
        }
        
        function dodajIzvajalca(izpitId, izvajalecId){
            return $http.post('/api/v1/izpit/' + izpitId + '/izvajalec', izvajalecId);
        }
        
        function odstraniIzvajalca(izpitId, izvajalecId){
            return $http.delete('/api/v1/izpit/' + izpitId + '/izvajalec/' + izvajalecId);
        }
        
        function pridobiIzpitniRok(izpitId){
            return $http.get('/api/v1/izpit/' + izpitId);
        }
        
        function najdiPredmeteZaposlenega(){
            return $http.get('/api/v1/predmet/zaposlen');
        }
        
        return {
            najdiVseIzpiteZaStudijskoLeto: najdiVseIzpiteZaStudijskoLeto,
            najdiVseIzpiteZaPredmet: najdiVseIzpiteZaPredmet,
            najdiVseIzpitePredmetaZaStudijskoLeto: najdiVseIzpitePredmetaZaStudijskoLeto,
            ustvariIzpitniRok: ustvariIzpitniRok,
            izbrisiIzpitniRok: izbrisiIzpitniRok,
            urediIzpitniRok: urediIzpitniRok,
            dodajIzvajalca: dodajIzvajalca,
            odstraniIzvajalca: odstraniIzvajalca,
            pridobiIzpitniRok: pridobiIzpitniRok,
            najdiPredmeteZaposlenega: najdiPredmeteZaposlenega
        };
    };
    
    
    
    izpitniRokPodatki.$inject = ['$http'];
    angular
        .module('tpo')
        .service('izpitniRokPodatki', izpitniRokPodatki);
})();