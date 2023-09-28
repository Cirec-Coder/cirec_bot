module.exports = async (bot, queue, track) =>{

    // bot.user.setActivity(track.title, {type: Discord.ActivityType["Listening"]});
    queue.channel.send(`${bot.myEmojis.musique} La musique ${track.title} demandée par ${track.requestedBy.tag} a été ajoutée à la liste !`)
} 