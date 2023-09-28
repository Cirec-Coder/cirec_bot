const Discord = require("discord.js");
const {ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');

module.exports = {
    name: "pause",
    directory: 'music/',
    description: "Pause la musique ",
    permission: "Aucune",
    dm: false,
    category: "Musique",

    options: [],

    /**
    * 
    * @param {Discord.Client} bot 
    * @param {import('discord.js').Interaction} interaction 
    * @param {Discord.CommandInteractionOptionResolver} args 
    * @returns 
    */
    async run(bot, interaction, args) {
        const queue = await bot.player.nodes.get(interaction.guild);

        if (!queue) {
            return interaction.reply(
                "Le bot n'est pas connecté à un salon vocal !"
            );
        }

        queue.node.setPaused(!queue.node.isPaused())

        if (interaction.isButton()) {
            const { message } = interaction;
            const pause = new ButtonBuilder()
            .setCustomId('pause')
            .setLabel(queue.node.isPaused() ? 'Play' : 'Pause')
            .setStyle(ButtonStyle.Success);

        const stop = new ButtonBuilder()
            .setCustomId('stop')
            .setLabel('Stop')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
            .addComponents(pause, stop);
       message.edit({ components: [row] });

            // termine l'intercation en silence
            return interaction.deferUpdate()
        }
        //  else if (interaction.isUserContextMenuCommand()) {
            
        // }
        else if (queue.node.isPaused())
            return interaction.reply("La musique à bien été mise en pause !");
        else
            return interaction.reply("La musique à bien été relancée !");

    },
};