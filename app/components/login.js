angular.module('app')
.controller('LoginCtrl', function($scope, usersService, $rootScope, $location) {
  $('.alert .close').on('click', function (e) {
    $(this).parent().hide();
  });

  $scope.username = '';
  $scope.password = '';
  $scope.submit = function(isValid) {
    if (isValid) {
      usersService.login($scope.username, $scope.password, res => {
        if (res.status === 401) {
          $('#login-error').show();
        } else {
          $rootScope.userId = res.data.user_id;
          $rootScope.hackcoin = res.data.hackcoin;
          // console.log('$rootScope', $rootScope);
          $location.path('/');
        }
      });
    }
  };
});