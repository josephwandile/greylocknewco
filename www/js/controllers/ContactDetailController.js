var ContactDetailController = angular.module('ContactDetailController', []);

ContactDetailController.controller('ContactDetailCtrl', ['$scope', 'ParseService', '$stateParams', function($scope, ParseService, $stateParams) {
    console.log('Controller Activated');

    var avatarColors = [
        "positive-bg",
        "calm-bg",
        "balanced-bg",
        "assertive-bg",
        "royal-bg"
    ];

    var now = new Date();

    // Updates 'last viewed' on database
    ParseService.updateContact($stateParams.contactId, {
        'last_viewed': ParseService.createDate(now)
    });

    // get only the questions specific to this person's profile
    $scope.questions = ParseService.getQuestionsSpecific([5, 7, 8, 9, 10]);
    $scope.input = {};

    var getContactPromise = ParseService.getContact($stateParams.contactId);
    getContactPromise.success(function(contact) {
        $scope.contact = contact;

        var avatarIndex = Math.floor(Math.random() * avatarColors.length);
        contact.avatarText = contact.first_name.charAt(0) + contact.last_name.charAt(0);
        contact.avatarColor = avatarColors[avatarIndex];

        if (contact.data) {
            $scope.input = JSON.parse(contact.data);
        }

        var getMeetingsPromise = ParseService.getMeetingsForContactId($stateParams.contactId);
        getMeetingsPromise.success(function(data) {
            $scope.meetings = data.results.map(function(meeting) {
                return meeting;
            });
        });
    }).error(function(data) {
        console.log(data.error);
    });
}]);
