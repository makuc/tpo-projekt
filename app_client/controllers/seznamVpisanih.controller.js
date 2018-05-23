(function() {
    /* global angular, html2canvas, pdfMake, Blob, saveAs */
    
    seznamVpisanihCtrl.$inject = ['studentPodatki', '$scope', '$location', 'authentication', 'ostaloPodatki', 'predmetPodatki', '$routeParams'];
    
    
    function seznamVpisanihCtrl(studentPodatki, $scope, $location, authentication, ostaloPodatki, predmetPodatki, $routeParams){
        var vm = this;
        
         vm.vpisan=authentication.currentUser();
         
         vm.predmetId = $routeParams.predmetId;
         vm.studijskoLetoId = $routeParams.studijskoLetoId;
        
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
        
        vm.naStran = 10.0;
        vm.stran = 0;
        vm.strani = [1];
        vm.nextPage = function(){
            if(vm.stran < vm.strani.length -1){
                vm.stran++;
            }
        };
        vm.prevPage = function(){
            if(vm.stran > 0){
                vm.stran--;
            }
        };
        vm.setPage = function(x){
            vm.stran = x - 1;
            
            if(vm.stran < 0)
                vm.stran = 0;
            else if(vm.stran > vm.strani.length)
                vm.stran = vm.strani.length;
        };
        function pripraviStrani() {
            setTimeout(function() {
                vm.strani = [1];
                if($scope.query)
                {
                    var max = Math.ceil($scope.query.length / vm.naStran);
                    console.log($scope.query.length + " - " + max);
                    for(var i = 1; i < max; i++) {
                        vm.strani.push(i + 1);
                    }
                    
                    vm.setPage(0);
                }
                
                vm.n = vm.strani.length-1;
                $scope.$apply();
            }, 500);
        }
        $scope.$watch('iskanje', function() {
            pripraviStrani();
        });
        
        vm.prikaziStudente = function(){
            predmetPodatki.najdiVpisaneVPredmet(vm.predmetId, vm.studijskoLetoId).then(
                function success(odgovor){
                    //console.log("Odgovor: ", odgovor.data.vpisani.studenti);
                    vm.predmet = odgovor.data;
                    console.log("predmet:", vm.predmet);
                    for (var i = 0; i < vm.predmet.izvedbe_predmeta.length; i++) {
                        //console.log(vm.predmet.izvedbe_predmeta[i].studijsko_leto._id);
                        if(vm.predmet.izvedbe_predmeta[i].studijsko_leto._id == vm.studijskoLetoId)
                        {
                            //console.log("HIT");
                            vm.studijskoLeto = vm.predmet.izvedbe_predmeta[i].studijsko_leto;
                            break;
                        }
                    }
                    vm.vsiPodatki = odgovor.data.vpisani.studenti;
                    for (var i = 0; i < vm.vsiPodatki.length; i++) {
                      for (var j = 0; j < vm.vsiPodatki[i].studijska_leta_studenta.length; j++) {
                        if(vm.vsiPodatki[i].studijska_leta_studenta[j].studijsko_leto == vm.studijskoLetoId)
                        {
                          vm.vsiPodatki[i].vrstaVpisa = vm.vsiPodatki[i].studijska_leta_studenta[j].vrsta_vpisa.naziv;
                          //console.log("Vrsta vpisa: ", vm.vsiPodatki[i].vrstaVpisa);
                        }
                      }
                    }
                    vm.studenti = vm.vsiPodatki;
                    pripraviStrani();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
               
       $scope.orderByMe = function(x) {
           if($scope.myOrderBy == x){
               $scope.bool=!($scope.bool);
           }
           
        $scope.myOrderBy = x;
        }
        
            $scope.exportDataPDF= function(){
        html2canvas(document.getElementById('exportable'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("test.pdf");
            }
        });
            }
        $scope.exportDataCSV = function () {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "text/csv;charset=utf-8"
        });
        saveAs(blob, "Report Example.csv");
    };
    

      vm.uredi = function(studentID){
           $location.path("/podrobnostiStudenta/" + studentID);
       };
       
       vm.zetoni = function(studentId)
       {
           console.log("prikaziStudente/" + studentId + "/zetoni");
         $location.path("prikaziStudente/" + studentId + "/zetoni");  
       };
        
    }
    
    angular
        .module('tpo')
        .controller('seznamVpisanihCtrl', seznamVpisanihCtrl);
    
})();