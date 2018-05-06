(function() {
    /* global angular */
    
    myDataCtrl.$inject = ['$location', 'studentPodatki', '$routeParams', 'authentication'];
    
    
    function myDataCtrl($location, studentPodatki, $routeParams, authentication){
        var vm = this;
        
        
       
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

        
        vm.preklici = function(){
            $location.path("/main");
        };
    }
    
    angular
        .module('tpo')
        .controller('myDataCtrl', myDataCtrl);
})();