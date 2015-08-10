var AddProfileController = angular.module('AddProfileController', []);

AddProfileController.controller('AddProfileCtrl',
        ['$scope', 'ParseService', '$location', '$stateParams', '$rootScope',
        function($scope, ParseService, $location, $stateParams, $rootScope) {
    console.log('Controller Activated');

    console.log('Currently updating profile of user ID: ', $stateParams.contactId);
    var current_contact_id = $stateParams.contactId;
    var current_meeting_id = $stateParams.meetingId;

    // Segment of question to display
    $scope.min = 4;
    $scope.max = 11;

    // User's response
    $scope.input = {};

    $scope.submitForm = function() {

        // === Standard Payload ===
        var payload = ParseService.sanitizePayload($scope.input);

        // === Action Items ===
        // Articles
        var work_field = payload['work_field'];
        var hobbies = payload['hobbies'];

        // Location reminders
        var travel_plans = payload['travel_plans'];

        ParseService.getDateAction(travel_plans).done(function(data) {
            var entities = ParseService.parseDateActionEntities(data);
        	var dateObj = ParseService.parseDateActionDate(data);
            var newActionItemData = {
                date: dateObj,
                type: "REMINDER",
                text: travel_plans,
                entities: entities,
                link: "tel:"+payload['phone'],
                contact: {
                    "__type": "Pointer",
                    "className": "contact",
                    "objectId": current_contact_id
                }
            }
            var createPromise = ParseService.createActionItem(newActionItemData);
            createPromise.success(function(data) {
                console.log("Action item made for travel plan " + data.objectId);
            }).error(function(data, status, config, headers) {
                console.log(status);
            });
        }).fail(function(data, status) {
        	console.log(status);
        })

        // Add contact
        console.log("Adding contact");
        $scope.contacts.$add({
          'data': JSON.stringify(payload),

          // Remaining Columns
          'email': payload['email'],
          'phone': payload['phone'],
          'position': payload['position'],
          'company': payload['current_work']
        });
        $location.path('tab/add/meeting/' + current_meeting_id);
    };
}]);
