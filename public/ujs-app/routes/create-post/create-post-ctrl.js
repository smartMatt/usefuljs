ujsApp.controller('CreatePostCtrl', function ($scope, $http, $routeParams) {

  if($routeParams.postId) {
    console.dir($routeParams.postId);
    $http.get('/posts/' + $routeParams.postId).success(function (data) {
      $scope.post = data;
    })
  } else {
    $scope.post = {
      fields: [
        {
          type: 'header',
          displayOrder: 0
        },
        {
          type: 'text',
          displayOrder: 1
        }
      ],
      tags: [],
      resources: [{}]
    }
  }



  $http.get('/post-tags').success(function (data) {
    $scope.tagOptions = data;
  })

  $scope.addField = function (type) {
    var displayOrders = _.pluck($scope.post.fields, 'displayOrder');
    var max = Math.max.apply(null, displayOrders);
    max++;
    $scope.post.fields.push({type: type, displayOrder: max});
  }

  $scope.removeField = function (field, index) {
    var displayOrder = field.displayOrder;

    $scope.post.fields.splice(index, 1);


    for (var i = 0; i < $scope.post.fields.length; i ++) {
      if ($scope.post.fields[i].displayOrder > displayOrder) {
        $scope.post.fields[i].displayOrder--;
      }
    }
  }

  $scope.orderUp = function (field) {
    var displayOrder = field.displayOrder;

    for (var i = 0; i < $scope.post.fields.length; i ++) {
      if ($scope.post.fields[i].displayOrder == displayOrder) {
        $scope.post.fields[i - 1].displayOrder = displayOrder;
        $scope.post.fields[i].displayOrder = displayOrder - 1;
        break;
      }
    }

  }

  $scope.orderDown = function (field) {
    var displayOrder = field.displayOrder;

    for (var i = 0; i < $scope.post.fields.length; i ++) {
      if ($scope.post.fields[i].displayOrder == displayOrder) {
        $scope.post.fields[i].displayOrder = displayOrder + 1;
        $scope.post.fields[i + 1].displayOrder = displayOrder;
        break;
      }
    }
  }

  $scope.savePost = function (post) {

    var url = '/post';

    if ($routeParams.postId) {
      url += '/edit/' + $routeParams.postId;
    }

    $http.post(url, post).success(function (data) {
      console.dir(data);
    })
  }

  $scope.checkTag = function (tag) {

    if (!tag) {
      $scope.tagResults = null;
      return;
    }

    var tagResults = [tag];

    for (var i = 0; i < $scope.tagOptions.length; i++ ) {
      var index = $scope.tagOptions[i].indexOf(tag);
      if(index != -1) {
        tagResults.push($scope.tagOptions[i]);
      }
    }

    tagResults = _.uniq(tagResults);

    $scope.tagResults = tagResults;
  }

  $scope.selectedTags = [];

  $scope.selectTag = function (tag) {
    var index = $scope.post.tags.indexOf(tag);
    if (index == -1) {
      $scope.post.tags.push(tag);
    }
    $scope.tagInput = "";
    $scope.tagResults = null;
  }

  $scope.removeTag = function (tag) {
    $scope.post.tags = _.reject($scope.post.tags, function (v) {return v == tag});
  }

  $scope.addResource = function () {
    $scope.post.resources.push({});
  }

  $scope.removeResource = function (index) {
    $scope.post.resources.splice(index, 1);
  }


  $scope.editorOptions = {
    lineWrapping : true,
    lineNumbers: true,
    mode: 'javascript'
  };

})