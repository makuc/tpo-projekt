(function() {
    /* global angular */
    
    var studentPodatki = function($http){
        var dodajStudenta = function(podatki){
            return $http.post('/api/v1/student', podatki);
        };
        
        var izpisStudentov = function(){
            return $http.get('/api/v1/student');
        };
        
        var izpisStudenta = function(idStudenta){
            return $http.get('/api/v1/student/' + idStudenta);
        };
        
        var urediStudenta = function(idStudenta){
            return $http.put('/api/v1/student/' + idStudenta);
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