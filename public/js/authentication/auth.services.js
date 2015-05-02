angular.module('TimeCoordinator.Auth')
.factory('AuthService', ['$http', '$cookieStore', function($http, $cookieStore) {
  var auth = {};
  auth.login = function(email, password) {
    return $http.post('/servlogin', {email: email, password: password}).then(function(response, status){
      auth.user = response.data;
      $cookieStore.put('user', auth.user);
      return auth.user;
    });
  };

  auth.signUp = function(email, password, name) {
    return $http.post('/servsignup', {email: email, password: password, name: name}).then(function(response, status) {
      auth.user = response.data;
      $cookieStore.put('user', auth.user);
      return auth.user;
    });
  };

  auth.logout = function(){
    return $http.post('/logout').then(function(response){
      auth.user = undefined;
      $cookieStore.remove('user');
    });
  };
  
  return auth;
}]);