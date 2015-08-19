angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http) {
    $scope.signin = function(username, password) {
        $http.post('/login', {username: username, password: password})
            .then(function(response){
                if (response.data.success) {
                    window.alert('logged in!');
                } else {
                    window.alert('logged in failed');
                }
            });
    };
});
