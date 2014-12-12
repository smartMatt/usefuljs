 var ujsApp = angular.module('ujsApp', ['ngRoute', 'ui.bootstrap', 'hljs', 'ui.codemirror', 'ngClipboard']);


 ujsApp.config(['$routeProvider', function ($routeProvider) {
   $routeProvider.when('/create-post/:postId?', {
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


 ujsApp.config(['ngClipProvider', function(ngClipProvider) {
   ngClipProvider.setPath("bower_components/zeroclipboard/dist/ZeroClipboard.swf");
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
