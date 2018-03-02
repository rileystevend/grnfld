 angular.module('app')
.service('commentsService', function ($http) {
  this.submitNewComment = function (newCommentObj, callback) {
    $http.post('/createComment', newCommentObj)
      .then(function (data) {
        if (callback) {
          callback(data);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };
});