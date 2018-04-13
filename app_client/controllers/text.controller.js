(function() {
    /* global angular */
    
    textCtrl.$inject = ['$location', 'authentication', '$scope','$route','$window','$http', "ostaloPodatki"];
    function textCtrl($location, authentication, $scope, $route, $window, $http, ostaloPodatki) {
        var vm = this;
  window.onload = function() {
		var fileInput = document.getElementById('fileInput');
		

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
				alert(reader.result);
				}

				reader.readAsText(file);	
			} else {
				console.log("file not supported");
			}
		});
		
		
    }
    
   vm.nek=function(){
        var fileInput = document.getElementById('fileInput');
			var file = fileInput.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
					ostaloPodatki.uvoziStudente(reader.result)
					.then(
				        function success(res) {
				        	vm.uvoz=res.data;
				        },
				        function error(res) {
							if(res.status == 400)
								return vm.formError = "Neveljavni podatki v TXT datoteki";
							vm.formError = "User doesn't exist in our database";
				        }
			        );			
				}
				reader.readAsText(file);	
			} else {
				console.log("file not supported");
			}
		}
 }
    
    angular
        .module('tpo')
        .controller('textCtrl', textCtrl);
})();