var Parse = require('parse').Parse;
setup()

/**
 * Initializes the global `Parse` variable with secret keys
 * @return null
 */
function setup() {
  Parse.initialize("VurVg5WSqG0AH9ui3Avf8wEBJxLEUZ1FgdvxXeKL", "YOptVhvEs5IWiSPPKO8z9V59dbeK0SiZBzLzZRlT");
}

// Table Objects from Parse
var ActionItem = Parse.Object.extend("action_item");
var Contact    = Parse.Object.extend("contact");
var Meeting    = Parse.Object.extend("meeting");

function getAllFromTable(TableName, callback) {
  var query = new Parse.Query(TableName);
  query.find({
    success: function (results) {
      callback(results, null);
    },
    error: function (error) {
      callback(null, error);
    }
  });
}

function getAllActionItems(callback) {
  fetchAllActionItems(ActionItem, callback);
}

function getAllContacts(callback) {
  fetchAllContacts(Contact, callback);
}

function getAllMeetings(callback) {
  fetchAllMeetings(Meeting, callback);
}

function getByID(TableName, id, callback) {
  var query = new Parse.Query(TableName);
  query.equalTo("objectId", contact_id);
  query.first({
    success: function(object) {
      callback(object, null);
    },
    error: function(error) {
      callback(null, error);
    }
  });
}

function getActionItemByID(contact_id, callback) {
  getByID(ActionItem, contact_id, callback);
}

function getContactByID(contact_id, callback) {
  getByID(Contact, contact_id, callback);
}

function getMeetingByID(contact_id, callback) {
  getByID(Meeting, contact_id, callback);
}

/**
 * Saves a meeting and creates action items
 * @param  {Object} data of the meeting to save in the following format:
 {
  first_name: "Neel",
  last_name: "Mehta",
  email: "neelmehta@college.harvard.edu",
  phone: "1234567890",
  profile: "http://hathix.com"
 }
 */

function saveContact(data) {
  var contact = new Contact();
  contact.save(data).then(function(object) {
    console.log(object.get(first_name) + " " + object.get(last_name) + "saved with "
                + "contact id " + object.id);
    return object.id;
  });
}


/**
 * Saves a meeting and creates action items
 * @param  {Object} data of the meeting to save in the following format:
 {
  contact: [object Object], // representing a contact object
  met_at: [date Object], // Javascript Date object
 }
 */

function saveMeeting(data) {
  var meeting = new Meeting();
  meeting.save(data, {
    success: function(object) {
      console.log("Meeting saved with id = " + object.id);
      // create action items
      createActionItemsFromMeeting(object);
    },
    error: function(object, error) {
      console.log(error);
    }
  })
}

/** Private function to create action items from a meeting object
 *
 */

function createActionItemsFromMeeting(data) {
  var contact = new Contact();
  contact = data.get("contact");
  var email = contact.get("email");

  // create and save the action item
  var newActionItemData = {
    contact: contact,
    type: "REMINDER",
    text: "Send a follow up email to " + contact.get('first_name'),
    link: "mailto:" + email,
    date: new Date()
  }
  saveActionItem(newActionItemData);
}

/** Saves an action item in the format:
 {
  contact: [object Object] // a full Parse contact object
  type: "REMINDER", // {"REMINDER", "TIP"}
  text: "Joe is back in town",
  link: "tel:1231231234" // some actionable link that a phone can access
  date: [date Object] // JavaScript date object
 }
 *
 */

function saveActionItem(data) {
  var actionItem = new ActionItem();
  actionItem.save(data).then(function(object) {
    console.log("ActionItem saved with id = " + object.id);
  });
}


/**
 * DEBUGGING FUNCTIONS
 */
function makeContact() {
  // Chosen by dice roll, guaranteed to be random
  return {
    first_name: "Sherman",
    last_name: "Leung",
    email: "skleung@stanford.edu",
    phone: "3013256815",
    profile: "https://www.linkedin.com/in/shleung"
  };
}

function makeActionItem(contact_id) {
  return {
    contact: contact_id,
    date: null,
    link: "http://www.google.com/",
    text: "Hello there!",
    type: "TIP"
  };
}

function makeMeeting() {
  return null;
}

function main() {
  // fetchAllActionItems()

  // Grabs Joe and saves a meeting with him
  // getContactByID("qsbGTjQI3I", function(joeContact) {
  //   var testMeetingData = {
  //     contact: joeContact,
  //     met_at: new Date(),
  //     type: "BUSINESS"
  //   }
  //   saveMeeting(testMeetingData);
  // });
}

main()

// Handle exporting globals so that other javascript files that `require` api.js have access to them
module.exports.fetchAllActionItems = fetchAllActionItems;