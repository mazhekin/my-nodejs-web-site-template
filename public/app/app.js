angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: '/partials/main', controller: 'mainCtrl'});

});

angular.module('app').controller('mainCtrl', function($scope) {
    alert();
    $scope.myVar = "Hello Angular";
});