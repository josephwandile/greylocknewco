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
 * Returns an extended Parse.Object instance
 * configured to the target table.
 * @param  {string} tableName name of the table to fetch
 * @return {Parse.Object}     table instance
 */
function fetchTable(tableName) {
  // var Table = new Parse.Object.extend(tableName);
  // return new Table();
}

/**
 * Returns an array of all action items in the database
 * @return Array[ActionItem] [description]
 */
function fetchAllActionItems() {
  console.log("Here");
  // var actionItemTable = fetchTable('action_item');
  var ActionItem = Parse.Object.extend("action_item");
  var queryObject = new Parse.Query(ActionItem);
  queryObject.find({
    success: function (results) {
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
        console.log("Got a result!");
      }
    },
    error: function (error) {
      console.log("Error");
      alert("Error: " + error.code + " " + error.message);
    }
  });
}



/**
 * DEBUGGING FUNCTIONS
 */
function randomContact() {
  // Chosen by dice roll, guaranteed to be random
  return {
    first_name: "Sherman",
    last_name: "Leung",
    email: "skleung@stanford.edu",
    phone: "3013256815",
    profile: "https://www.linkedin.com/in/shleung"
  };
}

function randomActionItem() {
  return null;
}

function randomMeeting() {
  return null;
}

function main() {
  fetchAllActionItems()
}

main()

// Handle exporting globals so that other javascript files that `require` api.js have access to them
module.exports.fetchAllActionItems = fetchAllActionItems;
// module.exports.x = x;
// module.exports.x = x;
// module.exports.x = x;
=======

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
  getAllFromTable(ActionItem, callback);
}

function getAllContacts(callback) {
  getAllFromTable(Contact, callback);
}

function getAllMeetings(callback) {
  getAllFromTable(Meeting, callback);
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
 * Each method takes a callback function.
 * On success, we fire callback(results, null)
 * and failure, we fire callback(null, error)
 * 
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
  });
}

/** Saves an action item in the format:
 *  
 *  {
 *    contact: [object Object]  // a full Parse contact object
 *    type: "REMINDER",         // {"REMINDER", "TIP"}
 *    text: "Joe is in the Bay",
 *    link: "tel:1231231234"    // Actionable link
 *    date: [date Object]       // Date at which the item is relevant
 *  }
 */
function saveActionItem(data, callback) {
  saveObject(ActionItem, data, function(result, error) {
    if (result) console.log("ActionItem created with ID " + result.id);
    callback(result, error);
  });
}

/** Saves a contact in the format
 * 
 * {
 *   first_name: "Neel",
 *   last_name: "Mehta",
 *   email: "neelmehta@college.harvard.edu",
 *   phone: "1234567890",
 *   profile: "http://hathix.com"
 * }
 */

function saveContact(data, callback) {
  saveObject(Contact, data, function(result, error) {
    if (result) console.log("Contact created with ID " + result.id);
    callback(result, error);
  });
}


/** Saves a meeting in the following format and creates action items 
 * 
 * {
 *   contact: [object Object], // representing a contact object
 *   met_at: [date Object], // Javascript Date object
 * }
 */

function saveMeeting(data, callback) {
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
  saveActionItem(newActionItemData, function(result, error){});
}

function main() {
  // getAllActionItems(console.log)

  // Grabs Joe and saves a meeting with him
  // getContactByID("qsbGTjQI3I", function(joeContact) {
  //   var testMeetingData = {
  //     contact: joeContact,
  //     met_at: new Date(),
  //     type: "BUSINESS"
  //   }
  //   saveMeeting(testMeetingData, console.log);
  // });
}

main();

// Handle exporting globals so that other javascript files that `require` api.js have access to them
module.exports = {
  getAllActionItems: getAllActionItems,
  getAllContacts: getAllContacts,
  getAllMeetings: getAllMeetings,
  getActionItemByID: getActionItemByID,
  getContactByID: getContactByID,
  getMeetingByID: getMeetingByID,
  saveActionItem: saveActionItem,
  saveContact: saveContact,
  saveMeeting: saveMeeting,
};
