const Discord = require('discord.js');

module.exports = {

    name: 'fart',
    directory: 'humor/',
    description: 'Répond avec  https://prout.dev ',
    permission: 'Aucune',
    dm: true,
    category: 'Humour',

    /**
    * 
    * @param {Discord.Client} bot 
    * @param {Discord.Interaction} message 
    * @returns 
    */
    async run(bot, message) {
        // await message.delete();
        // await message.reply(`Hello ${message.author.globalName} ping : \`${bot.ws.ping}\``);
        await message.reply(`[( ͡° ͜ʖ ͡°)](https://prout.dev)`);
    }
}