const Discord = require('discord.js');

module.exports = {

    name: 'google',

    async run(bot, message) {
        // await message.delete();
        let args = message.content.split(' ');
        args.shift();
        await message.reply("https://www.google.fr/search?q=" + args.join('%20'));
    }
}