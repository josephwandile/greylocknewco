var MeetingDetailController = angular.module('MeetingDetailController', []);

MeetingDetailController.controller('MeetingDetailCtrl', ['$scope', 'ParseService', function($scope, PageService) {
    console.log('Controller Activated');

    var authPromise = PageService.getMeeting(current_meeting_id)

    authPromise.success(function(data) {

    }).error(function(data, status) {
        console.log(status);
    });

}]);