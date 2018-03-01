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
    });
  };
});
