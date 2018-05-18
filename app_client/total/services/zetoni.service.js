(function() {
    /* global angular */
    
    var zetoni = function($http){
        
        function generiraj(data)
        {
            // /api/v1/student/5aef49a79958d4255801a971/zeton
            return $http.post('api/v1/zeton', data);
        }

        return {
            generiraj: generiraj
        };
    };
    
    
    zetoni.$inject = ['$http'];
    angular
        .module('tpo')
        .service('zetoni', zetoni);
})();