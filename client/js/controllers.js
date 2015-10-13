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
          // console.log(data);
          $rootScope.user = data.user.username;
          // console.log($rootScope);
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

app.controller('registerController', ['$rootScope', '$scope', '$location', 'AuthService',
  function($rootScope, $scope, $location, AuthService) {
    // console.log(AuthService.getUserStatus());
    $scope.register = function() {
      // initial values
      $scope.error = false;
      $scope.disabled = true;
      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function(data) {
          // console.log(data.user)
          $location.path('/events');
          $scope.disabled = false;
          $rootScope.user = data.user;
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
    $scope.events = {};
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
    // get users events
    $http.get('yelp/user/events/').then(function(data) {
      // console.log(data.data.events[0]);
      $scope.addedEvents = data.data.events;
    });
    // add one event to a single user
    $scope.addEvent = function(data) {
      console.log(data);
      $http.post('/yelp/user/addEvent', data).then(function(data) {
        console.log(data);
        $scope.addedEvents = data.data.events;
      });
    };
    $scope.deleteEvent = function(data) {
      console.log(data);
      $http.delete('/yelp/user/delete/' + data).then(function(data) {
        // console.log(data);
        // $scope.addedEvents = data.data.events;
      });
    };
    // SORTING THE TABLES
    $scope.sortType = 'name';
    $scope.sortType2 = 'name';
    $scope.sortReverse = false;
    $scope.sortReverse2 = false; // set the default sort order
  }
]);
