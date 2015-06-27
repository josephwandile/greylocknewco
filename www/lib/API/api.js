var Parse = require('parse').Parse;

Parse.initialize("VurVg5WSqG0AH9ui3Avf8wEBJxLEUZ1FgdvxXeKL", "YOptVhvEs5IWiSPPKO8z9V59dbeK0SiZBzLzZRlT");

var Contact = Parse.Object.extend("contact");
var contact = new Contact();
var newContactData = {
  first_name: "Sherman",
  last_name: "Leung",
  email: "skleung@stanford.edu",
  phone: "3013256815",
  profile: "https://www.linkedin.com/in/shleung"
}
contact.save(newContactData).then(function(object) {
  console.log("yay! it worked");
});


/**
 * Returns an extended Parse.Object instance
 * configured to the target table.
 * @param  {string} tableName name of the table to fetch
 * @return {Parse.Object}     table instance
 */
function fetchTable(tableName) {
	var Table = new Parse.Object.extend(tableName);
	return new Table();
}

/**
 * [fetchAllActionItems description]
 * @return Array[ActionItem] [description]
 */
function fetchAllActionItems() {
	var actionItemTable = fetchTable('action_item');

}