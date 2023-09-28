const Discord = require("discord.js");
module.exports = async (bot, queue, args) =>{

    const track = queue.currentTrack;
    bot.user.setActivity("En pause : " + track.title, {type: Discord.ActivityType.Custom});
    queue.channel.send(`Le player est en pause !`)
}