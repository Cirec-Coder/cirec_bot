const Discord = require('discord.js');
const Canvas = require("discord-canvas-easy");
// Canvas.registerFont(`futura-bold.ttf`, { family: "Futura Book" })

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

        // const Rank = await new Canvas.Card()
        // .setBot(bot)
        // .setGuild(message.guild)
        // .setUser(message.author)
        // .setBackground("rankBG.jpg")
        // .setRank(2) //optional
        // .setLevel(5) //optional
        // .setXpNeed(6000) //optional
        // .setXp(4457) //optional
        // .setColorFont("#000000") //optional
        // .setColorProgressBar("#3748ff") //optional
        // .toCard()

        // return message.reply({files: [new Discord.AttachmentBuilder(Rank.toBuffer(), {name: "rank.png"})]})
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

    let command = require(`../Commands/${commandName}`);
    if (!command) return message.reply("Il n'y a pas de commande !");

    command.run(bot, message, args);
}