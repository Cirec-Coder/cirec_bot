module.exports = async (bot, queue, track) =>{

    queue.channel.send(`${bot.myEmojis.musique} La musique ${track.title} demandée par ${track.requestedBy.tag} est lancée !`)
}