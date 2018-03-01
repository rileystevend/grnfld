angular.module('app')

.controller('AppCtrl', function (postsService, $rootScope) {
  $rootScope.userId = 0;
})
.component('app', {
  bindings: {},
  controller: 'AppCtrl',
  templateUrl: 'templates/app.html'
})
.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/main.html',
      controller: 'MainCtrl'
    })
    .when('/submit', {
      templateUrl: 'templates/submit.html',
      controller: 'SubmitCtrl'
    })
    .when('/login', {
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
    .when('/register', {
      templateUrl: 'templates/register.html',
      controller: 'RegisterCtrl'
    })
    .otherwise({ redirectTo: '/login' });
  $locationProvider.html5Mode(true);
});
