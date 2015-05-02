var commonApp = angular.module('commonApp', ['ngRoute', 'ui.bootstrap', 'hljs', 'ui.codemirror', 'ngClipboard']);

commonApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/posts/:_id', {
    controller: 'ViewPostCtrl',
    templateUrl: '/common/routes/view-post/view-post.html'
  }).when('/', {
    controller: 'DashboardCtrl',
    templateUrl: '/common/routes/dashboard/dashboard.html'
  }).otherwise({
    redirectTo: '/'
  })

}]);

