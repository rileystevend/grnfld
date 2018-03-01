angular.module('app')
.controller('MainCtrl', function ($scope, postsService, $rootScope) {
  $scope.currentPage = 1;
  $scope.numPerPage = 5;
  
  postsService.getAll(data => {
    console.log('got posts');
    $scope.posts = data;
    
    $scope.$watch('currentPage + numPerPage', function () {
      let begin = (($scope.currentPage - 1) * $scope.numPerPage);
      let end = begin + $scope.numPerPage;
      
      $scope.filteredPosts = $scope.posts.slice(begin, end);
    });
  });
  
  $scope.handlePostClick = (clickedvalue) => {
    let actualValue = (($scope.currentPage - 1) * 5) + clickedvalue;
    $scope.currentPost = $scope.posts[actualValue];
    postsService.getComments($scope.currentPost.post_id, (data) => {
      console.log(data);
      $scope.comments = data;
      $scope.currentIndex = actualValue;
    });

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

});

