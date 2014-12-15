
ujsApp.controller('ViewPostCtrl', function ($scope, $http, $routeParams) {

  var _id = $routeParams._id;

  $http.get('/posts/' + _id).success(function(data) {
    console.dir(data);
    $scope.post = data;
  });

  $scope.postComment = function (comment) {
    $http.post('/comment/' + _id, {comment: comment}).success(function(data) {
      $scope.post.comments.push(data);
      $scope.comment = "";
    })

  }

  $scope.editorOptions = {
    lineWrapping : true,
    lineNumbers: true,
    readOnly: true,
    mode: 'javascript'
  };

})