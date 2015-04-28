angular.module('TimeCoordinator.Availability',[])
.controller('AvailabilityController',['Avail', '$scope', '$stateParams', function(Avail, $scope, $stateParams) {
  $scope.availability = Avail.query({meetingid: $stateParams.id});
  
  $scope.newavailability = new Avail();
  $scope.saveAvail = function() {
    $scope.newavailability.$save({meetingid: $stateParams.id});
  };
  
}]);