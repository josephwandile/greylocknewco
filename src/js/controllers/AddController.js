'use strict';

// TODO Abstract out logic for creating meetings, and so on.

let AddController = angular.module('AddController', []);

AddController.controller('AddCtrl', ['$scope', '$location', 'ParseService', 'AccountFactory', function($scope, $location, ParseService, AccountFactory) {

  $scope.min = 0;
  $scope.max = 3;
  $scope.input = {};

  $scope.submitForm = function() {

    // let contacts = [];

    let payload = ParseService.trimPayload($scope.input);

    let firstName = payload.first_name;
    let lastName = payload.last_name;
    let location = payload.location;

    let metAt = $scope.input.met_at;
    let type = payload.type.toUpperCase();

    let current_contact_id = '';
    let current_email = '';

    AccountFactory.user.$loaded().then(() => {

      let key = firstName + ' ' + lastName;
      let curUser = AccountFactory.user;

      if (typeof curUser.contacts !== 'object') {

        // First time adding contacts
        curUser.contacts = {};



        curUser.contacts[key] = {
          first_name: firstName,
          last_name: lastName
        };

        AccountFactory.user.$save().then((ref) => {

          // TODO reroute to profile editing view.
        });
      } else {

        // Has contacts already
        let existingContacts = curUser.contacts;

        // Check for possible duplicate
        if (existingContacts.hasOwnProperty(key)) {

          // Updating existing contact; add meeting
          // TODO add new property. Don't redefine.
          curUser.contacts[key].meetings = {
            otherTest: {
              met_at: metAt,
              type: type,
              location: location
            }
          };

          AccountFactory.user.$save().then((ref) => {

            // TODO route direcly to meeting view

            // // Added meeting
            // ParseService.current_meeting_id = data.objectId;
            //
            // // Update meeting here
            // $location.path('tab/add/meeting/' + data.objectId);
          });


        } else {

          // New contact
          curUser.contacts[key] = {
            first_name: firstName,
            last_name: lastName
          };

          AccountFactory.user.$save().then((ref) => {

            // TODO use unique IDs for the creation of meetings
            // TODO add new property. Don't redefine.
            curUser.contacts[key].meetings = {
              test: {
                met_at: metAt,
                type: type,
                location: location
              }
            }

            AccountFactory.user.$save().then((ref) => {

              // TODO reroute to profile creation view
            });
          });
        }
      }
    });

    //             let actionItemDate = met_at.getTime() + 60 * 60 * 24 * 1000;
    //             let newDate = new Date(actionItemDate);
    //             let newActionItemData = {
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


    //             let createActionItemPromise = ParseService.createActionItem(newActionItemData);
    //             createActionItemPromise.success(function(data) {
    //                 console.log("action item created with id=" + data.objectId);
    //             }).error(function(data, status, config, headers) {
    //                 console.log(headers);
    //             });
  };
}]);
