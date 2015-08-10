var ParseFactory = angular.module('ParseFactory', ['firebase'])

ParseFactory.factory('ParseService', ['$http', 'PARSE_CREDENTIALS', '$q',
        '$rootScope', '$firebaseArray',
        function($http, PARSE_CREDENTIALS, $q, $rootScope, $firebaseArray) {

    let firebaseRoot = 'https://201gc.firebaseio.com';

    // contacts
    let contactRef = new Firebase(firebaseRoot + '/contacts');
    $rootScope.contacts = $firebaseArray(contactRef);







    var ref = new Firebase(firebaseRoot + '/questions');














    var ParseService = {};

    ParseService.getQuestions = function(min, max) {
        var deferred = $q.defer();

        ref.on("value", function(response) {

            var data = response.val();

            var questions = [];

            for (var key in data) {
                questions.push(data[key]);
            }

            deferred.resolve(questions.slice(min,max+1));

        }, function(errorObject) {
            deferred.reject(errorObject.code);
        });

        return deferred.promise;
    };

    // returns all questions whose ids in the question dictionary are
    // in the given list.
    // ParseService.getQuestionsSpecific = function(allowed) {
    //     return questions.filter(function(question) {
    //         return allowed.indexOf(question.id) > -1;
    //     });
    // };

    // === Form Sanitization
    ParseService.sanitizePayload = function(payload) {
        for (var prop in payload) {
            if (payload[prop] !== '') {
                if (typeof payload[prop] === 'string') {
                    payload[prop] = payload[prop].trim();
                }
            } else {
                console.log(prop, 'not filled out.');
            }
        }
        return payload;
    };

    // === Current Session Data
    ParseService.current_contact_id = '';

    ParseService.current_meeting_id = '';

    // === WIT.AI
    ParseService.getDateAction = function(msg) {
        return $.ajax({
            url: 'https://api.wit.ai/message?v=20150628',
            data: {
                'q': msg,
                'access_token': 'W4Y5MH4L2BAYD7KSPZIXQUUPRMV5AP5Y'
            },
            dataType: 'jsonp',
            method: 'GET'
        });
    };
    ParseService.parseDateActionEntities = function(obj) {
        return obj.outcomes[0].entities;
    };
    ParseService.parseDateActionDate = function(obj) {
        var dateStr = obj.outcomes[0].entities.datetime[0].value;
        var date = new Date(dateStr);
        return {
            "__type": "Date",
            "iso": date.toISOString()
        };
    };

    ParseService.createDate = function(date) {
        return {
            "__type": "Date",
            "iso": date.toISOString()
        };
    };

    // === AJAX
    ParseService.getAllContacts = function() {
        return $http.get('https://api.parse.com/1/classes/contact', {
            headers: {
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
            }
        });
    };
    ParseService.createContact = function(data) {
        return $http.post('https://api.parse.com/1/classes/contact', data, {
            headers: {
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                'Content-Type': 'application/json'
            }
        });
    };
    ParseService.getContact = function(id) {
        return $http.get('https://api.parse.com/1/classes/contact/' + id, {
            headers: {
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY
            }
        });
    };
    ParseService.updateContact = function(id, data) {
        return $http.put('https://api.parse.com/1/classes/contact/' + id, data, {
            headers: {
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                'Content-Type': 'application/json'
            }
        });
    };
    ParseService.deleteContact = function(id) {
        return $http.delete('https://api.parse.com/1/classes/contact/' + id, {
            headers: {
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                'Content-Type': 'application/json'
            }
        });
    };

    ParseService.getAllMeetings = function() {
        return $http.get('https://api.parse.com/1/classes/meeting', {
            headers: {
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
            }
        });
    };
    ParseService.getMeetingsForContactId = function(contactId) {
        return $http.get('https://api.parse.com/1/classes/meeting/', {
            params: {
                where: {
                    "contact": {
                        "__type": "Pointer",
                        "className": "contact",
                        "objectId": contactId
                    }
                },
            },
            headers: {
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY
            }
        });
    };
    ParseService.createMeeting = function(data) {
        return $http.post('https://api.parse.com/1/classes/meeting', data, {
            headers: {
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                'Content-Type': 'application/json'
            }
        });
    };
    ParseService.getMeeting = function(id) {
        return $http.get('https://api.parse.com/1/classes/meeting/' + id, {
            headers: {
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY
            }
        });
    };
    ParseService.updateMeeting = function(id, data) {
        return $http.put('https://api.parse.com/1/classes/meeting/' + id, data, {
            headers: {
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                'Content-Type': 'application/json'
            }
        });
    };
    ParseService.deleteMeeting = function(id) {
        return $http.delete('https://api.parse.com/1/classes/meeting/' + id, {
            headers: {
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                'Content-Type': 'application/json'
            }
        });
    };

    ParseService.getAllActionItems = function() {
        return $http.get('https://api.parse.com/1/classes/action_item?include=contact', {
            headers: {
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY
            },
            params: {
                order: "-date"
            }
        });
    };
    ParseService.createActionItem = function(data) {
        return $http.post('https://api.parse.com/1/classes/action_item', data, {
            headers: {
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                'Content-Type': 'application/json'
            }
        });
    };
    ParseService.getActionItem = function(id) {
        return $http.get('https://api.parse.com/1/classes/action_item/' + id, {
            headers: {
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY
            }
        });
    };
    ParseService.getActionItemByContactId = function(contactId) {
        return $http.get('https://api.parse.com/1/classes/action_item/', {
            params: {
                where: {
                    "contact": {
                        "__type": "Pointer",
                        "className": "contact",
                        "objectId": contactId
                    }
                },
            },
            headers: {
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY
            }
        });
    };
    ParseService.updateActionItem = function(id, data) {
        return $http.put('https://api.parse.com/1/classes/action_item/' + id, data, {
            headers: {
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                'Content-Type': 'application/json'
            }
        });
    };
    ParseService.deleteActionItem = function(id) {
        return $http.delete('https://api.parse.com/1/classes/action_item/' + id, {
            headers: {
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                'Content-Type': 'application/json'
            }
        });
    };

    // === REMINDERS TO STAY IN TOUCH
    ParseService.addEmailReminderActions = function() {
        let _this = this;

        var authPromise = _this.getAllContacts();

        authPromise.success(function(data) {
            var contacts = data.results;

            var now = new Date();

            _.each(contacts, function(contact) {
                if (contact.hasOwnProperty('last_viewed')) {
                    var last_viewed = new Date(contact.last_viewed.iso);
                    var time_passed = now.getTime() - last_viewed.getTime();
                    var days_since = Math.floor(time_passed / (24 * 60 * 60 * 1000));
                    if (days_since >= 21) {
                        (function(contact, days_since) {
                            _this.getActionItemByContactId(contact.objectId).success(function(data) {
                                if (data.results.length === 0) {

                                    _this.createActionItem({
                                        'contact': {
                                            __type: 'Pointer',
                                            className: "contact",
                                            objectId: contact.objectId
                                        },
                                        'date': _this.createDate(now),
                                        'type': 'REMINDER',
                                        'link': 'mailto:' + contact.email,
                                        'text': 'You haven\'t reached out to ' + contact.first_name + ' in ' + days_since + ' days.' + '\nMaybe shoot them an email?'
                                    }).success(function(date) {
                                        console.log('Email reminder added');
                                    }).error(function(data, status) {
                                        console.log(status);
                                    });

                                }
                            }).error(function(data, status) {
                                console.log(status);
                            });
                        })(contact, days_since);
                    }
                }
            });

        }).error(function(data, status) {
            console.log('Unable to set email reminders: ', status);
        });
    };

    return ParseService;

}]).value('PARSE_CREDENTIALS', {
    APP_ID: 'VurVg5WSqG0AH9ui3Avf8wEBJxLEUZ1FgdvxXeKL',
    REST_API_KEY: 'sThhgc4cHiS5yJEN5tjwYQRT3HhlyvnkAfuOwO5R'
});
