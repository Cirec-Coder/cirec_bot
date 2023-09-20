const Discord = require('discord.js');

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

    async run(bot, message, args) {
        let search = message.options.getString("search").split(" ");
        await message.reply({ content: "https://www.google.fr/search?q=" + search.join('%20'), ephemeral: true });
    }
}
