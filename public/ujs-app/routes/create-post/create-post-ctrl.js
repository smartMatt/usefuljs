ujsApp.controller('CreatePostCtrl', function ($scope, $http, $routeParams, $location) {

  if($routeParams.postId) {
    $http.get('/posts/' + $routeParams.postId).success(function (data) {
      $scope.post = data;
    })
  } else {
    $scope.post = {
      fields: [
        {
          type: 'code',
          codeType: 'javascript',
          displayOrder: 0
        }
      ],
      tags: [],
      resources: [{}]
    }
  }

  $scope.selectedTags = [];

  $http.get('/post-tags').success(function (data) {
    $scope.tagOptions = [];
    for (var i = 0; i < data.length; i++) {
      $scope.tagOptions.push({active: false, value: data[i]});
    }
  })

  $scope.addField = function (type) {
    var displayOrders = _.pluck($scope.post.fields, 'displayOrder');
    var max = Math.max.apply(null, displayOrders);
    max++;
    if(type == 'code') {
      $scope.post.fields.push({type: type, codeType: 'javascript', displayOrder: max});
    } else {
      $scope.post.fields.push({type: type, displayOrder: max});
    }
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
      $location.url('/posts/' + data._id);
    })
  }

  $scope.checkTag = function (tag) {

    if (!tag) {
      $scope.tagResults = null;
      return;
    }

    var tagResults = [{active: false, value: tag}];

    for (var i = 0; i < $scope.tagOptions.length; i++ ) {
      $scope.tagOptions[i].active = false;
      var index = $scope.tagOptions[i].value.indexOf(tag);
      if(index == 0) {
        tagResults.push($scope.tagOptions[i]);
      }
    }

    tagResults = _.uniq(tagResults);

    $scope.tagResults = tagResults;
  }

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

  $scope.highlightTag = function (data, down) {

    var active = _.findWhere(data, {active: true});

    if(!active) {
      data[0].active = true;
    } else {
      if(down) {
        for (var i = 0; i < data.length; i++) {
          if(data[i].active == true) {
            if(i == data.length -1) {
              data[0].active = true;
              data[data.length - 1].active = false;
              $scope.tagInput = data[0].value;
            } else {
              data[i + 1].active = true;
              data[i].active = false;
              $scope.tagInput = data[i + 1].value;

            }
            break;
          }
        }

      } else {

        for (var i = 0; i < data.length; i++) {
          if(data[i].active == true) {
            if(i == 0) {
              data[0].active = false;
              data[data.length - 1].active = true;
              $scope.tagInput = data[data.length - 1].value;
            } else {
              data[i - 1].active = true;
              data[i].active = false;
              $scope.tagInput = data[i - 1].value;

            }
            break;
          }
        }
      }
    }
  }

  $scope.editorOptions = {
    lineWrapping : true,
    lineNumbers: true,
    mode: 'javascript'
  };

})