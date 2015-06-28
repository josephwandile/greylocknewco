var AddMeetingController = angular.module('AddMeetingController', []);

AddMeetingController.controller('AddMeetingCtrl', ['$scope', 'ParseService', function($scope, ParseService) {
  console.log('Controller Activated');

  console.log('Currently adding a meeting to user: ', ParseService.current_contact_id);

  console.log('Currently updaing meeting with ID ', ParseService.current_meeting_id);

  $scope.questions = ParseService.getQuestions(50, 59);
}]);
