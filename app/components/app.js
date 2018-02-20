angular.module('app')
.controller('AppCtrl', function() {
  // itemsService.getAll((data) => {
  //   this.items = data;
  // });
})
// .component('app', {
//   bindings: {},
//   controller: 'AppCtrl',
//   templateUrl: '/templates/app.html'
// })
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '../templates/main.html',
    controller: 'AppCtrl'
  })
  .when('/post', {
    templateUrl: '../templates/post.html',
    controller: 'AppCtrl'
  })
  .when('/login', {
    templateUrl: '../templates/login.html',
    controller: 'AppCtrl'
  });
});