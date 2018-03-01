angular.module('app')
.service('commentService', function ($http) {
  this.submitNewComment = function (newPostObj, callback) {
    $http.post('/createComment', newPostObj)
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