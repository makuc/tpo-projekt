(function() {
    /* global angular */
    
    urediObcinoCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication'];
    
    
    function urediObcinoCtrl($location, ostaloPodatki, $routeParams, authentication){
        var vm = this;
        
        vm.PUrediObcine = true;
        
         vm.vpisan=authentication.currentUser();
        
        if(authentication.currentUser().zaposlen){
            ostaloPodatki.najdiZaposlenega(authentication.currentUser().zaposlen).then(
                function success(odgovor){
                    vm.ime = odgovor.data.zaposlen.ime;
                    vm.priimek = odgovor.data.zaposlen.priimek;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        }
        
        vm.logoutFunc = function() {
            delTok();
            return $location.path('/login');
        };
        
        function delTok(){
            return authentication.logout();
        }
        
        vm.idObcine = $routeParams.idObcine;
       
        vm.najdiObcino = function(){
            ostaloPodatki.najdiObcino(vm.idObcine).then(
                function success(odgovor){
                     console.log(odgovor.data);
                    vm.obcina = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.shrani = function(){
            var obcina = {
                sifra: vm.obcina.sifra,
                ime: vm.obcina.ime
            };
            ostaloPodatki.urediObcino(vm.idObcine, obcina).then(
                function success(odgovor){
                    $location.path("/urediObcine");
                },
                function error(odgovor){
                    vm.obvestilo = "Že obstaja zapis s to šifro";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediObcine");
        };
    }
    
    angular
        .module('tpo')
        .controller('urediObcinoCtrl', urediObcinoCtrl);
})();