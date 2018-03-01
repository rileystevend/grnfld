angular.module('app')
.controller('MainCtrl', function ($scope, postsService, commentService, $rootScope){
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
      $scope.currentIndex = clickedvalue;
    })
  };

  $scope.message = '';

  $scope.submitComment = () => {
    let commentObj = {
    	user_id: $rootScope.userId,
    	post_id: $scope.currentPost.post_id,
    	message: $scope.message
    };
    console.log('controller!!!', commentObj);
    commentService.submitNewComment(commentObj, (data) => {
      $scope.message = '';
      $scope.handlePostClick($scope.currentIndex);
      console.log('sent from controller to server!!');
    })
  };
})
