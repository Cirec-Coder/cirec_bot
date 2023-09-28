const { Discord, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {

    name: 'google',
    directory: 'search/',
    description: 'Affiche un lien de recherche Google ',
    permission: "Aucune",
    dm: true,
    category: 'Recherche',
    options: [
        {
            type: "string",
            name: "search",
            description: "Chaine recherchée",
            required: true,
            autocomplete: false,
        }
    ],

    /**
    * 
    * @param {Discord.Client} bot 
    * @param {Discord.Interaction} message 
    * @param {Discord.CommandInteractionOptionResolver} args 
    * @returns 
    */
    async run(bot, message, args) {
        try {
            let search = message.options.getString("search").split(" ");
            await message.reply({
                // content: "https://www.google.fr/search?q=" + search.join('%20'),
                content: "Résultat de la recherche",
                components: [new ActionRowBuilder().setComponents(
                    new ButtonBuilder()
                        .setLabel('Voir les résultats')
                        .setStyle(ButtonStyle.Link)
                        .setURL("https://www.google.fr/search?q=" + search.join('%20')),
                )],
                ephemeral: true
            });

        } catch (error) {
            console.error(error);
        }
    }
}
