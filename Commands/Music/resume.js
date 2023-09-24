const Discord = require("discord.js");

module.exports = {
    name: "resume",
    directory: 'music/',
    description: "Resume la musique ",
    permission: "Aucune",
    dm: false,
    category: "Musique",

    options: [],

    async run(bot, interaction, args) {
        const queue = await bot.player.nodes.get(interaction.guild);
        //console.log(queue.node);
        if (!queue) {
            return interaction.reply(
                "Le bot n'est pas connecté à un salon vocal !"
            );
        }

        queue.node.resume();
        if (interaction.isButton()) {
            // const { message } = interaction;
            // message.edit({ components: [] });

            // termine l'intercation en silence
            return interaction.deferUpdate()
        } else 
            return interaction.reply("La musique à bien été relancée !");
    },
};