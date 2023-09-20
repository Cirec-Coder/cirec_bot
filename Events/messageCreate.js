const Discord = require('discord.js');
const Canvas = require("discord-canvas-easy");

/**
 * 
 * @param {Discord.Client} bot 
 * @param {Object} message 
 * @returns 
 */
module.exports = async (bot, message) => {

    if (message.content === "!rank") {

        bot.function.rank(bot, message,
            {
                rank: 1,
                level: 6,
                xpNeed: 6000,
                xp: 5980,
                colorFont: "#000000",
                colorProgressBar: "#37ff48",
            }
        )
        return

    }

    if (message.content === "!leaderboard") {

        const Leaderboard = await new Canvas.Leaderboard()
            .setBot(bot)
            .setGuild(message.guild)
            .setBackground("pikachu.png")
            .addUser(message.author, 8 /*the level*/, 4589 /*the xp*/, 9000 /*the xp need*/)
            .setColorFont("#ffffff") //optional
            .toLeaderboard()

        return message.reply({ files: [new Discord.AttachmentBuilder(Leaderboard.toBuffer(), "leaderboard.png")] })
    }


    let prefix = "!";

    let messageArray = message.content.split(' ');
    let commandName = messageArray[0].slice(prefix.length);
    let args = messageArray.slice(1);

    if (!message.content.startsWith(prefix)) return;

    let dir;
    bot.commands.filter(cmd => cmd.name === commandName)
        .map(cmd => dir = cmd.directory)
    let command = require(`../Commands/${dir ? dir : ""}${commandName}`);
    if (!command) return message.reply("Il n'y a pas de commande !");

    command.run(bot, message, args);
}