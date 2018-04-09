(function() {
    /* global angular */
    loginCtrl.$inject = ["$location", "authentication", "$scope"];
    function loginCtrl($location, authentication, $scope) {
        var vm = this;
        
        vm.loginData ={
            e_posta: "",
            password: ""
            
        };
        
        vm.sendData = function(){
            if(!vm.loginData.e_posta || !vm.loginData.password){
                
                console.log("Zahtevana so vsa polja");
                
                return false;
                
            }else{
                vm.login();
                
            }
            
            
        };
        
        vm.login=function(){
            console.log(vm.loginData);
            authentication
                .login(vm.loginData)
                .then(function success() {
                    $location.path("/vpisniList");
                    
                }, function error(error){
                    
                    console.log(error);
                });
            
        };
        
        
        
    }
    
    angular
        .module('tpo')
        .contoller('loginCtrl', loginCtrl);
})();