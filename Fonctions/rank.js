const Discord = require('discord.js');
const Canvas = require("discord-canvas-easy");
/**
 * 
 * @param {Discord.Client} bot 
 * @param {Object} message 
 * @param {Object} params 
 * @returns 
 */
module.exports = async (bot, message, params) => {

    console.log(params.rank);
    const Rank = await new Canvas.Card()
    .setBot(bot)
    .setGuild(message.guild)
    .setUser(message.author)
    .setBackground("rankBG.jpg")

    .setRank(params || params.rank !== undefined ? params.rank : 7) //optional
    .setLevel(params || params.level !== undefined ? params.level : 1) //optional
    .setXpNeed(params || params.xpNeed !== undefined ? params.xpNeed : 1000) //optional
    .setXp(params || params.xp !== undefined ? params.xp : 1) //optional
    .setColorFont(params || params.colorFont !== undefined ? params.colorFont : "#000000") //optional
    .setColorProgressBar(params || params.colorProgressBar !== undefined ? params.colorProgressBar : "#3748ff") //optional
    .toCard()

    
    return message.reply({files: [new Discord.AttachmentBuilder(Rank.toBuffer(), {name: "rank.png"})]})
}