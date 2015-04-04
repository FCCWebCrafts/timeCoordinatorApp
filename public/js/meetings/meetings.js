/*jshint devel: true*/
/*globals angular, window*/
angular.module('TimeCoordinator.Meetings', [])
//meeting controller
  .controller('MeetingController', ['$scope', '$state', '$stateParams', 'Meetings', 'popupService', function($scope, $state, $stateParams, Meetings, popupService) {
    //query meetings the backend only allows a user to query meetings they are a member of
  $scope.meetings = Meetings.query();
    
    //delete messages and remove them from the dom
    $scope.deleteMeeting = function(meeting) {
      if(popupService.showPopup('Really delete this?')){
        meeting.$delete(function(){
          for (var i in $scope.meetings) {
            if ($scope.meetings[i] === meeting) {
              $scope.meetings.splice(i, 1);
            }
          }
          $state.go('upcomingmeetings', undefined, {updated: true});
        });
      }
    };
  

    
}])
//single meeting controller
.controller('SingleMeetingController', ['$scope', '$state', '$stateParams', 'Meetings', function($scope, $state, $stateParams, Meetings) {
  //find singlemeetings by id 
  Meetings.get({id: $stateParams.id}, function(data){
    $scope.singlemeeting = data;
    //allows the participants of each meeting to be listed
    $scope.participants = data.participants;
  });
  //activates inline editing
  $scope.editmode = false;
  $scope.toggleEditMode = function(singlemeeting){
    $scope.editmode = $scope.editmode === false ? true: false;
    //update the meeting details when edit mode is toggled to false
      if($scope.editmode === false){
      singlemeeting.$update(function(){
      });
      } else {
        //When editmode is true ngshow date input for the meeting date
      }
    };
  
  
}])

.controller('CreateMeetingController', ['$scope', '$state', 'Meetings', function($scope, $state, Meetings){
  $scope.newmeeting = new Meetings();
  $scope.buttonText = 'Create';
  $scope.saveMeeting = function() {
    $scope.buttonText = 'Saving. . .';
    $scope.newmeeting.$save(function(){
      $state.go('upcomingmeetings');
    });
  };
}])
.controller('UpdateMeetingController', ['$scope', '']);