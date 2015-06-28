var ContactDetailController = angular.module('ContactDetailController', []);

ContactDetailController.controller('ContactDetailCtrl', ['$scope', 'ParseService', '$stateParams', '$location', function($scope, ParseService, $stateParams, $location) {
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

    $scope.save = function() {

        // === Standard Payload ===
        var payload = ParseService.sanitizePayload($scope.input);

        // === Ajax Request ===
        var authPromise = ParseService.updateContact($stateParams.contactId, {
            'data': JSON.stringify(payload),

            // Remaining Columns
            'email': payload['email'],
            'phone': payload['phone'],
            'position': payload['position'],
            'company': payload['current_work']
        });

        authPromise.success(function(data) {

            // Profile created; now add meeting details
            $location.path('tab/contacts/');

        }).error(function(data, status, config, header) {
            console.log(status);
        });
    };


    var getContactPromise = ParseService.getContact($stateParams.contactId);
    getContactPromise.success(function(contact) {
        $scope.contact = contact;

        var avatarIndex = Math.floor(Math.random() * avatarColors.length);
        contact.avatarText = contact.first_name.charAt(0) + contact.last_name.charAt(0);
        contact.avatarColor = avatarColors[avatarIndex];

        if (contact.data) {
            $scope.input = JSON.parse(contact.data);
        }

        // remove empty items
        _.each($scope.questions, function(question){
            question.items = _.filter(question.items, function(item){
                return $scope.input[item.field] !== "";
            });
        });

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
