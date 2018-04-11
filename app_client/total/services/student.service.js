(function() {
    /* global angular */
    
    var studentPodatki = function($http){
        var dodajStudenta = function(podatki){
            return $http.post('/api/shranistudenta', podatki);
        };
        
        var izpisStudentov = function(){
            return $http.get('/api/vsistudenti');
        };
        
        var izpisStudenta = function(idStudenta){
            return $http.get('/api/student' + idStudenta);
        };
        
        var urediStudenta = function(idStudenta){
            return $http.put('/posodobistudenta' + idStudenta);
        };
        
        return {
            dodajStudenta: dodajStudenta,
            izpisStudentov: izpisStudentov,
            izpisStudenta: izpisStudenta,
            urediStudenta: urediStudenta
        };
    };
    
    
    studentPodatki.$inject = ['$http'];
    angular
        .module('tpo')
        .service('studentPodatki', studentPodatki);
})();