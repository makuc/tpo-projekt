(function() {
    /* global angular */
    angular.module('tpo', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);
    
    function configuration($routeProvider, $locationProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login.template.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
            .when('/vpisniList', {
                templateUrl: 'views/vpisniList.template.html',
                controller: 'vpisniListCtrl',
                controllerAs: 'vm'
            })
               .when('/student/main', {
                templateUrl: 'views/main.template.html',
                controller: 'mainCtrl',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});
            
            $locationProvider.html5Mode(true);
    }
    
    angular
        .module('tpo')
        .config(['$routeProvider', '$locationProvider', configuration]);
        
})();