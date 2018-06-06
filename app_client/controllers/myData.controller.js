(function() {
    /* global angular */
    
    myDataCtrl.$inject = ['$location', 'studentPodatki', '$routeParams', 'authentication', 'ostaloPodatki'];
    
    
    function myDataCtrl($location, studentPodatki, $routeParams, authentication, ostaloPodatki){
        var vm = this;
        
        vm.SProfil = true;
        
        vm.vpisan=authentication.currentUser();
        
        studentPodatki.izpisStudenta(authentication.currentUser().student).then(
            function success(odgovor){
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
        
        vm.logoutFunc = function() {
            delTok();
            return $location.path('/login');
        };
        
        function delTok(){
            return authentication.logout();
        }
       
        vm.najdiMe = function(){
            var allData = authentication.currentUser();
           console.log(allData);
            studentPodatki.izpisStudenta(allData.student).then(
                function success(odgovor){
                   
                    vm.student = odgovor.data;
                },
                function error(odgovor){
                  
                    console.log(odgovor);
                }
            );
        };
        
        vm.sklepi = function()
        {
            $location.path("/sklepi/" + vm.student._id);
        };
        
        vm.preklici = function(){
            $location.path("/main");
        };
    }
    
    angular
        .module('tpo')
        .controller('myDataCtrl', myDataCtrl);
})();