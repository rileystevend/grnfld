angular.module('app')
.controller('AppCtrl', function(itemsService) {
  itemsService.getAll((data) => {
    this.items = data;
  });
})
.component('app', {
  bindings: {},
  controller: 'AppCtrl',
  templateUrl: '/templates/app.html'
})
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'main.html',
    controller: 'mainController'
  })
  .when('/post/:id', {
    templateUrl: 'post.html',
    controller: 'postController'
  })
});