angular.module('app')
    .service('itemsService', function($http) {

      //get all posts from endpoint
      this.getAll = function(callback) {
        $http.get('/items')
            .then(function(data) {
              if(callback) {
                callback(data);
              }
            })
            .catch(function(err) {
              console.log(err);
            });
      };

      //get top 10 posts from endpoint
      this.getTop10 = function(callback) {
        $http.get('/top10')
            .then(function(data) {
              if(callback) {
                callback(data);
              }
            })
            .catch(function(err) {
              console.log(err);
            });
      };

      this.submitNewPost = function(newPostObj, callback) {
        $http.post('/createNewPost', newPostObj)
            .then(function(data) {
              if(callback) {
                callback(data);
              }
            })
            .catch(function(err) {
              console.log(err);
            });
      };
    });