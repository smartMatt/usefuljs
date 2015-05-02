commonApp.directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
});

commonApp.directive('ngDown', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 40) {
        scope.$apply(function (){
          scope.$eval(attrs.ngDown);
        });

        event.preventDefault();
      }
    });
  };
});

commonApp.directive('ngUp', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 38) {
        scope.$apply(function (){
          scope.$eval(attrs.ngUp);
        });

        event.preventDefault();
      }
    });
  };
});