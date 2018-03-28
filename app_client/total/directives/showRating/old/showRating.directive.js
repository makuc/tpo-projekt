(function() {
    /* global angular */
    var showRating = function() {
        return {
            restrict: 'EA',
            scope: {
                rating: '=rating'
            },
            templateUrl: "/total/directives/showRating/star-rating.html"
        };
    };
    
    angular
      .module('aa-novels')
      .directive('showRating', showRating);
})();