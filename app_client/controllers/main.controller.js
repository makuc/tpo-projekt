(function() {
    /* global angular */
    mainCtrl.$inject = ['$location', 'authentication', '$scope','$route','$window','$http', 'studentPodatki'];
    function mainCtrl($location, authentication, $scope, $route, $window, $http, studentPodatki) {
        var vm = this;
        
        studentPodatki.izpisStudenta(authentication.currentUser().student).then(
            function succer(odgovor){
                for(var i = 0; i < odgovor.data.zetoni.length; i++){
                    if(!odgovor.data.zetoni[0].izkoriscen){
                        vm.neizkoriscenZeton = true;
                    }
                }
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
        vm.vpisniList = function(){
          $location.path('/vpis/' + authentication.currentUser().student + '/podatkiStudenta');  
        };
        
        console.log();
        
        if(!authentication.auth()) {
            return $location.path('/login');
        }
        
       function delTok(){
            return authentication.logout();
        }
    
        $scope.logoutFunc = function() {
            delTok();
            return $location.path('/login');
        };
        $scope.myData = function() {
            return $location.path('/myData');
        };
    }
    
    angular
        .module('tpo')
        .controller('mainCtrl', mainCtrl);
})();