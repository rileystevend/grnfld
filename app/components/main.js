angular.module('app')
.controller('MainCtrl', function ($scope, postsService, $rootScope){
  postsService.getAll(data => {
    console.log('got posts');
    $scope.posts = data;
  });

  $scope.handlePostClick = (clickedvalue) => {
    $scope.currentPost = $scope.posts[clickedvalue];
    postsService.getComments($scope.currentPost.post_id, (data) => {
      console.log(data);
      $scope.comments = data;
    })
  };
})
