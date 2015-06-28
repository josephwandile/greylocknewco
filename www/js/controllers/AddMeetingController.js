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
            // var meetingPromise = ParseService.getMeeting($stateParams.meetingId);
            // meetingPromise.success(function(meeting) {
            //     // console.log(meeting);
            //     var contactPromise = ParseService.getContact(meeting.contact.objectId);
            //     contactPromise.success(function(contact) {
            //         // create action item reminding user to follow up with this person
            //         var actionItemDate = new Date(meeting.met_at.iso).getTime() + 60 * 60 * 24 * 1000;
            //         var newDate = new Date(actionItemDate);
            //         // console.log(contact);
            //         var newActionItemData = {
            //             date: ParseService.createDate(newDate),
            //             type: "REMINDER",
            //             text: "You met " + contact.first_name + " yesterday! Consider following up with an email.",
            //             link: "mailto: + contact.email",
            //             contact: {
            //                 "__type": "Pointer",
            //                 "className": "contact",
            //                 "objectId": meeting.contact.objectId
            //             }
            //         };
            //         var createActionItemPromise = ParseService.createActionItem(newActionItemData);
            //         createActionItemPromise.success(function(data) {
            //             console.log("action item created with id=" + data.objectId);
            //         }).error(function(data, status, config, headers) {
            //             console.log(status);
            //         });
            //     }).error(function(data, status, config, headers) {
            //         console.log(status);
            //     });
            // }).error(function(data, status) {
            //     console.log(status);
            // });


            // Route back to feed
            $location.path('tab/feed');

        }).error(function(data, status, config, headers) {
            console.log(status);
        });
    };
}]);
