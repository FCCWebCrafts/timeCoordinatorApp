var app = angular.module('timeApp', []);

app.controller('MainCtrl', [
'$scope',
function($scope){
  $scope.test = 'Hello world!';
  $scope.notes = [
  	'note 1', 
  	'note 2', 
  	'note 3',
  	'note 4'
  ];
}]);