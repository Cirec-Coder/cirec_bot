const Discord = require('discord.js');

module.exports = {

    name: 'stop',
    directory: 'music/',
    description: 'Stop la musique ',
    permission: "Aucune",
    dm: false,
    category: 'Musique',

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
 
        queue.delete();
        bot.user.setActivity("J'attend votre choix", {type: Discord.ActivityType.Custom});
        if (interaction.isButton()) {
            const { message } = interaction;
            message.edit({ components: [] });

            // termine l'intercation en silence
            await interaction.deferUpdate()
        } else {
            interaction.reply("La musique à bien été arrêtée !");
        }
    }
}