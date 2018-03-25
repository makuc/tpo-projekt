(function() {
    /* global angular */
    angular.module('tpo', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);
    
    function configuration($routeProvider, $locationProvider) {
        $routeProvider
            /* User management*/
            /*.when('/register', {
                templateUrl: 'views/registration.template.html',
                controller: 'register.controller',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: 'views/login.template.html',
                controller: 'login.controller',
                controllerAs: 'vm'
            })*/
            
            /* Various links (provide names) */
            .when('/', {
                templateUrl: 'views/browse.template.html',
                controller: 'browse.controller',
                controllerAs: 'vm' // vm = view-model
            })
            
            
            /* Various management links (name the management itself) */
            /*.when('/novel', {
                templateUrl: 'views/novel-edit.template.html',
                controller: 'novelEdit.controller',
                controllerAs: 'vm'
            })*/
            
            /* Other pages */
            .when('/about', {
                templateUrl: 'views/about.template.html',
                controller: 'about.controller',
                controllerAs: 'vm'
            })
            .when('/403', {
                templateUrl: 'views/about.template.html',
                controller: '403.controller',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(true);
    }
    
    angular
        .module('aa-novels')
        .config(['$routeProvider', '$locationProvider', configuration])
        
        // Register interceptors
        .factory('httpRequestInterceptor', httpInterceptor)
        .config(httpInterceptorConfig);
    
    function httpInterceptorConfig($httpProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptor');
    }
    httpInterceptorConfig.$inject = ['$httpProvider'];
    function httpInterceptor($window) {
        return {
            request: function (config) {
                config.headers['x-access-token'] = $window.localStorage['aa-novels-token'];
                return config;
            }
        };
    }
    httpInterceptor.$inject = ['$window'];
})();