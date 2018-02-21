angular.module('app')
.controller('AppCtrl', function() {
})
.component('app', {
  bindings: {},
  controller: 'AppCtrl',
  templateUrl: '/templates/app.html'
})
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '../templates/main.html',
    controller: 'AppCtrl'
  })
  .when('/post', {
    templateUrl: '../templates/post.html',
    controller: 'FormCtrl'
  })
  .when('/login', {
    templateUrl: '../templates/login.html',
    controller: 'AppCtrl'
  });
});