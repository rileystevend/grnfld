angular.module('app')
.controller('NavbarCtrl', function() {

})
.directive('navbar', function() {
  return {
    templateUrl: 'templates/navbar.html',
    controller: 'NavbarCtrl'
  };
});