const Discord = require('discord.js');

module.exports = {

    name: 'stop',
    description: 'Stop la musique ',
    permission: "Aucune",
    dm: false,
    category: 'Musique',

    options: [],

    async run(bot, message, args) {

        // console.log(message.client.player.state)
        // bot.player.stop()
        // const queue = await bot.player.nodes.create(message.guild, { metadata: { message: message } })
        const queue = await bot.player.nodes.get(message.guild)
        if(!queue.connection || !queue.playing) return message.reply("Le bot ne joue pas de musique !")

        queue.destroy();
        message.reply("La musique à bien été arrêtée !");
    }
}
