const Discord = require("discord.js");
module.exports = async (bot, interaction, args) =>{

    const queue = await bot.player.nodes.get(interaction.guild);
    const track = queue.currentTrack;
    bot.user.setActivity(track.title, {type: Discord.ActivityType["Listening"]});
    interaction.channel.send(`Le lecteur a repris la lecture de :\n${bot.myEmojis.musique} ${track}`)
}