const Discord = require('discord.js');

module.exports = {

    name: 'help',
    directory: 'information/',
    description: 'Affiche les commandes du robot ',
    permission: 'Aucune',
    dm: true,
    category: 'Information',

    // options: [
    //     {
    //         type: "string",
    //         name: "commande",
    //         description: "La commande à afficher",
    //         required: false,
    //         autocomplete: true,
    //     }
    // ],

    /**
    * 
    * @param {Discord.Client} bot 
    * @param {Discord.Interaction} message 
    * @param {Discord.CommandInteractionOptionResolver} args 
    * @returns 
    */
    async run(bot, message, args) {

        let command;
        // if (args.getString("commande")) {
        //     command = bot.commands.get(args.getString("commande"));
        //     if (!command) return message.reply("Pas de commande !")
        // }

        if (!command) {

            let categories = [];
            bot.commands.forEach(command => {
                if (!categories.includes(command.category))
                    categories.push(command.category)
            }
            );

            let Embed = new Discord.EmbedBuilder()
                .setThumbnail("https://images.pexels.com/photos/2085832/pexels-photo-2085832.jpeg")
                .setColor('#CC07CC')
                .setTitle(`✨   Liste des commandes disponibles   ✨`)
                // .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`Commandes disponibles : \`${bot.commands.size}\`\nCatégories disponibles : \`${categories.length} \``)
                .setTimestamp()
                .setFooter({ text: "Commandes du robot" })

            categories.sort().forEach(async cat => {
                let commands = bot.commands.filter(cmd => cmd.category === cat)
                Embed.addFields({ name: `${bot.myEmojis[cat.toLowerCase()]}     ${cat}`, value: `${commands.map(cmd => `\`🔹 ${cmd.name}\` : \t${cmd.description}`).join("\n") }\n\n`})
            })
 
            await message.reply({embeds: [Embed], ephemeral: true }) 
        };
    }
}
