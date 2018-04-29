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
            .when('/dodajPredmet', {
                templateUrl: 'views/urediPredmet.template.html',
                controller: 'dodajPredmetCtrl',
                controllerAs: 'vm'
            })
            .when('/urediLetnike', {
                templateUrl: 'views/urediLetnike.template.html',
                controller: 'urediLetnikeCtrl',
                controllerAs: 'vm'
            })
           .when('/urediLetnike/:idLetnika', {
                templateUrl: 'views/urediLetnik.template.html',
                controller: 'urediLetnikCtrl',
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
            .when('/urediOblikeStudija', {
                templateUrl: 'views/urediOblikeStudija.template.html',
                controller: 'urediOblikeStudijaCtrl',
                controllerAs: 'vm'
            })
            .when('/urediOblikoStudija/:idOblikaStudija', {
                templateUrl: 'views/urediOblikoStudija.template.html',
                controller: 'urediOblikoStudijaCtrl',
                controllerAs: 'vm'
            })
            .when('/urediPredmetnike', {
                templateUrl: 'views/urediPredmetnike.template.html',
                controller: 'urediPredmetnikeCtrl',
                controllerAs: 'vm'
            })
            .when('/urediPredmetnik/:idPredmetnika', {
                templateUrl: 'views/urediPredmetnike.template.html',
                controller: 'urediPredmetnikCtrl',
                controllerAs: 'vm'
            })
            .when('/urediStudijskePrograme', {
                templateUrl: 'views/urediStudijskePrograme.template.html',
                controller: 'urediStudijskeProgrameCtrl',
                controllerAs: 'vm'
            })
            .when('/urediStudijskiProgram/:idStudijskegaPrograma', {
                templateUrl: 'views/urediStudijskiProgram.template.html',
                controller: 'urediStudijskiProgramCtrl',
                controllerAs: 'vm'
            })
            .when('/urediStudijskaLeta', {
                templateUrl: 'views/urediStudijskaLeta.template.html',
                controller: 'urediStudijskaLetaCtrl',
                controllerAs: 'vm'
            })
            .when('/urediStudijskoLeto/:idStudijskegaLeta', {
                templateUrl: 'views/urediStudijskoLeto.template.html',
                controller: 'urediStudijskoLetoCtrl',
                controllerAs: 'vm'
            })
            .when('/urediVrsteStudija', {
                templateUrl: 'views/urediVrsteStudija.template.html',
                controller: 'urediVrsteStudijaCtrl',
                controllerAs: 'vm'
            })
            .when('/urediVrstoStudija/:idVrsteStudija', {
                templateUrl: 'views/urediVrstoStudija.template.html',
                controller: 'urediVrstoStudijaCtrl',
                controllerAs: 'vm'
            })
            .when('/urediVrsteVpisa', {
                templateUrl: 'views/urediVrsteVpisa.template.html',
                controller: 'urediVrsteVpisaCtrl',
                controllerAs: 'vm'
            })
            .when('/urediVrstoVpisa/:idVrsteVpisa', {
                templateUrl: 'views/urediVrstoVpisa.template.html',
                controller: 'urediVrstoVpisaCtrl',
                controllerAs: 'vm'
            })
            .when('/urediZaposlene', {
                templateUrl: 'views/urediZaposlene.template.html',
                controller: 'urediZaposleneCtrl',
                controllerAs: 'vm'
            })
            .when('/urediZaposlenega/:idZaposlenega', {
                templateUrl: 'views/urediZaposlenega.template.html',
                controller: 'urediZaposlenegaCtrl',
                controllerAs: 'vm'
            })
            .when('/urediDelePredmetov', {
                templateUrl: 'views/urediDelePredmetov.template.html',
                controller: 'urediDelePredmetovCtrl',
                controllerAs: 'vm'
            })
            .when('/urediDelePredmeta/:idDelaPredmeta', {
                templateUrl: 'views/urediDelePredmeta.template.html',
                controller: 'urediDelePredmetaCtrl',
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