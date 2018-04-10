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
    
    
    App.factory("LS", function($window, $rootScope) {
        return {
            setData: function (key , val) {
                $window.localStorage && $window.localStorage.setItem(key , val);
                return this;
            },
            getData: function (key) {
                return $window.localStorage && $window.localStorage.getItem(key);
            }
        };
    });
    
    studentPodatki.$inject = ['$http'];
    angular
        .module('tpo')
        .service('studentPodatki', studentPodatki);
})();