var MeetingDetailController = angular.module('MeetingDetailController', []);

MeetingDetailController.controller('MeetingDetailCtrl', ['$scope', '$stateParams', 'ParseService',
    function($scope, $stateParams, ParseService) {
        console.log('Controller Activated');

        // get only the questions specific to this meeting
        $scope.questions = ParseService.getQuestions(50, 59);
        $scope.input = {};

        $scope.save = function() {

            // === Standard Payload ===
            var payload = ParseService.sanitizePayload($scope.input);

            // === AJAX Request
            var authPromise = ParseService.updateMeeting($stateParams.meetingId, {
                'data': JSON.stringify(payload)
            });

            authPromise.success(function(data) {

            }).error(function(data, status, config, headers) {
                console.log(status);
            });
        };

        var meetingId = $stateParams.meetingId;
        var authPromise = ParseService.getMeeting(meetingId);
        authPromise.success(function(meeting) {
            if (meeting.data) {
                $scope.input = JSON.parse(meeting.data);
            }
        }).error(function(data, status) {
            console.log(status);
        });

    }
]);