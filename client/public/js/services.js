angular.module('myApp').factory('AuthService', ['$q', '$timeout', '$http',
  function($q, $timeout, $http) {

    // create user variable
    var user = null;

    // is the user logged in?
    function isLoggedIn() {
      if (user) {
        return true;
      } else {
        return false;
      }
    }
    // get user status
    function getUserStatus() {
      return user;
    }

    // login function
    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/login', {
          username: username,
          password: password
        })
        // handle success
        .success(function(data, status) {
          if (status === 200 && data.status) {
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function(data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }
    // logout function
    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/user/logout')
        // handle success
        .success(function(data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function(data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }
    // register function!
    function register(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/register', {
          username: username,
          password: password
        })
        // handle success
        .success(function(data, status) {
          if (status === 200 && data.status) {
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function(data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    // return available functions for use in controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });
  }
]);

// app.factory('HTTPFactory', ['$http', function($http){
//   var object = {};

//   // get request to see users
//   object.getUsers = function() {
//     return $http.get('api/users');
//   };
//   // get single user
//    object.getUser = function(id) {
//     return $http.get('api/user'+id);
//   };
//   //post request to create user
//   object.postUser = function(payload){
//     return $http.post('api/register/', payload);
//   };
// // delete single user
//   object.deleteUser = function(id){
//     return $http.delete('api/user/'+id);
//   };

//   object.putUser = function(id){
//     return $http.put('api/user/'+id);
//   };

//   return object;
// }]);
