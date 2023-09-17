const Discord = require('discord.js');

module.exports = {

    name: 'fart',
    description: 'Répond avec  https://prout.dev ',
    permission: 'Aucune',
    dm: true,
    category: 'Humour',

    async run(bot, message) {
        // await message.delete();
        // await message.reply(`Hello ${message.author.globalName} ping : \`${bot.ws.ping}\``);
        await message.reply('https://prout.dev');
    }
}