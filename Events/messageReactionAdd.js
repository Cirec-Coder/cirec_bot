const Discord = require('discord.js');
// const loadSlashCommands = require("../Loaders/loadSlashCommands")

module.exports = async (reaction, user) => {
	// Now the message has been cached and is fully available
//	console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
    console.log(`${user.username} à réagit !`);
}