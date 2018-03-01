angular.module('app')
.controller('SubmitCtrl', function($scope, postsService, $rootScope, $location) {
  $scope.submit = function() {
    postsService.submitNewPost($scope.post, (res) => {
      if(res.status === 200){
        $location.path('/');
      }
    });
  };
  //create new post variable
  $scope.post = {
    userId: $rootScope.userId,
    title: '',
    codebox: '',
    description: ''
  };

  //updates variable with post object
  // function createNewPost(post) {
  //     console.log('post', post);
  //     $scope.newPost = angular.copy(post);    //angular.copy used to only set object after submit button is clicked
  // }

  //allows function to be public. No $scope = private function
  // $scope.createNewPost = createNewPost;
});

/*
submit posts will include the following information in the post request
TODO github user id/userid
title
code
summary
anonymous value - postponed


{ githubUserId: '11111111',
  title: 'test Title',
  code: 'test Code',
  summary: 'test Summary',
  anonymous: 'false' }

 */