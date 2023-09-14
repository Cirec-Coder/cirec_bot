const Discord = require('discord.js');

module.exports = {

    name: 'stack',

    async run(bot, message) {
        let args = message.content.split(' ');
        args.shift();
        // message.delete();
        // .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        // .catch(console.error);
        await message.reply("https://www.google.fr/search?q=" + args.join('%20')+ '+site:stackoverflow.com');
    }
}