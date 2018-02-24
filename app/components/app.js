angular.module('app')

.controller('AppCtrl', function (postsService) {

  this.posts = [{title: 'Heres the first post'}, {title: 'Heres the SECOND post'}];
  postsService.getAll(data => {
    this.posts = data;
  });
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
    });
  $locationProvider.html5Mode(true);
});
