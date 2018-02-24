angular.module('app')

.controller('AppCtrl', function (postsService) {

  this.posts = [{title: 'Heres the first post'}, {title: 'Heres the SECOND post'}];
  postsService.getAll(data => {
    console.log(data)
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
      controller: 'AppCtrl'
    })
    .when('/submit', {
      templateUrl: 'templates/submit.html',
      controller: 'SubmitCtrl'
    })
    .when('/token/:tokenId', {
      templateUrl: 'templates/main.html',
      controller: 'AppCtrl'
    });
  $locationProvider.html5Mode(true);
});
