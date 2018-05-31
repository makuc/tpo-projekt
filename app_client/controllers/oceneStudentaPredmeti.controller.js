(function() {
    /* global angular, html2canvas, pdfMake, Blob, saveAs */
    
    oceneStudentaPredmetiCtrl.$inject = ['studentPodatki', '$scope', '$location', 'authentication', 'ostaloPodatki', 'predmetPodatki', '$routeParams'];
    
    
    function oceneStudentaPredmetiCtrl(studentPodatki, $scope, $location, authentication, ostaloPodatki, predmetPodatki, $routeParams){
        var vm = this;
        
         vm.vpisan=authentication.currentUser();
         
         vm.predmetId = $routeParams.predmetId;
         vm.studijskoLetoId = $routeParams.studijskoLetoId;
        
        if(authentication.currentUser().zaposlen){
            ostaloPodatki.najdiZaposlenega(authentication.currentUser().zaposlen).then(
                function success(odgovor){
                    vm.zaposlen = odgovor.data;
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
            studentPodatki.izpisStudenta($routeParams.studentId).then(
                function success(odgovor){
                    vm.student = odgovor.data;
                    console.log("Student: ", vm.student);
                    predmetPodatki.najdiPredmeteIzvajalca().then(
                      function success(odgovor){
                          vm.predmetiIzvajalca = odgovor.data;
                          console.log("Predmeti izvajalca: ", vm.predmetiIzvajalca);
                          vm.predmetiUstrezni = [];
                          for (var i = 0; i < vm.predmetiIzvajalca.length; i++) {
                            for (var j = 0; j < vm.student.studijska_leta_studenta.length; j++) {
                              for (var k = 0; k < vm.student.studijska_leta_studenta[j].predmeti.length; k++) {
                                if(vm.student.studijska_leta_studenta[j].predmeti[k].predmet._id == vm.predmetiIzvajalca[i]._id)
                                {
                                  if(vm.student.studijska_leta_studenta[j].predmeti[k].ocena == -1)
                                  {
                                    vm.student.studijska_leta_studenta[j].predmeti[k].ocena = "/";
                                  }
                                  vm.predmetiUstrezni.push(vm.student.studijska_leta_studenta[j].predmeti[k]);
                                }
                              }
                            }
                          }
                          console.log("Ustrezni predmeti: ", vm.predmetiUstrezni);
                      },
                      function error(odgovor){
                          console.log(odgovor);
                      }
                    );
                    
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
        .controller('oceneStudentaPredmetiCtrl', oceneStudentaPredmetiCtrl);
    
})();