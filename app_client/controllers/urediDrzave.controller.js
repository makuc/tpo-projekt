(function() {
    /* global angular */
    
    urediDrzaveCtrl.$inject = ['ostaloPodatki', '$scope', '$location', 'authentication'];
    
    
    function urediDrzaveCtrl(ostaloPodatki, $scope, $location, authentication){
        var vm = this;
        
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
        
        vm.naStran = 10.0;
        vm.strani = [1];
        vm.stran = 0;
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
        
        vm.prikaziDrzave = function(){
            ostaloPodatki.pridobiVseDrzave().then(
                function success(odgovor){
                    vm.drzave = odgovor.data;
                    pripraviStrani();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.izbris = function(drzavaId){
            ostaloPodatki.izbrisiDrzavo(drzavaId).then(
                function success(odgovor){
                    vm.prikaziDrzave();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.obnovi = function(drzavaId){
            ostaloPodatki.obnoviDrzavo(drzavaId).then(
                function success(odgovor){
                    vm.prikaziDrzave();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(drzavaId){
           $location.path("/urediDrzavo/" + drzavaId);
       };
       
       $scope.orderByMe = function(x) {
           if($scope.myOrderBy == x){
               $scope.bool=!($scope.bool);
           }
           
        $scope.myOrderBy = x;
        }
                function buildTableBody(data, columns, names) {
            var body = [];
            var i=1;
            body.push(names);
           
        
            data.forEach(function(row) {
                var dataRow = [];
                
                dataRow.push(i.toString());
                i++;
                columns.forEach(function(column) {
                  
                    dataRow.push(row[column].toString());
                })
                
                body.push(dataRow);
            });
        
            return body;
        }
        
        function table(data, columns, names) {
            return {
                table: {
                    headerRows: 1,
                    body: buildTableBody(data, columns, names)
                }
            };
        }

        
        vm.exportDataPDF= function(){

            
            var docDefinition = {
               	content: [
                    { text: '', style: 'header' },
                    table($scope.query,
                        [ 'numericna_oznaka', 'slovenski_naziv', 'ISO_naziv', 'dvomestna_koda','trimestna_koda'],
                        ['#','Numerična oznaka', 'Slovenski naziv', 'ISO naziv', 'Dvomestna koda', 'Trimestna koda'])
                ]
        
             };
             pdfMake.createPdf(docDefinition).download('optionalName.pdf');
        }
        
    }
    
    angular
        .module('tpo')
        .controller('urediDrzaveCtrl', urediDrzaveCtrl);
    
})();