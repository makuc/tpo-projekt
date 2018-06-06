(function() {
    /* global angular */
    
    var navigacijaStudent = function(){
        return {
            restrict: 'EA',
            templateUrl: '/total/directives/navigacijaStudent/navigacijaStudent.template.html'
        };
    };
    
    angular
        .module('tpo')
        .directive('navigacijastudent', navigacijaStudent);
})();