var ParseFactory = angular.module('ParseFactory', [])

ParseFactory.factory('ParseService', ['$http', 'PARSE_CREDENTIALS', function($http, PARSE_CREDENTIALS) {

    // ******** FORM ONE tab-add.html ************
    var questions = [{
        // PROFILE INFO
        id: 0,
        text: 'Who did you meet?',
        items: [{
            field: 'first_name',
            label: 'First Name',
            type: 'text'
        }, {
            field: 'last_name',
            label: 'Last Name',
            type: 'text'
        }]
    }, {
        // MEETING INFO
        id: 1,
        text: 'Where?',
        items: [{
            field: 'location',
            label: 'Location',
            type: 'text'
        }]
    }, {
        id: 2,
        text: 'When?',
        items: [{
            field: 'met_at',
            label: 'Date',
            type: 'date'
        }]
    }, {
        id: 3,
        text: 'What type of meeting was it?',
        items: [{
            field: 'type',
            label: 'Mentorship',
            type: 'radio'
        }, {
            field: 'type',
            label: 'Recruiting',
            type: 'radio'
        }, {
            field: 'type',
            label: 'Networking',
            type: 'radio'
        }, {
            field: 'type',
            label: 'Pitch',
            type: 'radio'
        }]
    }, {
        // ******** FORM 2 add-profile.html *********
        // PROFILE INFO
        id: 4,
        text: 'Where have they worked?',
        items: [{
            field: 'current_work',
            label: 'Currently',
            type: 'text'
        }, {
            field: 'past_work',
            label: 'Previously',
            type: 'text'
        }]
    }, {
        id: 11,
        text: 'What do they do?',
        items: [{
            field: 'position',
            label: 'e.g. Investor, Software Engineer',
            type: 'text'
        }]
    }, {
        id: 5,
        text: 'What are their most significant achievements?',
        items: [{
            field: 'achievements',
            label: 'Achievements',
            type: 'textarea'
        }]
    }, {
        id: 6,
        text: 'What contact information of theirs did you get?',
        items: [{
            field: 'email',
            label: 'Email',
            type: 'email'
        }, {
            field: 'phone',
            label: 'Phone Number',
            type: 'tel'
        }, {
            field: 'profile',
            label: 'LinkedIn or Website',
            type: 'text'
        }]
    }, {
        id: 7,
        text: 'What sector do they work in?',
        items: [{
            field: 'work_field',
            label: 'FinTech',
            type: 'checkbox'
        }, {
            field: 'work_field',
            label: 'Biotech/Health Tech',
            type: 'checkbox'
        }, {
            field: 'work_field',
            label: 'VC/Angel',
            type: 'checkbox'
        }, {
            field: 'work_field',
            label: 'Consumer Tech',
            type: 'checkbox'
        }, {
            field: 'work_field',
            label: 'SaaS/Enterprise',
            type: 'checkbox'
        }]
    }, {
        id: 8,
        text: 'Did they mention any hobbies?',
        items: [{
            field: 'hobbies',
            label: 'These are great to start conversations.',
            type: 'textarea'
        }]
    }, {
        id: 9,
        text: 'What do they like most about their job?',
        items: [{
            field: 'job_likes',
            label: 'What makes them tick?',
            type: 'textarea'
        }]
    }, {
        id: 10,
        text: 'How often are they in your area?',
        items: [{
            field: 'travel_plans',
            label: 'e.g. In SF this Tues & every Mon',
            type: 'text'
        }]
    }, {
        // ****** FORM 3 add-meeting.html *******
        // MEETING INFO
        id: 50,
        text: 'What about you did they get most excited by?',
        items: [{
            field: 'excited_by',
            label: 'What would you want them to remember?',
            type: 'textarea'
        }]
    }, {
        id: 51,
        text: 'What did you laugh about?',
        items: [{
            field: 'laugh',
            label: 'Probably good to reference these later!',
            type: 'textarea'
        }]
    }, {
        id: 52,
        text: 'Did they suggest that you meet or talk with someone?',
        items: [{
            field: 'suggestion',
            label: 'Yes',
            type: 'radio'
        }, {
            field: 'suggestion',
            label: 'No',
            type: 'radio'
        }]
    }, {
        id: 53,
        text: 'Who did they suggest?',
        items: [{
            field: 'suggested_contact',
            label: 'List their name(s)',
            type: 'text'
        }]
    }, {
        id: 54,
        text: 'Did they offer to introduce you to them?',
        items: [{
            field: 'intro',
            label: 'Yes',
            type: 'radio'
        }, {
            field: 'intro',
            label: 'No',
            type: 'radio'
        }]
    }, {
        id: 55,
        text: 'Did they suggest anything to read?',
        items: [{
            field: 'suggest_read',
            label: 'Yes',
            type: 'radio'
        }, {
            field: 'suggest_read',
            label: 'No',
            type: 'radio'
        }]
    }, {
        id: 56,
        text: 'What did they suggest to read?',
        items: [{
            field: 'suggested_to_read',
            label: 'List or link them here',
            type: 'textarea'
        }]
    }, {
        id: 57,
        text: 'What useful advice did they give you?',
        items: [{
            field: 'advice',
            label: 'Life or career tips',
            type: 'textarea'
        }]
    }, {
        id: 58,
        text: 'Did they give you any instructions?',
        items: [{
            field: 'instructions',
            label: 'e.g. email me in a week; apply for X',
            type: 'textarea'
        }]
    }, {
        id: 59,
        text: 'Anything else come up in the meeting?',
        items: [{
            field: 'meeting_note',
            label: 'Miscellaneous Notes',
            type: 'textarea'
        }]
    }];

    var dictionary = {
        '0': 'name',
        '1': 'location',
        // Default: Current Date
        '2': 'met_at',
        '3': 'type',
        '4': 'work_info',
        '11': 'position',
        '5': 'achievements',
        '6': 'contact_info',
        // Links Sector
        '7': 'work_field',
        // Links Hobbies
        '8': 'hobbies',
        '9': 'job_likes',
        // Meeting Reminders
        '10': 'travel_plans',
        // 50, 51 Email Reminders
        '50': 'excited_by',
        '51': 'laugh',
        // Provide Content
        '52': 'suggestion',
        '53': 'suggested_contact',
        // Remind via Email for intro
        '54': 'intro',
        '55': 'suggest_read',
        // Provide links
        '56': 'suggested_to_read',
        // Provide reminders
        '57': 'advice',
        // Provide reminders
        '58': 'instructions',
        '59': 'meeting_notes',

    };

    var ParseService = {};

    // === Form Rendering
    ParseService.questions = questions;

    // returns all questions whose ids in the question dictionary are
    // in the range [min, max].
    ParseService.getQuestions = function(min, max) {
        return questions.filter(function(question) {
            return question.id >= min && question.id <= max;
        });
    };

    // returns all questions whose ids in the question dictionary are
    // in the given list.
    ParseService.getQuestionsSpecific = function(allowed) {
        return questions.filter(function(question) {
            return allowed.indexOf(question.id) > -1;
        });
    };

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
        _this = this;

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
                            _this.getActionItemByContactId(cur_user.objectId).success(function(data) {
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
