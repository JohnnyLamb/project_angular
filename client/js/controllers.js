app.controller('loginController', ['$rootScope', '$scope', '$location', 'AuthService',
  function($rootScope, $scope, $location, AuthService) {

    $scope.login = function() {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function(data) {
          $location.path('/events');
          $scope.disabled = false;
          console.log(data);
          $rootScope.user = data.user.username;
          console.log($rootScope);
          $scope.loginForm = {};

        })
        // handle error
        .catch(function() {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

  }
]);

app.controller('logoutController', ['$scope', '$location', 'AuthService',
  function($scope, $location, AuthService) {

    $scope.logout = function() {

      console.log(AuthService.getUserStatus());

      // call logout from service
      AuthService.logout()
        .then(function() {
          $location.path('/login');
        });
    };
  }
]);

app.controller('registerController', ['$scope', '$location', 'AuthService',
  function($scope, $location, AuthService) {

    console.log(AuthService.getUserStatus());

    $scope.register = function() {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function() {
          $location.path('/events');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function() {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });
    };
  }
]);

app.controller('EventsController', ['$scope',
  '$http',
  function($scope, $http) {
    $scope.getYelp = function() {
      if ($scope.city !== undefined && $scope.term !== undefined) {
        $scope.error = null;
        var url = 'yelp/user/events/' + $scope.term + '/' + $scope.city;
        $http.get(url).then(function(data) {
          $scope.events = data.data;
        });
      } else {
        $scope.error = "Please fill in the search fields";
      }
      $scope.city = undefined;
      $scope.term = undefined;
    };

  }
]);



app.controller('AddEventsController', ['$scope', '$http',

  function(payload,$http,$scope) {
    // $scope.events = {};
    // $http.post('user/:username/event',payload).then(function(response) {
    //   console.log(response.data);
    // });
    $scope.addEvent = function($scope) {
      var payload = {
        'event': $scope.event,
      };
      // postData(payload);
      console.log(payload);
    };
  }
]);
