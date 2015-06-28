var ContactDetailController = angular.module('ContactDetailController', []);

ContactDetailController.controller('ContactDetailCtrl', ['$scope', 'ParseService', function($scope, ParseService) {
  console.log('Controller Activated');

  var avatarColors = [
        "positive-bg",
        "calm-bg",
        "balanced-bg",
        "assertive-bg",
        "royal-bg"
    ];

    var getContactPromise = ParseService.getContact("qsbGTjQI3I");

    getContactPromise.success(function(contact) {
        var avatarIndex = Math.floor(Math.random() * avatarColors.length);
        contact.avatarText = contact.first_name.charAt(0) + contact.last_name.charAt(0);
        contact.avatarColor = avatarColors[avatarIndex];
        $scope.contact = contact;
        var getMeetingsPromise = ParseService.getMeetingsForContactId(contact.objectId);
        getMeetingsPromise.success(function(data) {
            $scope.meetings = data.results.map(function(meeting) {
                var date = new Date(meeting.met_at.iso)
                meeting.date_formatted = date.getMonth() + "." + date.getDay() + "." + date.getFullYear();
                if (meeting.type === "RECRUITING") {
                    meeting.recruiting = true;
                }
                return meeting;
            });
        });
    }).error(function(data) {
        console.log(data.error);
    });
}]);