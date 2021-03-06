(function() {
    /* global angular */
    
    sklepiCtrl.$inject = ['ostaloPodatki', '$scope', '$location', 'authentication', 'studentPodatki', '$routeParams'];
    
    
    function sklepiCtrl(ostaloPodatki, $scope, $location, authentication, studentPodatki, $routeParams){
        var vm = this;
        
         vm.vpisan=authentication.currentUser();
         
         vm.studentId = $routeParams.studentId;
         
         vm.SSklipi = true;
         

        studentPodatki.izpisStudenta(vm.studentId).then(
            function success(odgovor){
                for(var i = 0; i < odgovor.data.zetoni.length; i++){
                    if(!odgovor.data.zetoni[i].izkoriscen){
                           vm.neizkoriscenZeton = true;
                    }
                }
                vm.ime = odgovor.data.ime;
                vm.priimek = odgovor.data.priimek;
                vm.kart = odgovor.data;
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );        

        
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
        
        vm.prikaziDelePredmetnika = function(){
            studentPodatki.izpisStudenta(vm.studentId).then(
                function success(odgovor){
                    vm.student = odgovor.data;
                    vm.deliPredmetnika = odgovor.data.sklepi;
                    console.log("Sklepi: ", vm.deliPredmetnika);
                    pripraviStrani();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.izbris = function(delPredmetnikaId){
            ostaloPodatki.odstraniSklepStudentu(vm.studentId, delPredmetnikaId).then(
                function success(odgovor){
                    vm.prikaziDelePredmetnika();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.obnovi = function(delPredmetnikaId){
            ostaloPodatki.obnoviDelPredmetnika(delPredmetnikaId).then(
                function success(odgovor){
                    vm.prikaziDelePredmetnika();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(delPredmetnikaId){
            $location.path("/sklepi/" + vm.studentId + "/uredi/" + delPredmetnikaId);
        };
               
       $scope.orderByMe = function(x) {
           if($scope.myOrderBy == x){
               $scope.bool=!($scope.bool);
           }
           
        $scope.myOrderBy = x;
        }
    }
    
    angular
        .module('tpo')
        .controller('sklepiCtrl', sklepiCtrl);
    
})();