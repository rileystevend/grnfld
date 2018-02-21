angular.module('app')
.controller('SubmitCtrl', function($scope) {
    $scope.submit = function() {    
        // $http.post("insert.php", {
        //  'username': $scope.username,
        //  'code': $scope.codebox,
        //  'description': $scope.description})
        // .success(function(data,status,headers,config){
        //   console.log("Data Inserted Successfully");
        // });
        console.log('THE post button WORKS!')
    }
})