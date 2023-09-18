const Discord = require('discord.js');

module.exports = {

    name: 'stop',
    description: 'Stop la musique ',
    permission: "Aucune",
    dm: false,
    category: 'Musique',

    options: [],

    async run(bot, message, args) {

        const queue = await bot.player.nodes.get(message.guild);
        if (!queue) {
            return message.reply(
                "Le bot n'est pas connecté à un salon vocal !"
            );
        }

		queue.delete();
		message.reply("La musique à bien été arrêtée !");
	}
}