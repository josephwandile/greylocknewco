var AddMeetingController = angular.module('AddMeetingController', []);

AddMeetingController.controller('AddMeetingCtrl', ['$scope', 'ParseService', function($scope, ParseService) {
    console.log('Controller Activated');

    console.log('Currently adding a meeting to user: ', ParseService.current_contact_id);
    var current_contact_id = ParseService.current_contact_id;

    console.log('Currently updating meeting with ID ', ParseService.current_meeting_id);
    var current_meeting_id = ParseService.current_meeting_id;

    var excited_by = 'My interest in AI';
    var laugh = 'Putin';
    var suggestion = 'Read Paul Graham\'s Essays';
    var suggested_contact = 'Elon Musk';
    var intro = 'Yes';
    var suggest_read = 'Yes';
    var suggested_to_read = 'The Lean Startup';
    var advice = 'Find something you\'re not passionate about';
    var instructions = 'Email me in a week';
    var meeting_note = 'He\'s an atheist';

    var payload = {
        'excited_by': excited_by,
        'laugh': laugh,
        'suggestion': suggestion,
        'suggested_contact': suggested_contact,
        'intro': intro,
        'suggest_read': suggest_read,
        'suggested_to_read': suggested_to_read,
        'advice': advice,
        'instructions': instructions,
        'meeting_note': meeting_note
    }

    debugger;
    var authPromise = ParseService.updateMeeting(current_meeting_id, {
        'data': JSON.stringify(payload)
    })

    authPromise.success(function(data) {
        debugger;

    }).error(function(data, status) {
        console.log(status);
    });

  $scope.questions = ParseService.getQuestions(50, 59);
}]);
