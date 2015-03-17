angular.module('timeApp.UserController', [])
.controller('timeApp.UserController', function($resource, User) {
  User.query(function(data) {
    $scope.users = data;
  });
});