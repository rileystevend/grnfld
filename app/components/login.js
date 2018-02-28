angular.module('app')
<<<<<<< 9ef3aaf374fcdf68268310d0a46d34a380c353fd
.controller('LoginCtrl', function($scope, usersService, $rootScope, $location) {
=======
.controller('LoginCtrl', function($scope, usersService, $cookies, $rootScope) {
>>>>>>> Add user id to root scope
  $scope.username = '';
  $scope.password = '';
  $scope.submit = function() {
    usersService.login($scope.username, $scope.password, res => {
<<<<<<< 9ef3aaf374fcdf68268310d0a46d34a380c353fd
      $rootScope.userId = res.data.user_id;
      $location.path('/');
=======
      console.log($cookies.getAll())
      console.log(res);
      $rootScope.userId = res.data.user_id;
>>>>>>> Add user id to root scope
    });
  };
});