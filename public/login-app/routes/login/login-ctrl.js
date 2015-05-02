
loginApp.controller('LoginCtrl', function ($scope, $http, $window) {

  $scope.login = function (user) {
    $http.post('/login', user).success(function (data) {
      if(data.success == true) {
        $window.location = '/';
      }
    })
  }


})