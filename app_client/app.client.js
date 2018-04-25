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
            .when('/import', {
                templateUrl: 'views/text.template.html',
                controller: 'textCtrl',
                controllerAs: 'vm'
            })
            .when('/pozabljeno-geslo', {
                templateUrl: 'views/pozabljeno.template.html',
                controller: 'pozabljenoCtrl',
                controllerAs: 'vm'
            })
            .when('/pozabljeno-geslo/:ponastavi_id', {
                templateUrl: 'views/ponastavi.template.html',
                controller: 'ponastaviCtrl',
                controllerAs: 'vm'
            })
            .when('/db', {
                templateUrl: 'views/db.template.html',
                controller: 'dbCtrl',
                controllerAs: 'vm'
            })
            .when('/urediPredmete', {
                templateUrl: 'views/urediPredmete.template.html',
                controller: 'urediPredmeteCtrl',
                controllerAs: 'vm'
            })
            .when('/urediPredmet/:idPredmeta', {
                templateUrl: 'views/urediPredmet.template.html',
                controller: 'urediPredmetCtrl',
                controllerAs: 'vm'
            })
            .when('/urediLetnike', {
                templateUrl: 'views/urediLetnike.template.html',
                controller: 'urediLetnikeCtrl',
                controllerAs: 'vm'
            })
           .when('/urediLetnike/:idLetnika', {
                templateUrl: 'views/urediLetnike.template.html',
                controller: 'urediLetnikeCtrl',
                controllerAs: 'vm'
            })
            .when('/urediNacineStudija', {
                templateUrl: 'views/urediNacineStudija.template.html',
                controller: 'urediNacineStudijaCtrl',
                controllerAs: 'vm'
            })
            .when('/urediNacinStudija/:idNacinStudija', {
                templateUrl: 'views/urediNacinStudija.template.html',
                controller: 'urediNacinStudijaCtrl',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/student/main'});
            
            $locationProvider.html5Mode(true);
    }
    
    angular
        .module('tpo')
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
                config.headers['x-access-token'] = $window.localStorage['tpo-token'];
                return config;
            }
        };
    }
    httpInterceptor.$inject = ['$window'];
})();