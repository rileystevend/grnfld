angular.module('app')
.directive('postsFrontPage', function() {

  return {
    restrict: 'E',
    templateUrl: 'templates/posts-list.html',
  };
});
