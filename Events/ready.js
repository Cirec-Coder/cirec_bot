const Discord = require('discord.js');
const loadSlashCommands = require("../Loaders/loadSlashCommands")
const loadDatabase = require('../Loaders/loadDatabase');

/**
 * 
 * @param {Discord.Client} bot 
 */
module.exports = async bot => {

    bot.db = await loadDatabase();
    bot.db.connect(function () {
        console.log("✅ Base de données connectée");
    })

    await loadSlashCommands(bot);
    // bot.user.setAvatar('./src/assets/img/avatar.png').catch(console.error);
    bot.user.setActivity("J'attend votre choix", {type: Discord.ActivityType.Custom});
    console.log(`✅ ${bot.user.username} est bien en ligne !`);

    // const Guilds = bot.guilds.cache.map(guild => guild.id);
    // console.log(Guilds);

}