angular.module('app')

.controller('AppCtrl', function (postsService, $rootScope) {

  // this.posts = [{title: 'Heres the first post'}, {title: 'Heres the SECOND post'}];
  // this.currentPost = this.posts[0];
  // this.comments = [{text: 'hey first comment!'}, {text: 'hey second comment!'}]
  // postsService.getAll(data => {
  //   console.log(data);
  //   this.posts = data;
  // });

  // this.handlePostClick = (clickedvalue) => {
  //   this.currentPost = this.posts[clickedvalue];
  //   postsService.getComments(this.currentPost.post_id, (data) => {
  //     console.log(data);
  //     this.comments = data;
  //   })
  // };

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
