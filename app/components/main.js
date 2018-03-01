angular.module('app')
.controller('MainCtrl', function ($scope, postsService, $rootScope, commentService) {
  $scope.init = function() {
    $scope.currentPage = 1;
    $scope.numPerPage = 5;

    //get all posts on page load
    postsService.getAll(data => {
      console.log('got posts');
      $scope.posts = data;

      //pagination
      $scope.$watch('currentPage + numPerPage', function () {
        //filter posts by page number
        let begin = (($scope.currentPage - 1) * $scope.numPerPage);
        let end = begin + $scope.numPerPage;

        $scope.filteredPosts = $scope.posts.slice(begin, end);
      });
    });
  };

  //runs init on view startup
  $scope.init();

  $scope.handlePostClick = (clickedValue) => {
    $scope.currentPost = $scope.filteredPosts[clickedValue];
    //get all comments from clicked post
    postsService.getComments($scope.currentPost.post_id, (data) => {
      $scope.comments = data;
      $scope.currentIndex = clickedValue; //sets index for when submit comment is clicked
    });

  };

  //hacky way of refreshing the current view to get new posts
  $scope.refresh = () => {
    $scope.init();
  };

  $scope.message = '';

  $scope.submitComment = () => {
    let commentObj = {
    	user_id: $rootScope.userId,
    	post_id: $scope.currentPost.post_id,
    	message: $scope.message
    };
    commentService.submitNewComment(commentObj, (data) => {
      $scope.message = '';
      $scope.handlePostClick($scope.currentIndex);
    })
  };

});

