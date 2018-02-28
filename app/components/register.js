angular.module('app')
.controller('RegisterCtrl', function ($scope, usersService) {
  $scope.username = '';
  $scope.password = '';
  $scope.submit = function () {
    usersService.register($scope.username, $scope.password, res => {
      console.log(res);
    })
  };
});
