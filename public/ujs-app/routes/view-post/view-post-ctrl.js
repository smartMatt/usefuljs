
ujsApp.controller('ViewPostCtrl', function ($scope, $http, $routeParams) {

  var _id = $routeParams._id;

  $http.get('/posts/' + _id).success(function(data) {
    console.dir(data);
    $scope.post = data;
  })

})