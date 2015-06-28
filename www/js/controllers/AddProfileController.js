var AddProfileController = angular.module('AddProfileController', []);

AddProfileController.controller('AddProfileCtrl', ['$scope', 'ParseService', function($scope, ParseService) {
  console.log('Controller Activated');

  console.log('Currently updating profile of user ID: ', ParseService.current_contact_id)

  $scope.questions = ParseService.getQuestions(4, 11);
}]);
