angular.module('TimeCoordinator.Users', [])

.controller('UserController', ['$scope', '$rootScope', '$modal', '$log', 'ActiveUser', '$cookieStore', function($scope, $rootScope, $modal, $log, ActiveUser, $cookies) {
  //grab user id from cookieStore
  var user_id = $cookies.get('user');
  ActiveUser.get({user_id: user_id}, function(data){
    $scope.user = data;
   
  });
  
  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: 'sm',
      resolve: {
        user: function () {
          return $scope.user;
        }
      }
    });

    modalInstance.result.then(function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
}])

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, user) {
  $scope.user = user;
  
  $scope.addLocal = function (user) {
      $modalInstance.close(user.$post);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});