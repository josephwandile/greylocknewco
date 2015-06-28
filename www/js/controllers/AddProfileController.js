var AddProfileController = angular.module('AddProfileController', []);

AddProfileController.controller('AddProfileCtrl', ['$scope', 'ParseService', '$location', function($scope, ParseService, $location) {
    console.log('Controller Activated');

    console.log('Currently updating profile of user ID: ', ParseService.current_contact_id);
    var current_contact_id = ParseService.current_contact_id;

    $scope.questions = ParseService.getQuestions(4, 11);
    $scope.input = {};

    $scope.submitForm = function() {

        var payload = $scope.input;

        var authPromise = ParseService.updateContact(current_contact_id, {
            'data': JSON.stringify(payload)
        });

        authPromise.success(function(data) {

        	// Profile created; now add meeting details
        	$location.path('tab/add/meeting');

        }).error(function(data, status) {
            console.log(status);
        });
    };
}]);