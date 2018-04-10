(function() {
    /* global angular */
    /* global LS */
    loginCtrl.$inject = ["$location", "authentication", "$scope"];
    function loginCtrl($location, authentication, $scope) {
        var vm = this;
        
        
        vm.previousPage = $location.search().page || "/";
        vm.loginData = {
            email: "",
            password: ""
            
        };
        vm.formError = "";
        vm.sendData = function(){
            if(!vm.loginData.email || !vm.loginData.password){
                
                vm.error="Vsa polja so zahtevana";
                
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
                    $location.search("page", null);
                    $location.path(vm.previousPage);
                }, function error(error){
                    console.log(error);
                    vm.formError = error.data.message;
                });
            
        };
        
        
        var myMail = LS.getData('emailId');
        
        $scope.rememberMe1 = function () {
            LS.setData("emailId", $scope.loginDetails.email);
        };
        
        
    }
    
    angular
        .module('tpo')
        .contoller('loginCtrl', loginCtrl);
})();