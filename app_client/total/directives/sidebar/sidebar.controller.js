/* global angular */
(function() {
  function ctrlSidebar($window, authentication, $scope, aaData) {
    var sdbvm = this;
    
    sdbvm.user = authentication.currentUser();
    
    /*
    setTimeout(function() {
      console.log($scope.vm.novel.author);
    }, 3000);
    */
    
    sdbvm.saveSidebar = function() {
      $window.localStorage['sidebar'] = JSON.stringify(sdbvm.sidebar);
    };
    sdbvm.loadSidebar = function() {
      sdbvm.sidebar = $window.localStorage['sidebar'];
      try {
        sdbvm.sidebar = JSON.parse(sdbvm.sidebar);
      } catch(err) {
        sdbvm.sidebar = {
          collapse: true,
          fontSize: 14,
          nightMode: false
        };
      }
    };
    
    sdbvm.editing = false; // Are we editing this entry?
    
    sdbvm.loadSidebar();
    
    sdbvm.toggle = function() {
      sdbvm.sidebar.collapse = !sdbvm.sidebar.collapse;
      sdbvm.saveSidebar();
    };
    
    sdbvm.showChapters = false;
    sdbvm.toggleChapters = function() {
      sdbvm.showChapters = !sdbvm.showChapters;
    };
    
    $window.$('body').css('font-size', sdbvm.sidebar.fontSize + "px");
    sdbvm.enlarge = function() {
      sdbvm.sidebar.fontSize++;
      sdbvm.saveSidebar();
      $window.$('body').css('font-size', sdbvm.sidebar.fontSize + "px");
    };
    sdbvm.shrink = function() {
      if(sdbvm.sidebar.fontSize > 12)
        sdbvm.sidebar.fontSize--;
      sdbvm.saveSidebar();
      $window.$('body').css('font-size', sdbvm.sidebar.fontSize + "px");
    };
    
    sdbvm.applyDisplayMode = function() {
      if(sdbvm.sidebar.nightMode) {
        $window.$('.navbar-default').addClass('navbar-inverse').removeClass('navbar-default');
        $window.$('body').addClass('nighttime');
      } else {
        $window.$('.navbar-inverse').addClass('navbar-default').removeClass('navbar-inverse');
        $window.$('body').removeClass('nighttime');
      }
    };
    sdbvm.toggleMode = function() {
      console.log("Changing display mode");
      sdbvm.sidebar.nightMode = !sdbvm.sidebar.nightMode;
      sdbvm.applyDisplayMode();
    };
    sdbvm.applyDisplayMode();
    
    // Tooltips
    $window.$('.tooltip-enable').tooltip({
      trigger : 'hover'
    });
    
    sdbvm.toggleBold = function() {
      document.execCommand('bold');
    };
    sdbvm.toggleItalic = function() {
      document.execCommand('italic');
    };
  }
  ctrlSidebar.$inject = ['$window', 'authentication', '$scope', 'aaData'];
  
  angular
    .module('aa-novels')
    .controller('sidebar.controller', ctrlSidebar);
})();