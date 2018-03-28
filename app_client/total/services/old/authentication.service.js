/* global angular */
(function() {
  function authentication($window, $http) {
    
    function base64ToUTF8(string) {
      return decodeURIComponent(Array.prototype.map.call($window.atob(string), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    }
    
    function saveToken(token) {
      $window.localStorage['aa-novels-token'] = token;
    }
    function getToken() {
      return $window.localStorage['aa-novels-token'];
    }
    function deteleToken() {
      return $window.localStorage.removeItem('aa-novels-token');
    }
    
    function register(user) {
      return $http.post('/api/v1/users', user).then(
        function success(res) {
          saveToken(res.data.token);
        }
      );
    }
    function login(user) {
      return $http.post('/api/v1/login', user).then(
        function success(res) {
          saveToken(res.data.token);
        }
      );
    }
    function logout() {
      deteleToken();
    }
    function auth() {
      var token = getToken();
      if (token) {
        var content = JSON.parse(base64ToUTF8(token.split('.')[1]));
        return content.expires > Date.now(); // Transform to seconds and compares
      } else {
        $window.localStorage.removeItem('aa-novels-token');
        return false;
      }
    }
    function currentUser() {
      if (auth()) {
        var token = getToken();
        var content = JSON.parse(base64ToUTF8(token.split('.')[1]));
        return {
          _id: content._id,
          email: content.email,
          name: content.name
        };
      } else
        return {
          _id: "",
          email: "",
          name: ""
        };
    }

    
    return {
        saveToken: saveToken,
        getToken: getToken,
        
        register: register,
        login: login,
        logout: logout,
        auth: auth,
        currentUser: currentUser
    };
  }
  authentication.$inject = ['$window', '$http'];
  
  angular
    .module('aa-novels')
    .service('authentication', authentication);
})();