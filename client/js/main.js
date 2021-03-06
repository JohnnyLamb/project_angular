var app = angular.module('myApp', ['ngRoute','ngResource']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'partials/home.html',
      access: {restricted: false}
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'registerController',
      access: {restricted: false}
    })
     .when('/events', {
      controller: 'EventsController',
      templateUrl: 'partials/events.html',
      access: {restricted: true}
    })
    .when('/myevents', {
      templateURL: 'myevents',
      access: {restricted: true}
    })
    .when('/two', {
      template: '<h1>This is page two!</h1>',
      access: {restricted: false}
    })
    .otherwise({redirectTo: '/home'});
});

app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && AuthService.isLoggedIn() === false) {

      $location.path('/login');
    }
  });
});
