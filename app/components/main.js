angular.module('app')
.controller('MainCtrl', function ($scope, postsService, $rootScope){
	$scope.comments = [{text: 'hey first comment!'}, {text: 'hey second comment!'}]
  	postsService.getAll(data => {
      console.log(data);
      $scope.posts = data;
  	});

  $scope.handlePostClick = (clickedvalue) => {
    $scope.currentPost = $scope.posts[clickedvalue];
    postsService.getComments($scope.currentPost.post_id, (data) => {
      console.log(data);
      $scope.comments = data;
    })
  };

  $scope.submitComment = (clickedvalue) => {
    $scope.currentPost = $scope.posts[clickedvalue];
    //let commentObj = {} $scope.currentPost.post_id
    commentService.submitNewComment(commentObj, (data) => {
      console.log(data);
      $scope.comments = data;
    })
  };
})
