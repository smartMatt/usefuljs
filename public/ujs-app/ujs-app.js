 var ujsApp = angular.module('ujsApp', ['ngRoute', 'ui.bootstrap', 'hljs']);


 ujsApp.config(['$routeProvider', function ($routeProvider) {
   $routeProvider.when('/create-post', {
     controller: 'CreatePostCtrl',
     templateUrl: '/ujs-app/routes/create-post/create-post.html'
   }).when('/', {
     controller: 'DashboardCtrl',
     templateUrl: '/ujs-app/routes/dashboard/dashboard.html'
   }).when('/posts/:_id', {
     controller: 'ViewPostCtrl',
     templateUrl: '/ujs-app/routes/view-post/view-post.html'
   })


 }]);

//ujsApp.run(['$httpProvider', function ($httpProvider) {
//
//  $httpProvider.interceptors.push(function($q) {
//     return {
//       'request': function(config) {
//         // same as above
//       },
//
//       'response': function(response) {
//         // same as above
//         if(response.data.auth) {
//
//           if(response.data.auth == false) {
//             window.location = "/login";
//           }
//         }
//         return response;
//       }
//     };
//  });
//}]);
