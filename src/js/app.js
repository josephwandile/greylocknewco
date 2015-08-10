// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var newco = angular.module('newco', [
        // Other Dependencies
        'firebase',
        'ionic',
        'monospaced.elastic',
        // Controllers
        'AccountController',
        'ContactsController',
        'FeedController',
        'ContactDetailController',
        'MeetingDetailController',
        'AddController',
        'AddProfileController',
        'AddMeetingController',
        'TabsController',

        // Services
        'ParseFactory',
        'AccountFactory',
        'UtilsFactory',

        // Directives
        'QuestionForm'
    ])
    .run(["$ionicPlatform", "$rootScope", "$state", function($ionicPlatform, $rootScope, $state) {
        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireAuth promise is rejected
            // and redirect the user back to the home page
            console.log(error);
            if (error === "AUTH_REQUIRED") {
                $state.go("tab.account");
            }
        });

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
    }])
    .config(function($stateProvider, $urlRouterProvider) {

        // pass "resolve: loginResolver" in your views to make the views
        // only accessible to logged-in users
        let loginResolver = {
            // controller will not be loaded until $waitForAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            "currentAuth": ["AccountFactory", function(AccountFactory) {
                // $waitForAuth returns a promise so the resolve waits for it to complete
                return AccountFactory.auth.$requireAuth();
            }]
        }


        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        // setup an abstract state for the tabs directive
            .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html",
            controller: 'TabsCtrl'
        })

        // Each tab has its own nav history stack:


        .state('tab.account', {
            url: '/account',
            views: {
                'tab-account': {
                    templateUrl: 'templates/tab-account.html',
                    controller: 'AccountCtrl'
                }
            }
        })

        .state('tab.feed', {
            url: '/feed',
            views: {
                'tab-feed': {
                    templateUrl: 'templates/tab-feed.html',
                    controller: 'FeedCtrl',
                    resolve: loginResolver
                }
            }
        })

        .state('tab.contacts', {
                url: '/contacts',
                views: {
                    'tab-contacts': {
                        templateUrl: 'templates/tab-contacts.html',
                        controller: 'ContactsCtrl',
                        resolve: loginResolver,
                    }
                }
            })
            .state('tab.contact-detail', {
                url: '/contacts/:contactId',
                views: {
                    'tab-contacts': {
                        templateUrl: 'templates/contact-detail.html',
                        controller: 'ContactDetailCtrl',
                        resolve: loginResolver
                    }
                }
            })
            .state('tab.meeting-detail', {
                url: '/meeting/:meetingId',
                views: {
                    'tab-contacts': {
                        templateUrl: 'templates/meeting-detail.html',
                        controller: 'MeetingDetailCtrl',
                        resolve: loginResolver
                    }
                }
            })
            .state('tab.add', {
                url: '/add',
                views: {
                    'tab-add': {
                        templateUrl: 'templates/tab-add.html',
                        controller: 'AddCtrl',
                        resolve: loginResolver
                    }
                }
            })
            .state('tab.add-profile', {
                url: '/add/profile/:contactId/:meetingId',
                views: {
                    'tab-add': {
                        templateUrl: 'templates/add-profile.html',
                        controller: 'AddProfileCtrl',
                        resolve: loginResolver
                    }
                }
            })
            .state('tab.add-meeting', {
                url: '/add/meeting/:meetingId',
                views: {
                    'tab-add': {
                        templateUrl: 'templates/add-meeting.html',
                        controller: 'AddMeetingCtrl',
                        resolve: loginResolver
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/feed');

    });
