angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser) {
    return {
        authenticateUser: function(username, password) {
            var deferred = $q.defer();
            $http.post('/login', {username: username, password: password})
                .then(function(response){
                    if (response.data.success) {
                        var user = new mvUser();
                        angular.extend(user, response.data.user);
                        mvIdentity.currentUser = user;
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
        },
        authorizeCurrentUserForRoute: function(role) {
            if (mvIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    };
});
