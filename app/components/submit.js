angular.module('app')
.controller('SubmitCtrl', function($scope) {
    $scope.submit = function() {    
        // $http.post('/createPost', {
        //  'username': $scope.username,
        //  'code': $scope.codebox,
        //  'description': $scope.description})
        // .success(function(data,status,headers,config){
        //   console.log("Data Inserted Successfully");
        };
        console.log('THE post button WORKS!');
    // }
});

/*
submit posts will include the following information in the post request
github user id
title
code
summary
anonymous value


{ githubUserId: '11111111',
  title: 'test Title',
  code: 'test Code',
  summary: 'test Summary',
  anonymous: 'false' }

 */