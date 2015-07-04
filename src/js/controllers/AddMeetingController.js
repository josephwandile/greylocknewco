var AddMeetingController = angular.module('AddMeetingController', []);

AddMeetingController.controller('AddMeetingCtrl', ['$scope', '$location', 'ParseService', '$stateParams', function($scope, $location, ParseService, $stateParams) {
    console.log('Controller Activated');

    console.log('Currently updating meeting with ID ', $stateParams.meetingId);

    // Which segment of questions to display
    $scope.min = 12;
    $scope.max = 21;

    // User's responses
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
            console.log(status);
        });
    };
}]);
