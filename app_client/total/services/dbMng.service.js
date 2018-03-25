(function() {
    /* global angular */
    var dbMng = function($http) {
        function dropdb() {
            return $http.delete('/api/v1/db');
        }
        function populatedb() {
            return $http.post('/api/v1/db');
        }
        
        // Make functions PUBLIC
        return {
            dropdb: dropdb,
            populatedb: populatedb
        };
    };
    dbMng.$inject = ['$http'];
    
    angular
        .module('aa-novels')
        .service('dbMng', dbMng);
})();