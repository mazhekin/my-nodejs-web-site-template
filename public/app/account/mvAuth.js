angular.module('app').factory('mvAuth', function($http, mvIdentity, $q) {
    return {
        authenticateUser: function(username, password) {
            var deferred = $q.defer();
            $http.post('/login', {username: username, password: password})
                .then(function(response){
                    if (response.data.success) {
                        mvIdentity.currentUser = response.data.user;
                        deferred.resolve(true);
                    } else {
                        deferred.resolve(false);
                    }
                });
            return deferred.promise;
        },
        logoutUser: function() {
            var deferred = $q.defer();
            $http.post('/logout', {logout: true})
                .then(function() {
                    mvIdentity.currentUser = undefined;
                    deferred.resolve();
                });
            return deferred.promise;
        }
    };
});
