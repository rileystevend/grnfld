angular.module('app')
    .controller('PostsCtrl', function () {
      
    })
    .directive('postsFrontPage', function() {

      return {
        restrict: 'E',
        templateUrl: 'templates/posts-front-page.html',
        // controller: function(itemsService) {
        //   itemsService.getTop10( (data) => {
        //     this.posts = [{title: 'HERES THE FIRST POST'}]/*data*/;
        //   });
        }
        controllerAs: postsFrontPage
      
})