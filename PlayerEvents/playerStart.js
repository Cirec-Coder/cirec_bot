module.exports = async (bot, queue, track) =>{

    queue.channel.send(`La musique ${track.title} demandée par ${track.requestedBy.tag} est lancée !`)
}