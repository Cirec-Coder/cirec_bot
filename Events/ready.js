const Discord = require('discord.js');

module.exports = async bot => {
    bot.user.setAvatar('./src/assets/img/avatar.png').catch(console.error);
    bot.user.setActivity("The Warriors's Bot");
    console.log(`${bot.user.username} est bien en ligne !`);
}