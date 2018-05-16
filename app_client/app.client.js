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
            
            .when('/main', {
                templateUrl: 'views/main.template.html',
                controller: 'mainCtrl',
                controllerAs: 'vm'
            })
            .when('/import', {
                templateUrl: 'views/uvozStudentov.template.html',
                controller: 'importCtrl',
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
            
            
            //vdrzevanje sifrantov
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
            .when('/urediIzvedbePredmeta/:predmetId',{
                templateUrl: 'views/urediIzvedbePredmeta.template.html',
                controller: 'urediIzvedbePredmetaCtrl',
                controllerAs: 'vm'   
            })
            .when('/urediIzvedbePredmeta/:predmetId/izvedba/:izvedbaId',{
                templateUrl: 'views/urediIzvedboPredmeta.template.html',
                controller: 'urediIzvedboPredmetaCtrl',
                controllerAs: 'vm'   
            })
            .when('/dodajIzvedboPredmeta/:predmetId/izvedba',{
                templateUrl: 'views/dodajIzvedboPredmeta.template.html',
                controller: 'dodajIzvedboPredmetaCtrl',
                controllerAs: 'vm'   
            })
            .when('/urediIzvedbePredmeta/:predmetId/studijsko_leto/:studijskoLetoId',{
                templateUrl: 'views/seznamVpisanih.template.html',
                controller: 'seznamVpisanihCtrl',
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
            }).when('/dodajLetnik', {
                templateUrl: 'views/urediLetnik.template.html',
                controller: 'dodajLetnikCtrl',
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
            .when('/dodajNacinStudija', {
                templateUrl: 'views/urediNacinStudija.template.html', 
                controller: 'dodajNacinStudijaCtrl',
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
            .when('/dodajOblikoStudija', {
                templateUrl: 'views/urediOblikoStudija.template.html',
                controller: 'dodajOblikoStudijaCtrl',
                controllerAs: 'vm'
            })
            .when('/urediPredmetnike', {
                templateUrl: 'views/urediPredmetnike.template.html',
                controller: 'urediPredmetnikeCtrl',
                controllerAs: 'vm'
            })
            .when('/urediPredmetnik/:idPredmetnika', {
                templateUrl: 'views/urediPredmetnik.template.html',
                controller: 'urediPredmetnikCtrl',
                controllerAs: 'vm'
            })
            .when('/dodajPredmetnik', {
                templateUrl: 'views/urediPredmetnik.template.html',
                cotroller: 'dodajPredmetnikCtrl',
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
            .when('/dodajStudijskiProgram', {
                templateUrl: 'views/urediStudijskiProgram.template.html',
                controller: 'dodajStudijskiProgramCtrl',
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
            .when('/dodajStudijskoLeto', {
                templateUrl: 'views/urediStudijskoLeto.template.html',
                controller: 'dodajStudijskoLetoCtrl',
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
            .when('/dodajVrstoStudija', {
                templateUrl: 'views/urediVrstoStudija.template.html',
                controller: 'dodajVrstoStudijaCtrl',
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
            .when('/dodajVrstoVpisa', {
                templateUrl: 'views/urediVrstoVpisa.template.html',
                controller: 'dodajVrstoVpisaCtrl',
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
            .when('/dodajZaposlenega', {
                templateUrl: 'views/urediZaposlenega.template.html',
                controller: 'dodajZaposlenegaCtrl',
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
            .when('/dodajDelePredmeta', {
                templateUrl: 'views/urediDelePredmeta.template.html',
                controller: 'dodajDelePredmetaCtrl',
                controllerAs: 'vm'
            })
            .when('/urediPredmetnike', {
                templateUrl: 'views/urediPredmetnike.template.html',
                controller: 'urediPredmetnikeCtrl',
                controllerAs: 'vm'
            })
            .when('/urediPredmetnik/:idPredmetnika', {
                templateUrl: 'views/urediPredmetnik.template.html',
                controller: 'urediPredmetnikCtrl',
                controllerAs: 'vm'
            })
            .when('/dodajPredmetnik', {
                templateUrl: 'views/urediPredmetnik.template.html',
                controller: 'dodajPredmetnikCtrl',
                controllerAs: 'vm'
            })
            .when('/urediPredmetePredmetnika/:idPredmetnika', {
                templateUrl: 'views/urediPredmetePredmetnika.template.html',
                controller: 'urediPredmetePredmetnikaCtrl',
                controllerAs: 'vm'
            })
             .when('/urediObcine', {
                templateUrl: 'views/urediObcine.template.html',
                controller: 'urediObcineCtrl',
                controllerAs: 'vm'
            })
            .when('/urediPoste', {
                templateUrl: 'views/urediPoste.template.html',
                controller: 'urediPosteCtrl',
                controllerAs: 'vm'
            })
            .when('/urediDrzave', {
                templateUrl: 'views/urediDrzave.template.html',
                controller: 'urediDrzaveCtrl',
                controllerAs: 'vm'
            })
            .when('/dodajPosto', {
                templateUrl: 'views/dodajPosto.template.html',
                controller: 'dodajPostoCtrl',
                controllerAs: 'vm'
            })
            .when('/dodajObcino', {
                templateUrl: 'views/dodajObcino.template.html',
                controller: 'dodajObcinoCtrl',
                controllerAs: 'vm'
            })
            .when('/dodajDrzavo', {
                templateUrl: 'views/dodajDrzavo.template.html',
                controller: 'dodajDrzavoCtrl',
                controllerAs: 'vm'
            })
            
            
            //izpitni roki
            .when('/dodajIzpitniRok', {
                templateUrl: 'views/dodajIzpitniRok.template.html',
                controller: 'dodajIzpitniRokCtrl',
                controllerAs: 'vm'
            })
            .when('/dodajIzpitniRok/profesor', {
                templateUrl: 'views/dodajIzpitniRok.template.html',
                controller: 'dodajIzpitniRokProfesorCtrl',
                controllerAs: 'vm'
            })
           .when('/vsiIzpitniRoki', {
               templateUrl: 'views/prikaziIzpitneRoke.template.html',
               controller: 'prikaziVseIzpitneRokeCtrl',
               controllerAs: 'vm'
           })
           .when('/vsiIzpitniRoki/:rokId/kandidati', {
               templateUrl: 'views/prijavljeniKandidati.template.html',
               controller: 'prijavljeniKandidatiCtrl',
               controllerAs: 'vm'
           })
           .when('/vsiIzpitniRoki/:rokId/kandidati/:studentId', {
               templateUrl: 'views/urediOcenoIzpita.template.html',
               controller: 'urediOcenoIzpitaCtrl',
               controllerAs: 'vm'
           })
           .when('/dodajIzvajalceIzpitniRok/:idIzpitnegaRoka', {
               templateUrl: 'views/dodajIzvajalceIzpitnegaRoka.template.html',
               controller: 'dodajIzvajalcaIzpitCtrl',
               controllerAs: 'vm'
           })
           .when('/dodajIzvajalceIzpitniRok/profesor/:idIzpitnegaRoka', {
               templateUrl: 'views/dodajIzvajalceIzpitnegaRoka.template.html',
               controller: 'dodajIzvajalcaIzpitProfesorCtrl',
               controllerAs: 'vm'
           })
           .when('/izpitniRok/profesor', {
               templateUrl: 'views/izpitniRokiProfesor.template.html',
               controller: 'izpitniRokiProfesorCtrl',
               controllerAs: 'vm'
           })

            .when('/urediDrzavo/:idDrzave', {
                templateUrl: 'views/urediDrzavo.template.html',
                controller: 'urediDrzavoCtrl',
                controllerAs: 'vm'
            })
            .when('/urediObcino/:idObcine', {
                templateUrl: 'views/urediObcino.template.html',
                controller: 'urediObcinoCtrl',
                controllerAs: 'vm'
            })
            .when('/urediPosto/:idPoste', {
                templateUrl: 'views/urediPosto.template.html',
                controller: 'urediPostoCtrl',
                controllerAs: 'vm'
            })
            .when('/prikaziStudente', {
                templateUrl: 'views/prikaziStudente.template.html',
                controller: 'prikaziStudenteCtrl',
                controllerAs: 'vm'
            })
            .when('/podrobnostiStudenta/:idStudenta', {
                templateUrl: 'views/podrobnostiStudenta.template.html',
                controller: 'podrobnostiStudentaCtrl',
                controllerAs: 'vm'
            })
            .when('/myData', {
                templateUrl: 'views/myData.template.html',
                controller: 'myDataCtrl',
                controllerAs: 'vm'
            })
            .when('/potrdiVpise', {
                templateUrl: 'views/potrdiVpise.template.html',
                controller: 'potrdiVpiseCtrl',
                controllerAs: 'vm'
            })
            
            // izpiti student - prijava / odjava
            .when('/izpiti', {
                templateUrl: 'views/izpiti.template.html',
                controller: 'izpitiCtrl',
                controllerAs: 'vm'
            })
            // izpiti referentka - prijava / odjava
            .when('/izpitiForce/:studentId', {
                templateUrl: 'views/izpitiForce.template.html',
                controller: 'izpitiForceCtrl',
                controllerAs: 'vm'
            })
            .when('/zetonZaVpis', {
                templateUrl: 'views/zetonZaVpis.template.html',
                controller: 'zetonZaVpisCtrl',
                controllerAs: 'vm'
            })
            // zetoni za vpis
            .when('/prikaziStudente/:studentId/zetoni', {
                templateUrl: 'views/urediZetone.template.html',
                controller: 'urediZetoneCtrl',
                controllerAs: 'vm'
            })
            .when('/prikaziStudente/:studentId/zetoni/ustvariZeton', {
                templateUrl: 'views/urediZeton.template.html',
                controller: 'ustvariZetonCtrl',
                controllerAs: 'vm'
            })
            .when('/prikaziStudente/:studentId/zetoni/:zetonId', {
                templateUrl: 'views/urediZeton.template.html',
                controller: 'urediZetonCtrl',
                controllerAs: 'vm'
            })
            
            
            // vpis studenta v letnik         
            .when('/vpis/:idStudenta/podatkiStudenta', {
                templateUrl: 'views/vpisniList.template.html',
                controller: 'vpisniListCtrl',
                controllerAs: 'vm'
            })
            .when('/vpis/:idVpisnice/izbiraPredmeta', {
                templateUrl: 'views/vpisniListPredmeti.template.html',
                controller: 'vpisniListPredmetiCtrl',
                controllerAs: 'vm'
            })
            .when('/vpis/:idVpisnice/pregled', {
                templateUrl: 'views/vpisniListPregled.template.html',
                controller: 'vpisniListPregledCtrl',
                controllerAs: 'vm'
            })
            
            .otherwise({redirectTo: '/main'});
            
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