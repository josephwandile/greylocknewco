var AddProfileController = angular.module('AddProfileController', []);

AddProfileController.controller('AddProfileCtrl', ['$scope', 'ParseService', '$location', function($scope, ParseService, $location) {
    console.log('Controller Activated');

    console.log('Currently updating profile of user ID: ', ParseService.current_contact_id);
    var current_contact_id = ParseService.current_contact_id;

    $scope.questions = ParseService.getQuestions(4, 11);
    $scope.input = {};

    $scope.submitForm = function() {

        // === Standard Payload ===
        var payload = ParseService.sanitizePayload($scope.input);

        // === Action Items ===
        // Articles
        var work_field = payload['work_field'];
        var hobbies = payload['hobbies'];

        // Location reminders
        var travel_plans = payload['travel_plans'];

        ParseService.parseDateAction(travel_plans).done(function(data) {
        	debugger;
        }).fail(function(data, status) {
        	console.log(status);
        })

        // === Ajax Request ===
        var authPromise = ParseService.updateContact(current_contact_id, {
            'data': JSON.stringify(payload),

            // Remaining Columns
            'email': payload['email'],
            'phone': payload['phone'],
            'position': payload['position'],
            'company': payload['current_work']
        });

        authPromise.success(function(data) {

            // Profile created; now add meeting details
            $location.path('tab/add/meeting');

        }).error(function(data, status) {
            console.log(status);
        });
    };
}]);
