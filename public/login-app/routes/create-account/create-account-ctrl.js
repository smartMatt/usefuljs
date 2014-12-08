
loginApp.controller('CreateAccountCtrl', function ($scope, $http) {

  $scope.postUser = function (user) {
    $http.post('/user', user).success(function (data) {
      console.dir(data);
    })
  }


})