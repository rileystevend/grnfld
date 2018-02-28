angular.module('app')
.controller('LoginCtrl', function($scope, usersService, $cookies, $rootScope) {
  $scope.username = '';
  $scope.password = '';
  $scope.submit = function() {
    usersService.login($scope.username, $scope.password, res => {
      console.log($cookies.getAll())
      console.log(res);
      $rootScope.userId = res.data.user_id;
    });
  };
});