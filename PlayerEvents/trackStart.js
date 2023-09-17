module.exports = async (bot, queue, track) =>{

    console.log(track.title);
    queue.metadata.message.channel.send(`La musique ${track.title} est lancée !`)
}