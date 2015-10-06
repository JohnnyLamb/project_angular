var app = angular.module('myApp',['ngRoute']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {templateUrl: 'partials/home.html'})
    .when('/login', {templateUrl: 'partials/login.html', controller: 'loginController'})
    .when('/logout', {controller: 'logoutController'})
    .when('/register', {templateUrl: 'partials/register.html', controller: 'registerController'})
    .when('/one', {template: '<h1>This is page one!</h1>'})
    .when('/two', {template: '<h1>This is page two!</h1>'})
    .otherwise({redirectTo: '/'});
});

// myApp.run(function ($rootScope, $location, $route, AuthService) {
//   $rootScope.$on('$routeChangeStart', function (event, next, current) {
//     if (next.access.restricted && AuthService.isLoggedIn() === false) {
//       $location.path('/login');
//     }
//   });
// });
