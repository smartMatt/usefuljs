commonApp.directive('postList', function () {

  return {
    templateUrl: '/common/templates/post-list.html',
    transclude: true,
    link: function (scope, elm, attrs, ctrl) {

    },
    controller: function ($scope, $http, $sce) {

      $scope.storedTags = [];

      $scope.pushToStoredTags = function (tag) {
        $scope.storedTags.push(tag);
        $scope.search = ""
      }

      $scope.removeTag = function (index) {
        $scope.storedTags.splice(index, 1);
      }


      $scope.isTagActive = function (tag, search) {
        if(!tag) {
          return
        }

        if (search && (tag.toLowerCase() == search.toLowerCase())) {
          return "active-tag";
        }

        for (var i = 0; i < $scope.storedTags.length; i++) {
          if(tag.toLowerCase() == $scope.storedTags[i].toLowerCase()) {
            return "active-tag";
          }
        }
      }

      $scope.formatPostTitle = function (title, search) {


        if (search) {

          var index = title.toLowerCase().indexOf(search.toLowerCase()),
              returnString = "";

          if (index != -1) {
            for (var i = 0; i < index; i++) {
              returnString += "<span>" + title[i] + "</span>";
            }

            for (var i = 0; i < search.length; i++) {
              returnString += "<span class='active-character'>" + title[index + i] + "</span>";
            }

            for (var i = index + search.length; i < title.length; i++) {
              returnString += "<span>" + title[i] + "</span>";
            }
          } else {
            returnString = title;

          }

        }

        else {
          returnString = title;
        }

        return $sce.trustAsHtml(returnString);
      }
    }
  }

})