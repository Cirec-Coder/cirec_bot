const Discord = require("discord.js");
module.exports = async (bot, queue, track) =>{

    bot.user.setActivity("J'attend votre choix", {type: Discord.ActivityType.Custom});
    queue.channel.send(`${bot.myEmojis.musique} La liste de lecture est terminée !`)
}