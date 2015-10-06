angular.module('myApp').controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    console.log(AuthService.getUserStatus());

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}]);




// app.controller('userController',function($scope,HTTPFactory){
//   $scope.users = [];

//   function getData() {
//     console.log('get data function firing');
//     HTTPFactory.getUsers().then(function(response) {
//       $scope.users = response.data;
//     });
//   }
//   getData();

//   function postData(payload) {
//     HTTPFactory.postUser(payload).then(function(response) {
//       console.log(response.data);
//       $scope.users.push(response.data);
//     });
//   }

//   $scope.addUser = function() {
//     var payload = {
//       'username': $scope.username,
//       'password': $scope.password
//     };
//     postData(payload);
//     console.log(payload);
//   };

//   $scope.removeUser = function(id){
//     HTTPFactory.deleteUser(id).then(function(response){
//       getData();
//     });
//   };

// });
