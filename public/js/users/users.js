angular.module('TimeCoordinator.Users', [])
.controller('UserController', ['$scope', 'ActiveUser', function($scope, ActiveUser) {
  var activeuser = window.user;
  console.log(window.user);
  $scope.user = ActiveUser.get({user_id: activeuser});
}]);
