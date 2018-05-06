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
            return $http.get('/api/v1/izpit/leto/' + idLeta + idPredmeta);
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
        
        return {
            najdiVseIzpiteZaStudijskoLeto: najdiVseIzpiteZaStudijskoLeto,
            najdiVseIzpiteZaPredmet: najdiVseIzpiteZaPredmet,
            najdiVseIzpitePredmetaZaStudijskoLeto: najdiVseIzpitePredmetaZaStudijskoLeto,
            ustvariIzpitniRok: ustvariIzpitniRok,
            izbrisiIzpitniRok: izbrisiIzpitniRok,
            urediIzpitniRok: urediIzpitniRok
        };
    };
    
    
    
    izpitniRokPodatki.$inject = ['$http'];
    angular
        .module('tpo')
        .service('izpitniRokPodatki', izpitniRokPodatki);
})();