(function() {
    /* global angular, html2canvas, pdfMake, Blob, saveAs */
    
    narocilaPotrdilVpisaCtrl.$inject = ['studentPodatki', '$scope', '$location', 'authentication', 'ostaloPodatki', '$window'];
    
    
    function narocilaPotrdilVpisaCtrl(studentPodatki, $scope, $location, authentication, ostaloPodatki, $window){
        var vm = this;
        
        vm.RNarocilaPotrdilVpis = true;
        vm.SNarociloVpis = true;
        
         vm.vpisan=authentication.currentUser();
         console.log("Vpisan: ", vm.vpisan);
        
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
        } else {
            studentPodatki.izpisStudenta(authentication.currentUser().student).then(
                function success(odgovor){
                    console.log(odgovor.data);
                    for(var i = 0; i < odgovor.data.zetoni.length; i++){
                        if(!odgovor.data.zetoni[i].izkoriscen){
                            vm.neizkoriscenZeton = true;
                        }
                    }
                    vm.ime = odgovor.data.ime;
                    vm.priimek = odgovor.data.priimek;
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
            ostaloPodatki.pridobiVsaNarocila().then(
                function success(odgovor){
                    vm.studenti = odgovor.data;
                    vm.temp = [];
                    vm.kolicina = 1;
                    if(vm.vpisan.student)
                    {
                      for (var i = 0; i < vm.studenti.length; i++) {
                        if(vm.studenti[i].vpis.student._id == vm.vpisan.student)
                        {
                          vm.temp.push(vm.studenti[i]);
                        }
                      }
                      vm.studenti = vm.temp;
                    }
                    console.log("Odgovor:", vm.studenti);
                    
                    studentPodatki.izpisStudenta(vm.vpisan.student).then(
                      function success(odgovor){
                        vm.studentObject = odgovor.data;
                        console.log("Student object: ", vm.studentObject);
                        vm.studijskoLeto = vm.studentObject.studijska_leta_studenta[0].studijsko_leto;
                        pripraviStrani();
                      },
                      function error(odgovor){
                        console.log(odgovor);
                      }
                    );
                    
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.narociPotrdilo = function()
        {
          var data = {
              studijsko_leto: vm.studijskoLeto._id,
              izvodov: vm.kolicina
          };
          console.log("Data: ", data);
          ostaloPodatki.narociPotrdiloVpisa(data).then(
                function success(odgovor){
                    vm.prikaziStudente();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.izpisPotrdila = function(vpisId)
        {
            $window.open("/api/v1/potrdilo-vpisa/" + vpisId, "_blank")
        };
        
        vm.potrdiNarocilo = function(narociloId)
        {
            ostaloPodatki.zakljuciNarociloPotrdilaVpisa(narociloId).then(
                function success(odgovor){
                    vm.prikaziStudente();
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
                    margin:150,
                    headerRows: 1,
                    body: buildTableBody(data, columns, names),
                    alignment: 'center'
                },
                layout: 'lightHorizontalLines'
            };
        }

        vm.exportDataPDF= function(){
           var today = new Date();
            var dy = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            if(dy<10) {
                dy = '0'+dy;
            } 
            
            if(mm<10) {
                mm = '0'+mm;
            } 
            
            today =  "Datum: " + dy + '/' + mm + '/' + yyyy;
            
            var docDefinition = {
                header: {
                    margin: 30,
                    columns: [
                        {
                            // usually you would use a dataUri instead of the name for client-side printing
                            // sampleImage.jpg however works inside playground so you can play with it
                            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAE/CAYAAAC+b6cPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzgzMzE2MTk2RkU2MTFFNTlDMjRENTUzMzk1MThEQkMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzgzMzE2MUE2RkU2MTFFNTlDMjRENTUzMzk1MThEQkMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3ODMzMTYxNzZGRTYxMUU1OUMyNEQ1NTMzOTUxOERCQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3ODMzMTYxODZGRTYxMUU1OUMyNEQ1NTMzOTUxOERCQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ph5hCWoAAJIESURBVHja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",
                            width: 150
                        },
                        { text: 'Študenti',  margin: [50,70], fontSize: 16, alignment: 'center' },
                        {
                            margin: [0,50],
                            text: today,
                            alignment: 'center'
                        }
                    ]
                },
                footer: function(currentPage, pageCount) {
                    return {
                        margin:10,
                        columns: [
                        {
                            fontSize: 9,
                            text:[
                            {
                            text: '--------------------------------------------------------------------------' +
                            '\n',
                            margin: [0, 20]
                            },
                            {
                            text: currentPage.toString() + ' of ' + pageCount,
                            }
                            ],
                            alignment: 'center'
                        }
                        ]
                    };
              
                },
                
               	content: [
                   
                    table($scope.query,
                        ['vpisna_stevilka', 'priimek', 'ime'],
                        ['#','Vpisna št.',      'Priimek', 'Ime'])
                        
                ],
                pageMargins: [30,120,50,50]
                
                
        
             };
             pdfMake.createPdf(docDefinition).download('optionalName.pdf');
        }

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
       vm.refer = function(studentId)
       {
            
            $location.path("kartotecniList/" + studentId);  
       };
        
    }
    
    angular
        .module('tpo')
        .controller('narocilaPotrdilVpisaCtrl', narocilaPotrdilVpisaCtrl);
})();