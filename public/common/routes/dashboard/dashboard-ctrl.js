commonApp.controller('DashboardCtrl', function ($scope, $http) {

  $http.get('/posts').success(function (posts) {
    $scope.posts = posts;
  })

})