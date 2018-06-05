(function() {
    /* global angular, pdfMake */
    
    urediPredmeteCtrl.$inject = ['predmetPodatki', '$scope', '$location', 'authentication', 'ostaloPodatki'];
    
    
    function urediPredmeteCtrl(predmetPodatki, $scope, $location, authentication, ostaloPodatki){
        var vm = this;
        
        vm.PPredmeti = true;
        vm.RVpisaniVPredmet = true;
        
         vm.vpisan=authentication.currentUser();
        
        if(authentication.currentUser().zaposlen){
            ostaloPodatki.najdiZaposlenega(authentication.currentUser().zaposlen).then(
                function success(odgovor){
                    vm.ime = odgovor.data.zaposlen.ime;
                    vm.priimek = odgovor.data.zaposlen.priimek;
                    vm.vpisan.zaposlen = odgovor.data;
                    console.log(odgovor.data);
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
            pripraviStrani()
        });
        
        vm.prikaziPredmete = function(){
            if(vm.vpisan.skrbnik == false && vm.vpisan.referentka == false)
            {
                vm.vpisan.predavatelj = true;
            }
            
            if(vm.vpisan.skrbnik == true)
            {
                predmetPodatki.izpisiVsePredmete().then(
                    function success(odgovor){
                        vm.data = odgovor.data;
                        pripraviStrani();
                    },
                    function error(odgovor){
                        console.log(odgovor);
                    }
                );
            }
            else if(vm.vpisan.referentka == true)
            {
                console.log("referentka");
                predmetPodatki.izpisiVseVeljavnePredmete().then(
                    function success(odgovor){
                        vm.data = odgovor.data;
                        pripraviStrani();
                    },
                    function error(odgovor){
                        console.log(odgovor);
                    }
                );
            }
            else if(vm.vpisan.predavatelj == true)
            {
                console.log("predavatelj");
                predmetPodatki.najdiPredmeteIzvajalca().then(
                    function success(odgovor){
                        vm.data = odgovor.data;
                        pripraviStrani();
                    },
                    function error(odgovor){
                        console.log(odgovor);
                    }
                );
            }
        };
        
        vm.izbris = function(predmetId){
            predmetPodatki.izbrisiPredmet(predmetId).then(
                function success(odgovor){
                    vm.prikaziPredmete();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        vm.obnovi = function(predmetId){
            predmetPodatki.obnoviPredmet(predmetId).then(
                function success(odgovor){
                    vm.prikaziPredmete();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        vm.uredi = function(predmetId){
            $location.path("/urediPredmet/" + predmetId);
        };
        
        vm.urediIzvedbe = function(predmetId) {
            $location.path("/urediIzvedbePredmeta/" + predmetId);
        };
               
        $scope.orderByMe = function(x) {
            if($scope.myOrderBy == x){
                $scope.bool=!($scope.bool);
            }
           
            $scope.myOrderBy = x;
        };
        
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
                    { text: 'Dynamic parts', style: 'header' },
                    table($scope.query,
                        [ 'sifra', 'naziv', 'KT' ],
                        [ '#','Šifra', 'Naziv', 'Kreditne točke' ]
                    )
                ]
        
             };
             pdfMake.createPdf(docDefinition).download('optionalName.pdf');
        }
        
    }
    
    angular
        .module('tpo')
        .controller('urediPredmeteCtrl', urediPredmeteCtrl);
    
})();