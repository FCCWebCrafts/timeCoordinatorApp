angular.module('TimeCoordinator.Availability')
.factory('Avail', ['$resource', function($resource){
  return $resource('/api/meetings/:meetingid/availability/:availabilityid', {id: '@_id'}, {
    update: {method: 'PUT'}
  });
}]);