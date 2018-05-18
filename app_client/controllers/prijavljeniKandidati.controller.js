(function() {
    /* global angular */
    
    prijavljeniKandidatiCtrl.$inject = ['ostaloPodatki', '$scope', '$location', '$route'];
    
    
    function prijavljeniKandidatiCtrl(ostaloPodatki, $scope, $location, $route){
        var vm = this;
        
        vm.izvedbaId = $route.current.pathParams.rokId;
        //console.log(vm.izvedbaId);
        vm.opcijeOcen = [1,2,3,4,5,6,7,8,9,10];
        
        vm.nextPage = function(){
            if(vm.trenutnaStran < vm.stKandidatov/10-1){
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
        
        vm.prikaziKandidate = function(){
            ostaloPodatki.pridobiIzpitniRok(vm.izvedbaId).then(
                function success(odgovor){
                    //console.log(odgovor.data);
                    vm.izpitniRok = odgovor.data;
                    vm.kandidati = vm.izpitniRok.polagalci;
                    for (var i = 0; i < vm.kandidati.length; i++) {
                        if(vm.kandidati[i].tock < 0)
                        {
                            vm.kandidati[i].tock = "";
                        }
                    }
                    console.log(vm.kandidati);
                   
                    //console.log("kandidati: ", vm.kandidati);
                    vm.stKandidatov = vm.kandidati.length;
                    vm.stKandidatovNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stKandidatov/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.kandidati.slice(
                            (page - 1) * vm.stKandidatovNaStran,
                            page * vm.stKandidatovNaStran
                            );
                        return pagedData;
                    }
                    vm.kandidati = array;
                    //console.log(vm.kandidati);
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.shraniVse = function(){
            for (var i = 0; i < vm.kandidati[vm.trenutnaStran].length; i++) 
            {
                var kandidat = vm.kandidati[vm.trenutnaStran][i];
                if(kandidat.odjavljen == true)
                {
                    continue;
                }
                //console.log(kandidat);
                var data = {
                    tock: kandidat.tock,
                    ocena: kandidat.ocena,
                    koncna_ocena: kandidat.koncna_ocena
                };
                ostaloPodatki.posodobiOceno(vm.izvedbaId, kandidat.student._id, data).then(
                    function success(odgovor){
                        //$location.path("/vsiIzpitniRoki/" + vm.izvedbaId + "/kandidati");
                        vm.prikaziKandidate();
                        vm.uspeh = "Podatki so bili uspešno shranjeni.";
                        vm.obvestilo = "";
                    },
                    function error(odgovor){
                        vm.uspeh = "";
                        vm.obvestilo = "Neveljavni podatki - preverite vnešene ocene.";
                        console.log(odgovor);
                    }
                );
            }
        };
        
        vm.shraniStudenta = function(kandidat){
            var data = {
                tock: kandidat.tock,
                ocena: kandidat.ocena,
                koncna_ocena: kandidat.koncna_ocena
            };
            ostaloPodatki.posodobiOceno(vm.izvedbaId, kandidat.student._id, data).then(
                function success(odgovor){
                    //$location.path("/vsiIzpitniRoki/" + vm.izvedbaId + "/kandidati");
                    vm.prikaziKandidate();
                    vm.uspeh = "Podatki so bili uspešno shranjeni.";
                    vm.obvestilo = "";
                },
                function error(odgovor){
                    vm.uspeh = "";
                    vm.obvestilo = "Neveljavni podatki - preverite vnešene ocene.";
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(studentId){
            //console.log(zaposlenId);
            // /vsiIzpitniRoki/5af174a9267cef0a952d32fa/kandidati
            $location.path("/vsiIzpitniRoki/" + vm.izvedbaId + '/kandidati/' + studentId);
        };
        
        vm.odjavi = function(studentId)
        {
          ostaloPodatki.odjaviOdRokaForce(vm.izvedbaId, studentId).then(
            function success(odgovor){
                vm.prikaziKandidate();
            },
            function error(odgovor){
                console.log(odgovor);
            });
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
    }
    
    angular
        .module('tpo')
        .controller('prijavljeniKandidatiCtrl', prijavljeniKandidatiCtrl);
    
})();