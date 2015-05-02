angular.module('TimeCoordinator.Auth', [])
.controller('LoginController', ['$scope', '$state', 'AuthService', function($scope, $state, AuthService){
  $scope.buttonText = 'Login';
  $scope.login = function() {
    $scope.buttonText = 'Logging In...';
    AuthService.login($scope.credentials.email, $scope.credentials.password).then(function(data) {
      $state.go('upcomingmeetings');
    }, function(err) {
      $scope.invalidLogin = true;
    }).finally(function() {
      $scope.buttonText = 'Login';
    });
  };
}])
.controller('SignupController', ['$scope', '$state', 'AuthService', function($scope, $state, AuthService){
  $scope.buttonText = 'Signup';
  
  $scope.signUp = function() {
    $scope.buttonText = 'Signing up...';
    AuthService.signUp($scope.credentials.email, $scope.credentials.password, $scope.credentials.name).then(function(data) {
      $state.go('upcomingmeetings');
    }, function(err) {
      $scope.invalidLogin = true;
    }).finally(function() {
      $scope.buttonText = 'Sign Up';
    });
  };
}])

.controller('LogoutController', ['$rootScope', '$state', 'AuthService', function($rootScope, $state, AuthService){
  $rootScope.logOut = function(){
    AuthService.logout();
  };
}]);

