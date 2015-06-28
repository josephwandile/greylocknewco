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

/**
 * Methods for retrieving objects from Parse
 * -----------------------------------------
 * Each method takes a callback function.
 * On success, we fire callback(results, null)
 * and failure, we fire callback(null, error)
 * 
 * getAll[ActionItem|Contact|Meeting]s
 *   getAllFromTable
 * get[ActionItem|Contact|Meeting]byID
 *   getEntryByID()
 */

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

function getEntryByID(TableName, id, callback) {
  var query = new Parse.Query(TableName);
  query.get(id, {
    success: function(object) {
      callback(object, null);
    },
    error: function(error) {
      callback(null, error);
    }
  });
}

function getActionItemByID(contact_id, callback) {
  getEntryByID(ActionItem, contact_id, callback);
}

function getContactByID(contact_id, callback) {
  getEntryByID(Contact, contact_id, callback);
}

function getMeetingByID(contact_id, callback) {
  getEntryByID(Meeting, contact_id, callback);
}

/**
 * Methods for saving objects to Parse
 * -----------------------------------
 * save[ActionItem|Contact|Meeting]
 *   saveObject
 */

function saveObject(TableName, data, callback) {
  var table = new TableName();
  table.save(data, {
    success: function(result) {
      callback(result, null);
    },
    error: function(result, error) {
      callback(null, error);
    }
  };
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

function saveActionItem(data, callback) {
  saveObject(ActionItem, data, function(result, error) {
    if (result) console.log("ActionItem created with ID " + result.id);
    callback(result, error);
  });
}

/**
 * Saves a contact
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
  saveObject(Contact, data, function(result, error) {
    if (result) console.log("Contact created with ID " + result.id);
    callback(result, error);
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
  saveObject(Meeting, data, function(result, error) {
    if (result) {
      console.log("Meeting created with ID " + result.id);
      createActionItemsFromMeeting(result);
    }
    callback(result, error);
  });
}

/** 
 * Private function to create action items from a meeting object
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

function main() {
  // getAllActionItems()

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
module.exports = {
  getAllActionItems: getAllActionItems,
  getAllContacts: getAllContacts,
  getAllMeetings: getAllMeetings,
  getActionItemByID: getActionItemByID,
  getContactByID: getContactByID,
  getMeetingByID: getMeetingByID,
}