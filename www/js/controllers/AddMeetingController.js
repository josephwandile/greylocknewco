var AddMeetingController = angular.module('AddMeetingController', []);

AddMeetingController.controller('AddMeetingCtrl', ['$scope', '$location', 'ParseService', function($scope, $location, ParseService) {
    console.log('Controller Activated');

    console.log('Currently updating meeting with ID ', ParseService.current_meeting_id);
    var current_meeting_id = ParseService.current_meeting_id;

    $scope.questions = ParseService.getQuestions(50, 59);
    $scope.input = {};

    $scope.submitForm = function() {

        var payload = ParseService.sanitizePayload($scope.input);

        var authPromise = ParseService.updateMeeting(current_meeting_id, {
            'data': JSON.stringify(payload)
        });

        authPromise.success(function(data) {

            // Route to recently created meeting
            $location.path('tab/meeting/' + current_meeting_id);

        }).error(function(data, status) {
            console.log(status);
        });
    };
}]);
