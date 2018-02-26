angular.module('app')

.controller('AppCtrl', function (postsService) {

  // this.posts = [{title: 'Heres the first post'}, {title: 'Heres the SECOND post'}];
  // this.currentPost = this.posts[0];
  this.comments = [{text: 'hey first comment!'}, {text: 'hey second comment!'}]
  postsService.getAll(data => {
    console.log(data);
    this.posts = data;
    
  });

  this.handlePostClick = (clickedvalue) => {
    this.currentPost = this.posts[clickedvalue];
  }
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
    .when('/login', {
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    });
  $locationProvider.html5Mode(true);
});
