const Discord = require('discord.js');

module.exports = {

    name: 'ping',

    async run(bot, message) {
        // await message.delete();
        await message.reply(`Hello ${message.author.globalName} ping : \`${bot.ws.ping}\``);
    }
}