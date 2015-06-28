var ParseFactory = angular.module('ParseFactory', [])

ParseFactory.factory('ParseService', ['$http', function($http) {

    var questions = [{
        id: 0,
        text: 'Who did you meet with?',
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
        id: 1,
        text: 'Where did you meet?',
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
        id: 60,
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
        text: 'Want to add their contact information?',
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
            label: 'BioTech/Health Tech',
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
            label: 'List them here!',
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
            label: 'e.g. In SF on Monday and Tuesday every second week',
            type: 'text'
        }]
    }, {
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
            label: 'Probably good to reference these later',
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
        text: 'Did they offer to introduce you?',
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
        text: 'Did they suggest anything to read',
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
        text: 'Which did they suggest to read?',
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
            label: 'Write any advice here',
            type: 'textarea'
        }]
    }, {
        id: 58,
        text: 'Did they give you any instructions??',
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
            label: 'Meeting Notes',
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
        '60': 'position'
    };

    var ParseService = {}

    ParseService.getAllContacts = function() {
        return $http.get('https://api.parse.com/1/classes/contact', {
            headers: {
                'X-Parse-Application-Id': 'VurVg5WSqG0AH9ui3Avf8wEBJxLEUZ1FgdvxXeKL',
                'X-Parse-REST-API-Key': 'sThhgc4cHiS5yJEN5tjwYQRT3HhlyvnkAfuOwO5R',
            }
        });
    };

    // ParseService.createNewContact = function() {

    // }

    // ParseService.createNewMeeting = function() {

    // }



    return ParseService;

}]);