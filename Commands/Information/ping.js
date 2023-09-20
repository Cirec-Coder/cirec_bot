const Discord = require('discord.js');

module.exports = {

    name: 'ping',
    directory: 'information/',
    description: 'Affiche la latence ',
    permission: 'Aucune',
    dm: true,
    category: 'Information',

    async run(bot, message) {
        // await message.delete();
        // await message.reply(`Hello ${message.author.globalName} ping : \`${bot.ws.ping}\``);
        await message.reply({ content: `ping : \`${bot.ws.ping}\``, ephemeral: true });
    }
}