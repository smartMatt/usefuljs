var loginApp = angular.module('loginApp', ['ngRoute', 'ui.bootstrap', 'hljs']);


loginApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    controller: 'LoginCtrl',
    templateUrl: '/login-app/routes/login/login.html'
  }).when('/create-account', {
    controller: 'CreateAccountCtrl',
    templateUrl: '/login-app/routes/create-account/create-account.html'
  }).when('/posts/:_id', {
    controller: 'ViewPostCtrl',
    templateUrl: '/ujs-app/routes/view-post/view-post.html'
  })


}]);