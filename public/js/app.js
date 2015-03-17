angular.module('timeApp', ['ngResource'])

  .factory('User',['$resource', function($resource) {
    return $resource('../api/users/');
  }])

  .controller('timeApp.UserController', function($resource, User) {
  User.query(function(data) {
    $scope.user = data.username;
  });
});

