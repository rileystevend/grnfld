angular.module('app')
.controller('RegisterCtrl', function ($scope, usersService, $rootScope, $location) {
  $('.alert .close').on('click', function (e) {
    $(this).parent().hide();
  });
  
  $scope.username = '';
  $scope.password = '';
  $scope.submit = function (isValid) {
    if (isValid) {
      usersService.register($scope.username, $scope.password, res => {
        if (res.status === 409) {
          $('#registration-error').show();
        } else {
          $rootScope.userId = res.data.user_id;
          $location.path('/');
        }
      });
    }
  };
});
