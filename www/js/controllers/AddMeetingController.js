var AddMeetingController = angular.module('AddMeetingController', []);

AddMeetingController.controller('AddMeetingCtrl', ['$scope', 'ParseService', function($scope, ParseService) {
  console.log('Controller Activated');

  console.log('Currently adding a meeting to user: ', ParseService.current_contact_id);

}]);