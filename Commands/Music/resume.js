const Discord = require("discord.js");

module.exports = {
    name: "resume",
    directory: 'music/',
    description: "Resume la musique ",
    permission: "Aucune",
    dm: false,
    category: "Musique",

    options: [],

    async run(bot, message, args) {
        const queue = await bot.player.nodes.get(message.guild);
        //console.log(queue.node);
        if (!queue) {
            return message.reply(
                "Le bot n'est pas connecté à un salon vocal !"
            );
        }

        queue.node.resume();
        message.reply("La musique à bien été relancée !");
    },
};