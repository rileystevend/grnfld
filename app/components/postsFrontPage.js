angular.module('app')
    .directive("postsFrontPage", function() {

      return {
        restrict: 'E',
        templateUrl: '../templates/posts-front-page.html',
        controller: function(itemsService) {
          itemsService.getTop10( (data) => {
            this.posts = data;
          });
        },
        controllerAs: postsFrontPage
      }
})