angular.module('app')
.controller('SubmitCtrl', function($scope, itemsService) {
    $scope.submit = itemsService.submitNewPost( $scope.newPost, (res) => {
      console.log('THE post button WORKS!');
      console.log('res', res);
    });
        // $http.post('/createPost', {
        //  'username': $scope.username,
        //  'code': $scope.codebox,
        //  'description': $scope.description})
        // .success(function(data,status,headers,config){
        //   console.log("Data Inserted Successfully");

    //create new post variable
    $scope.newPost = null;

    //updates variable with post object
    function createNewPost(post) {
        console.log('post', post);
        $scope.newPost = angular.copy(post);    //angular.copy used to only set object after submit button is clicked
    }

    //allows function to be public. No $scope = private function
    $scope.createNewPost = createNewPost;


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