/*global angular*/
angular.module('TimeCoordinator.Meetings')
  .factory('Meetings', ['$resource', function($resource) {
    return $resource('/api/meetings/:id',{id: '@_id'},{
      update: {method: 'PUT'},
    });
  }]);
