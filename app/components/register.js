angular.module('app')
.controller('RegisterCtrl', function ($scope, usersService, $rootScope, $location) {
  $scope.username = '';
  $scope.password = '';
  $scope.submit = function () {
    usersService.register($scope.username, $scope.password, res => {
      $rootScope.userId = res.data.user_id;
      $location.path('/');
    })
  };
});
