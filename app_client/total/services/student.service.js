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
            return $http.post('api/v1/vpis/' + vpisnica_id);
        };
        
        var dodajSplosnoIzbirniPredmet = function(vpisnica_id, predmet_id){
            return $http.post('/api/v1/vpis/' + vpisnica_id + '/splosni-izbirni', predmet_id);
        };
        
        var odstraniSplosnoIzbirniPredmet = function(vpisnica_id, predmet_id){
            return $http.delete('/api/v1/vpis/' + vpisnica_id + '/splosni-izbirni/' + predmet_id);
        };
        
        var dodajStrokovnoIzbirniPredmet = function(vpisnica_id, predmet_id){
            return $http.post('/api/v1/vpis/' + vpisnica_id + '/strokovni-izbirni', predmet_id);
        };
        
        var odstraniStrokovnoIzbirniPredmet = function(vpisnica_id, predmet_id){
            return $http.delete('/api/v1/vpis/' + vpisnica_id + '/strokovni-izbirni/' + predmet_id);
        };
        
        var dodajModul = function(vpisnica_id, predmet_id){
            return $http.post('/api/v1/vpis/'+ vpisnica_id + '/moduli', predmet_id);
        };
        
        var odstraniModul = function(vpisnica_id, predmet_id){
            return $http.delete('/api/v1/vpis/' + vpisnica_id + '/moduli/' + predmet_id);
        };
        
        var dodajModulniPredmet = function(vpisnica_id, predmet_id){
            return $http.post('/api/v1/vpis/' + vpisnica_id + '/modulni-izbirni', predmet_id);
        };
        
        
        var odstraniModulniPredmet = function(vpisnica_id, predmet_id){
            return $http.delete('/api/v1/vpis/' + vpisnica_id + '/modulni-izbirni/' + predmet_id);
        };
        
        var pridobiPDFVpisnegaLista = function(vpisniListID){
            return $http.get('/api/v1/vpisni-list/' + vpisniListID);
        };
       
        
        return {
            dodajStudenta: dodajStudenta,
            izpisStudentov: izpisStudentov,
            izpisStudenta: izpisStudenta,
            urediStudenta: urediStudenta,
            kreiranjeNovegaVpisa: kreiranjeNovegaVpisa,
            pridobiPodatkeVpisnice: pridobiPodatkeVpisnice,
            oddajaVpisnice: oddajaVpisnice,
            zakljucekVpisa: zakljucekVpisa,
            dodajSplosnoIzbirniPredmet: dodajSplosnoIzbirniPredmet,
            odstraniSplosnoIzbirniPredmet: odstraniSplosnoIzbirniPredmet,
            dodajStrokovnoIzbirniPredmet: dodajStrokovnoIzbirniPredmet,
            odstraniStrokovnoIzbirniPredmet: odstraniStrokovnoIzbirniPredmet,
            dodajModulniPredmet: dodajModulniPredmet,
            odstraniModulniPredmet: odstraniModulniPredmet,
            dodajModul: dodajModul,
            odstraniModul: odstraniModul,
            pridobiPDFVpisnegaLista: pridobiPDFVpisnegaLista
        };
    };
    
    
    studentPodatki.$inject = ['$http'];
    angular
        .module('tpo')
        .service('studentPodatki', studentPodatki);
})();