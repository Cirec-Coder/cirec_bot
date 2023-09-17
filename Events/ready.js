const Discord = require('discord.js');
const loadSlashCommands = require("../Loaders/loadSlashCommands")
const loadDatabase = require('../Loaders/loadDatabase');

module.exports = async bot => {

    bot.db = await loadDatabase();
    bot.db.connect(function () {
        console.log("Base de données connectée");
    })

    await loadSlashCommands(bot);
    // bot.user.setAvatar('./src/assets/img/avatar.png').catch(console.error);
    bot.user.setActivity("The Warriors's Bot");
    console.log(`${bot.user.username} est bien en ligne !`);
}