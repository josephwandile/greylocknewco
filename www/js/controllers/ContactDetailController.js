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

    var now = Date.now();

    // Updates 'last viewed' on databse
    ParseService.updateContact($stateParams.contactId, {
        'last_viewed': ParseService.createDate(now);
    });

    var getContactPromise = ParseService.getContact($stateParams.contactId);
    getContactPromise.success(function(contact) {
        var avatarIndex = Math.floor(Math.random() * avatarColors.length);
        contact.avatarText = contact.first_name.charAt(0) + contact.last_name.charAt(0);
        contact.avatarColor = avatarColors[avatarIndex];
        $scope.contact = contact;
        var getMeetingsPromise = ParseService.getMeetingsForContactId($stateParams.contactId);
        getMeetingsPromise.success(function(data) {
            $scope.meetings = data.results.map(function(meeting) {
                if (meeting.met_at) {
                    var date = new Date(meeting.met_at.iso)
                    meeting.date_formatted = date.getMonth() + "." + date.getDay() + "." + date.getFullYear();
                } else {
                    meeting.data_formatted = "";
                }
                return meeting;
            });
        });
    }).error(function(data) {
        console.log(data.error);
    });
}]);