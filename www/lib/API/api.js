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
 * @return Array[ActionItem] Action items in the DB
 */
function fetchAllActionItems() {
  var queryObject = new Parse.Query(ActionItem);
  queryObject.find({
    success: function (results) {
      for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
      }
    },
    error: function (error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  });
}

/**
 * Converts a specified contact ID into a contact object
 * @param  {string} contact_id the id of the contact to fetch
 * @param  {callback} function to execute after fetching the contact object
 */
function getContactByID(contact_id, callback) {
  var query = new Parse.Query(Contact);
  // Add constraints
  query.equalTo("objectId", contact_id);
  query.limit(1);
  query.first({
   success: function(object) {
      console.log(object);
      callback(object)
   },
   error: function(error) {
    console.log(error);
   }
  });
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