angular.module('timeApp.UserServices')
.factory('User',['$resource', function($resource) {
  return $resource('/api/user/:Id');
}]);