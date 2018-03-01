angular.module('app')
.controller('NavbarCtrl', function($scope, $rootScope) {
  $scope.logout = function() {
    $rootScope.userId = 0;
  }
})
.directive('navbar', function() {
  return {
    templateUrl: 'templates/navbar.html',
    controller: 'NavbarCtrl'
  };
});