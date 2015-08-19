angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http, mvNotifier, mvIdentity, mvAuth) {
    $scope.identity = mvIdentity;
    $scope.signin = function(username, password) {
        mvAuth.authenticateUser(username, password)
            .then(function(success) {
                if (success) {
                    mvNotifier.notify('You have successfully signed in.');
                } else {
                    mvNotifier.notify('Username/Password combination incorrect.');
                }
            });
    };
});
