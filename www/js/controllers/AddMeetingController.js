var AddMeetingController = angular.module('AddMeetingController', []);

AddMeetingController.controller('AddMeetingCtrl', ['$scope', '$location', 'ParseService', '$stateParams', function($scope, $location, ParseService, $stateParams) {
    console.log('Controller Activated');

    console.log('Currently updating meeting with ID ', $stateParams.meetingId);

    $scope.questions = ParseService.getQuestions(50, 59);
    $scope.input = {};

    $scope.submitForm = function() {

        var payload = ParseService.sanitizePayload($scope.input);

        var authPromise = ParseService.updateMeeting($stateParams.meetingId, {
            'data': JSON.stringify(payload)
        });

        authPromise.success(function(data) {

            // Route back to feed
            $location.path('tab/feed');

        }).error(function(data, status, config, headers) {
            debugger;
            console.log(status);
        });
    };
}]);
