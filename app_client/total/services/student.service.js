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
        
        var kreiranjeNovegaVpisa = function(zeton_id){
            return $http.post('/api/v1/vpis/zeton', zeton_id);
        };
        
        var pridobiPodatkeVpisnice = function(vpisnica_id){
            return $http.get('/api/v1/vpis/' + vpisnica_id);
        };
        
        var oddajaVpisnice = function(vpisnica_id, data){
            return $http.put('/api/v1/vpis/' + vpisnica_id, data);
        };
        
        var zakljucekVpisa = function(vpisnica_id){
            return $http.post('/api/v1/vpis' + vpisnica_id);
        };
        
        return {
            dodajStudenta: dodajStudenta,
            izpisStudentov: izpisStudentov,
            izpisStudenta: izpisStudenta,
            urediStudenta: urediStudenta,
            kreiranjeNovegaVpisa: kreiranjeNovegaVpisa,
            pridobiPodatkeVpisnice: pridobiPodatkeVpisnice,
            oddajaVpisnice: oddajaVpisnice,
            zakljucekVpisa: zakljucekVpisa
        };
    };
    
    
    studentPodatki.$inject = ['$http'];
    angular
        .module('tpo')
        .service('studentPodatki', studentPodatki);
})();