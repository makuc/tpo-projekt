(function() {
    /* global angular, html2canvas, pdfMake, Blob, saveAs */
    
    prikaziStudenteCtrl.$inject = ['studentPodatki', '$scope', '$location', 'authentication', 'ostaloPodatki'];
    
    
    function prikaziStudenteCtrl(studentPodatki, $scope, $location, authentication, ostaloPodatki){
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
            studentPodatki.izpisStudentov().then(
                function success(odgovor){
                    vm.studenti = odgovor.data;
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
        };

//----------------------------------------------------------------------------------
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
                        ['vpisna_stevilka', 'priimek', 'ime'],
                        ['#','Vpisna št.',      'Priimek', 'Ime'])
                ]
        
             };
             pdfMake.createPdf(docDefinition).download('optionalName.pdf');
        }
//----------------------------------------------------------------------------------    
        vm.sklepi = function(studentId)
        {
            $location.path("/sklepi/" + studentId);
        };
        
        vm.izpiti = function(studentId)
        {
            $location.path("/izpitiForce/" + studentId);  
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
        .controller('prikaziStudenteCtrl', prikaziStudenteCtrl);
})();