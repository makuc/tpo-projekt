(function() {
    /* global angular */
    
    prijavljeniKandidatiCtrl.$inject = ['ostaloPodatki', '$scope', '$location', '$route'];
    
    
    function prijavljeniKandidatiCtrl(ostaloPodatki, $scope, $location, $route){
        var vm = this;
        
        vm.izvedbaId = $route.current.pathParams.rokId;
        //console.log(vm.izvedbaId);
        vm.opcijeOcen = [1,2,3,4,5,6,7,8,9,10];
        
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
                    pripraviStrani();
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