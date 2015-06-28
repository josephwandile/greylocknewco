// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var newco = angular.module('newco', [
    // Other Dependencies
    'ionic',

    // Controllers
    'ContactsController',
    'FeedController',
    'ContactDetailController',
    'MeetingDetailController',
    'AddController',
    'AddProfileController',
    'AddMeetingController',

    // Services
    'ParseFactory'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.feed', {
    url: '/feed',
    views: {
      'tab-feed': {
        templateUrl: 'templates/tab-feed.html',
        controller: 'FeedCtrl'
      }
    }
  })

  .state('tab.contacts', {
      url: '/contacts',
      views: {
        'tab-contacts': {
          templateUrl: 'templates/tab-contacts.html',
          controller: 'ContactsCtrl'
        }
      }
    })
    .state('tab.contact-detail', {
      url: '/contacts/:contactId',
      views: {
        'tab-contacts': {
          templateUrl: 'templates/contact-detail.html',
          controller: 'ContactDetailCtrl'
        }
      }
    })
    .state('tab.meeting-detail', {
      url: '/meetings/:meetingId',
      views: {
        'tab-meetings': {
          templateUrl: 'templates/meeting-detail.html',
          controller: 'MeetingDetailCtrl'
        }
      }
    })

  .state('tab.add', {
    url: '/add',
    views: {
      'tab-add': {
        templateUrl: 'templates/tab-add.html',
        controller: 'AddCtrl'
      }
    }
  })
  .state('tab.add-profile', {
    url: '/add/profile',
    views: {
      'tab-add-profile': {
        templateUrl: 'templates/add-profile.html',
        controller: 'AddProfileCtrl'
      }
    }
  })
  .state('tab.add-meeting', {
    url: '/add/meeting',
    views: {
      'tab-add-meeting': {
        templateUrl: 'templates/add-meeting.html',
        controller: 'AddMeetingCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/feed');

});
