var loginApp = angular.module('loginApp', ['ngRoute', 'ui.bootstrap', 'hljs', 'commonApp']);


loginApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/login', {
    controller: 'LoginCtrl',
    templateUrl: '/login-app/routes/login/login.html'
  }).when('/create-account', {
    controller: 'CreateAccountCtrl',
    templateUrl: '/login-app/routes/create-account/create-account.html'
  }).otherwise({
    redirectTo: '/login'
  })



}]);