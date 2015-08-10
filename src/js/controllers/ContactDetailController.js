var ContactDetailController = angular.module('ContactDetailController', []);

ContactDetailController.controller('ContactDetailCtrl', [
  '$scope', 'ParseService', '$stateParams', '$rootScope', 'UtilsFactory',
  function($scope, ParseService, $stateParams, $rootScope, UtilsFactory) {
    console.log('Contact Detail Controller Activated');


    // var now = new Date();
    //
    // // Updates 'last viewed' on database
    // ParseService.updateContact($stateParams.contactId, {
    //     'last_viewed': ParseService.createDate(now)
    // });

    // get only the questions specific to this person's profile
    // $scope.questions = ParseService.getQuestionsSpecific([5, 7, 8, 9, 10]);
    $scope.question = [];
    $scope.input = {};

    // DEPRECATED
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
                    console.log($stateParams.contactId, 'updated');
                  }).error(function(data, status, config, header) {
                    console.log(status);
                  });
                };

    $scope.contacts.$loaded().then((contacts) => {
      $scope.contact = contacts.$getRecord($stateParams.contactId);
      let contact = $scope.contact;

      contact.avatarColor = UtilsFactory.getAvatarColor(contact);
      contact.avatarText = UtilsFactory.getAvatarText(contact);

      if (contact.data) {
        $scope.input = JSON.parse(contact.data);
      }

      // remove empty items
      _.each($scope.questions, function(question) {
        question.items = _.filter(question.items, function(item) {
          return $scope.input[item.field] !== "";
        });
      });

      var getMeetingsPromise = ParseService.getMeetingsForContactId($stateParams.contactId);
      getMeetingsPromise.success(function(data) {
        $scope.meetings = data.results.map(function(meeting) {
          return meeting;
        });
      });
    });

  }
]);
