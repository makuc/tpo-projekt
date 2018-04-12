(function() {
    /* global angular */
    
    textCtrl.$inject = ['$location', 'authentication', '$scope','$route','$window','$http'];
    function textCtrl($location, authentication, $scope, $route, $window, $http) {
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
				alert(reader.result);
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