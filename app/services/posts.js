angular.module('app')
.service('postsService', function ($http) {
  this.getAll = function (callback) {
    $http.get('/posts')
      .then(function ({ data }) {
        callback(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  //get top 10 posts from endpoint
  this.getTop10 = function (callback) {
    $http.get('/top10')
      .then(function (data) {
        if (callback) {
          callback(data);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  this.submitNewPost = function (newPostObj, callback) {
    $http.post('/createPost', newPostObj)
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
