'use strict';

var AddController = angular.module('AddController', []);

AddController.controller('AddCtrl', ['$scope', '$location', 'ParseService', 'AccountFactory', function($scope, $location, ParseService, AccountFactory) {

  $scope.min = 0;
  $scope.max = 3;
  $scope.input = {};

  $scope.submitForm = function() {

    // var contacts = [];

    var payload = ParseService.trimPayload($scope.input);

    var first_name = payload['first_name'];
    var last_name = payload['last_name'];
    var location = payload['location'];

    var met_at = $scope.input['met_at'];
    var type = payload['type'].toUpperCase();

    var current_contact_id = '';
    var current_email = '';

    AccountFactory.user.$loaded().then(() => {

      let key = first_name + ' ' + last_name;
      let curUser = AccountFactory.user;

      if (typeof curUser.contacts !== 'object') {

        // First time adding contacts
        curUser.contacts = {}

        curUser.contacts[key] = {
          first_name: first_name,0o9p0-p9o
          last_name: last_name
        };

        AccountFactory.user.$save().then((ref) => {

          // TODO reroute
        });
      } else {

        // Has contacts already; check for possible duplicate
        let existingContacts = curUser.contacts;
        if (contacts.hasOwnProperty(key)) {
          console.log('Contact already exists.');
        } else {
          console.log('New contact.');
        }
      }
    });

    //
    // var authPromise = ParseService.getAllContacts();
    //
    // authPromise.success(function(data) {
    //
    //     // Used to check if current entry already exists as contact
    //     var contacts = data.results;
    //
    //     var first_name = payload['first_name'];
    //     var last_name = payload['last_name'];
    //     var location = payload['location'];
    //
    //     // Parsing data correctly; this should never be an empty string
    //     var met_at = $scope.input['met_at'];
    //     var type = payload['type'].toUpperCase();
    //
    //     var matches = false;
    //     var current_contact_id = '';
    //     var current_email = '';
    //
    //     // Searching to see if contact already exists
    //     for (var i = 0; i < contacts.length; i++) {
    //         if (contacts[i].first_name === first_name && contacts[i].last_name === last_name) {
    //             matches = true;
    //             current_contact_id = contacts[i].objectId;
    //             current_email = contacts[i].email;
    //         };
    //     };
    //
    //     // New contact
    //     if (matches === false) {
    //
    //         var authPromise = ParseService.createContact({
    //             'first_name': first_name,
    //             'last_name': last_name
    //         });
    //         authPromise.success(function(data) {
    //
    //             // Save current contact ID
    //             var current_contact_id = data.objectId;
    //
    //             // Creating meeting to be updated later
    //             var authPromise = ParseService.createMeeting({
    //                 'contact': {
    //                     __type: 'Pointer',
    //                     className: "contact",
    //                     // Adding meeting with new user's ID
    //                     objectId: data.objectId
    //                 },
    //                 'met_at': ParseService.createDate(met_at),
    //                 'type': type,
    //                 'location': location
    //             }).success(function(data) {
    //
    //                 // Added meeting
    //                 ParseService.current_meeting_id = data.objectId;
    //
    //                 // Go to profile questions; meeting will be updated later
    //                 $location.path('tab/add/profile/' + current_contact_id + '/' + data.objectId);
    //             }).error(function(data, status) {
    //                 console.log(status);
    //             });
    //
    //         }).error(function(data, status) {
    //             console.log(status);
    //         });
    //     } else {
    //         // Contact already exists
    //         ParseService.current_contact_id = current_contact_id;
    //
    //         var authPromise = ParseService.createMeeting({
    //             'contact': {
    //                 __type: 'Pointer',
    //                 className: "contact",
    //                 objectId: current_contact_id
    //             },
    //             'met_at': ParseService.createDate(met_at),
    //             'type': type,
    //             'location': location
    //         }).success(function(data) {
    //             var actionItemDate = met_at.getTime() + 60 * 60 * 24 * 1000;
    //             var newDate = new Date(actionItemDate);
    //             var newActionItemData = {
    //                 date: ParseService.createDate(newDate),
    //                 type: "REMINDER",
    //                 text: "You met " + payload['first_name'] + " yesterday - send a follow up!",
    //                 link: "mailto:" + current_email,
    //                 contact: {
    //                     "__type": "Pointer",
    //                     "className": "contact",
    //                     "objectId": current_contact_id
    //                 }
    //             };
    //             var createActionItemPromise = ParseService.createActionItem(newActionItemData);
    //             createActionItemPromise.success(function(data) {
    //                 console.log("action item created with id=" + data.objectId);
    //             }).error(function(data, status, config, headers) {
    //                 console.log(headers);
    //             });
    //             // Added meeting
    //             ParseService.current_meeting_id = data.objectId;
    //
    //             // Update meeting here
    //             $location.path('tab/add/meeting/' + data.objectId);
    //
    //         }).error(function(data, status, config, headers) {
    //             console.log(status)
    //         });
    //     }
    //
    // }).error(function() {
    //     // Couldn't retrieve contacts
    //     console.log(status);
    // });
  };
}]);
