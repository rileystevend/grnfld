angular.module('app')
.controller('MainCtrl', function (postsService, $rootScope){
	this.comments = [{text: 'hey first comment!'}, {text: 'hey second comment!'}]
  	postsService.getAll(data => {
      console.log(data);
      this.posts = data;
  	});

  this.handlePostClick = (clickedvalue) => {
    this.currentPost = this.posts[clickedvalue];
    postsService.getComments(this.currentPost.post_id, (data) => {
      console.log(data);
      this.comments = data;
    })
  };
})
