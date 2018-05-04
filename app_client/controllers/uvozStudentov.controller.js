/* global angular */
(function() {
	
  textCtrl.$inject = ['$location', 'authentication', '$scope','$route','$window','$http', "ostaloPodatki"];
  
  function textCtrl($location, authentication, $scope, $route, $window, $http, ostaloPodatki) {
  	
    var vm = this;
    
    vm.podatki = {
    	studijsko_leto: "",
    	nacin_studija: ""
    };
    
    ostaloPodatki.pridobiVseVeljavneStudijskaLeta().then(
      function success(odgovor) {
        vm.studijskaLeta = odgovor.data;
      },
      function error(odgovor) {
        console.log("Prišlo do napake pri pridobivanju študijskih let: " + odgovor);
      }
    );
    ostaloPodatki.pridobiVseVeljavne().then(
      function success(odgovor) {
        vm.naciniStudija = odgovor.data;
      },
      function error(odgovor) {
        console.log("Prišlo do napake pri pridobivanju načinov študija: " + odgovor);
      }
    );
  	
  	window.onload = function() {
			var fileInput = document.getElementById('fileInput');
			
			fileInput.addEventListener('change', function(e) {
				var file = fileInput.files[0];
				var textType = /text.*/;
				
				if (file.type.match(textType)) {
					var reader = new FileReader();
					
					reader.onload = function(e) {
						alert(reader.result);
					};
					
					reader.readAsText(file);	
				} else {
					console.log("file not supported");
				}
			});
    };
    
    vm.nek=function(){
	    var fileInput = document.getElementById('fileInput');
			var file = fileInput.files[0];
			var textType = /text.*/;
			
			if(vm.podatki.nacin_studija === "")
				return vm.formError = "Ni izbranega veljavnega načina študija";
			
			if (file.type.match(textType)) {
				var reader = new FileReader();
	
				reader.onload = function(e) {
					ostaloPodatki.uvoziStudente({
						Podatki: reader.result,
						studijsko_leto: vm.podatki.studijsko_leto,
						nacin_studija: vm.podatki.nacin_studija
					})
					.then(
						function success(res) {
							//console.log(res.data);
							if(res.status != 201)
								vm.formError = "Nihče ni bil uspešno vnešen";
							vm.uvoz=res.data;
						},
						function error(res) {
							vm.uvoz = res.data;
							if(res.status == 400) {
								return vm.formError = "Neveljavni podatki za uvoz študentov";
							}
							vm.formError = "Napaka pri vnosu: " + res.data.message;
		        }
	        );
				};
				reader.readAsText(file);	
			} else {
				console.log("file not supported");
			}
		};
	}
    
    angular
        .module('tpo')
        .controller('importCtrl', textCtrl);
})();