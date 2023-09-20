const Discord = require("discord.js");

module.exports = {
    name: "volume",
    directory: 'music/',
    description: "Change le volume de la musique ",
    permission: "Aucune",
    dm: false,
    category: "Musique",

    options: [
        {
            type: "number",
            name: "volume",
            description: "0 - 100",
            required: true,
            autocomplete: false,
        },
    ],

    async run(bot, message, args) {
        let vol = args.getNumber("volume");

        const queue = await bot.player.nodes.get(message.guild);
        if (!queue) {
            return message.reply(
                "Le bot n'est pas connecté à un salon vocal !"
            );
        }

        if (vol > 100) vol = 100;
        if (vol < 0) vol = 0;

        bot.volume = vol;
        queue.node.setVolume(bot.volume);
        message.reply(
            `Le volume de la musique à bien été mis sur ${vol.toString()} !`
        );
    },
};