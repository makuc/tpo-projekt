/* global angular */
(function() {
  function authentication($window, $http) {
    
    function base64ToUTF8(string) {
      return decodeURIComponent(Array.prototype.map.call($window.atob(string), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    }
    
    function saveToken(token) {
      $window.localStorage['tpo-token'] = token;
    }
    function getToken() {
      return $window.localStorage['tpo-token'];
    }
    function deteleToken() {
      return $window.localStorage.removeItem('tpo-token');
    }
    
    function register(user) {
      return $http.post('/api/v1/users', user).then(
        function success(res) {
          saveToken(res.data.token);
        }
      );
    }
    function login(user) {
      return $http.post('/api/v1/prijava', user).then(
        function success(res) {
          console.log(res.data)
          saveToken(res.data.token);
        },
        function error(res) {
          console.log("Prišlo do napake pri prijavi");
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
        $window.localStorage.removeItem('tpo-token');
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
          student: content.student,
          zaposlen: content.zaposlen,
          opombe: content.opombe
        };
      } else
        return {
          _id: "",
          email: "",
          student: "",
          zaposlen: "",
          opombe: ""
        };
    }
    function pozabljenoGeslo(email) {
      return $http.post("/api/v1/pozabljeno-geslo", {
        email: email
      });
    }
    function ponastaviGeslo(geslo, pozabljenoId) {
      return $http.post("/api/v1/pozabljeno-geslo/"+pozabljenoId, {
        password: geslo
      });
    }

    
    return {
        saveToken: saveToken,
        getToken: getToken,
        
        register: register,
        login: login,
        logout: logout,
        auth: auth,
        currentUser: currentUser,
        
        pozabljenoGeslo: pozabljenoGeslo,
        ponastaviGeslo: ponastaviGeslo
    };
  }
  authentication.$inject = ['$window', '$http'];
  
  angular
    .module('tpo')
    .service('authentication', authentication);
})();