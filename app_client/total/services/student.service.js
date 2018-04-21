(function() {
    /* global angular */
    
    var studentPodatki = function($http){
        var dodajStudenta = function(podatki){
            return $http.post('/api/v1/student', podatki);
        };
        
        var izpisStudentov = function(){
            return $http.get('/api/v1/student');
        };
        
        var izpisStudenta = function(student_id){
            return $http.get('/api/v1/student/' + student_id);
        };
        
        var urediStudenta = function(student_id, student){
            return $http.put('/api/v1/student/' + student_id, student);
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