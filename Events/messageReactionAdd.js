const Discord = require('discord.js');
// const loadSlashCommands = require("../Loaders/loadSlashCommands")

module.exports = async (bot, reaction, user) => {
	// Now the message has been cached and is fully available
    console.log(`Nouvelle réaction sur le message de ${reaction.message.author.globalName}\n "${reaction.message.content}"`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	if(reaction.count > 1 )
	console.log(`${reaction.count} utilisateurs eut la même réactions !`);
    console.log(`${user.globalName} à réagit avec l'emoji : \`\`${reaction.emoji.name}\`\` !\n`);
}