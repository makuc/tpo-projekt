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
        
        vm.nextPage = function(){
            if(vm.trenutnaStran < vm.stStudentov/10-1){
                vm.trenutnaStran++;
            }
        };
        
        vm.prevPage = function(){
            if(vm.trenutnaStran > 0){
                vm.trenutnaStran--;
            }
        };
        
        vm.setPage = function(x){
            vm.trenutnaStran = x-1;
        };
        
        vm.prikaziStudente = function(){
            predmetPodatki.najdiVpisaneVPredmet(vm.predmetId, vm.studijskoLetoId).then(
                function success(odgovor){
                    console.log("Odgovor: ", odgovor.data.vpisani.studenti);
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
                    vm.stStudentov = vm.studenti.length;
                    vm.stStudentovNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stStudentov/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.studenti.slice(
                            (page - 1) * vm.stStudentovNaStran,
                            page * vm.stStudentovNaStran
                            );
                        return pagedData;
                    }
                    vm.studenti = array;
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