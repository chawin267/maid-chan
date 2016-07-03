// Require annyang
const annyang = require('annyang');
// Turn on debug messages
annyang.debug();
console.log("annyang_script is loaded");
// Define sample command
var commands = {
    'hello': function() {
        console.log('world');
    }
};
// Add our commands to annyang
annyang.addCommands(commands);
// Start listening. You can call this here, or attach this call to an event, button, etc.
annyang.start();
