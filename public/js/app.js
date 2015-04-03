angular.module('TimeCoordinator', [
  'ui.router', 
  'ngResource',
  'TimeCoordinator.Users',
  'TimeCoordinator.Meetings',
  'TimeCoordinator.directives'
])
.run(['$state', function($state) {
  $state.go('upcomingmeetings');
}])

.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $stateProvider
    .state('upcomingmeetings', {
    url: '/meetings',
    templateUrl: '/js/meetings/views/view-meetings.html',
    controller: 'MeetingController',
    params: {
      updated: false
    }
    })
    .state('singlemeeting', {
    url: '/meetings/:id',
    templateUrl: '/js/meetings/views/single-meeting.html',
    controller: 'SingleMeetingController'
    
  })
  .state('createmeetings', {
    url: '/meeting/create',
    templateUrl: '/js/meetings/views/create-meeting.html',
    controller: 'CreateMeetingController'
  });
}]);