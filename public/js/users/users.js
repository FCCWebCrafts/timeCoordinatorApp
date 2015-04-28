angular.module('TimeCoordinator.Users', [])
.controller('UserController', ['$scope', '$rootScope', 'ActiveUser', function($scope, $rootScope, ActiveUser) {
  var user = $rootScope.user;
  $scope.user = ActiveUser.get({user_id: user});
}]);
