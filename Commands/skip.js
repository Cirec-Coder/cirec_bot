const Discord = require("discord.js");

module.exports = {
    name: "skip",
    description: "Skip la musique ",
    permission: "Aucune",
    dm: false,
    category: "Musique",

    options: [],

    async run(bot, message, args) {
        const queue = await bot.player.nodes.get(message.guild);
        console.log(queue.node);
        if (!queue) {
            return message.reply(
                "Le bot n'est pas connecté à un salon vocal !"
            );
        }

        queue.node.skip();
        message.reply("La musique à bien été skip !");
    },
};