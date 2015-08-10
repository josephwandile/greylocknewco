var ContactsController = angular.module('ContactsController', []);

ContactsController.filter('fancify', function() {
  // makes contacts prettier (adds an avatar bubble, for instance)
  var avatarColors = [
    "positive-bg",
    "calm-bg",
    "balanced-bg",
    "assertive-bg",
    "royal-bg"
  ];
  return function(input) {
    for (var i = 0; i < input.length; i++) {
      var contact = input[i];
      // add a random color for their avatar (hash on their id)
      var avatarIndex = contact.$id.charCodeAt(0) % avatarColors.length;
      contact.avatarColor = avatarColors[avatarIndex];

      // generate their avatar text: their first initials
      var firstInitial = contact.first_name ? contact.first_name.charAt(0) : "";
      var lastInitial = contact.last_name ? contact.last_name.charAt(0) : "";
      var initials = firstInitial + lastInitial;
      contact.avatarText = initials.toUpperCase();
    }
    return input;
  };
})

ContactsController.controller('ContactsCtrl', ['$scope', 'ParseService', '$location', '$rootScope',
  function($scope, ParseService, $location, $rootScope) {
    console.log('Contacts Controller Activated');
  }
]);
