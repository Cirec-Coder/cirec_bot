const Discord = require('discord.js');
const Canvas = require("discord-canvas-easy");

/**
 * 
 * @param {Discord.Client} bot 
 * @param {import('discord.js').Interaction} message 
 * @returns 
 */
module.exports = async (bot, message) => {

    if (message.content === "!rank") {

        bot.utils.rank(bot, message,
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
            .setBackground("./src/assets/img/pikachu.png")
            .addUser(message.author, 8 /*the level*/, 4589 /*the xp*/, 9000 /*the xp need*/)
            .setColorFont("#ffffff") //optional
            .toLeaderboard()

        return message.reply({ files: [new Discord.AttachmentBuilder(Leaderboard.toBuffer(), "leaderboard.png")] })
    }


    //     // ( ͡° ͜ʖ ͡°) \n 
        




}