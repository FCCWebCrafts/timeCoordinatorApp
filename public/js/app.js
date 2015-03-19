angular.module('timeApp', [])

.controller('UserController', function($scope, $http){
  $http.get('/profile/user')
  .success(function(data, status, header, config){
    $scope.user = data;
    $scope.error = '';
  })
  .error(function(data, status, header, config){
    $scope.user = '';
    $scope.error = data;
  })
})


