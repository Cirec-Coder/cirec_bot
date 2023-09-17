const Discord = require("discord.js");

module.exports = {
    name: "volume",
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
        console.log(vol);

        const queue = await bot.player.nodes.get(message.guild);
        if (!queue) {
            return message.reply(
                "Le bot n'est pas connecté à un salon vocal !"
            );
        }

        queue.node.setVolume(vol);
        message.reply(
            `Le volume de la musique à bien été mis sur ${vol.toString()} !`
        );
    },
};