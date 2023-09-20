const Discord = require('discord.js');

module.exports = {

    name: 'stack',
    directory: 'search/',
    description: 'Affiche un lien de recherche Google ciblé sur Stackoverflow ',
    permission: 'Aucune',
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


    async run(bot, message) {
        try {
            let search = message.options.getString("search").split(" ");
            await message.reply({ content: "https://www.google.fr/search?q=" + search.join('%20') + '+site:stackoverflow.com', ephemeral: true });

        } catch (error) {
            console.error(error);
        }
    }
}