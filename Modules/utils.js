const Discord = require('discord.js');
const Canvas = require("discord-canvas-easy");
/**
 * 
 * @param {string} prefix 
 * @returns 
 */
function createId(prefix){

    let caracters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
    let ID = [];

    for (let i = 0; i < 10; i++) ID.push(caracters[Math.floor(Math.random() * caracters.length)]);

    return `${prefix}-${ID.join("")}`;
}

function getRandomColor() {
    return Math.floor(Math.random() * 16777215)
}

/**
 * 
* @param {Discord.Client} bot 
* @param {Discord.CommandInteraction} interaction 
* @param {Object} params 
* @returns 
*/
async function rank(bot, interaction, params) {

    // console.log(params.rank);
    const Rank = await new Canvas.Card()
    .setBot(bot)
    .setGuild(interaction.guild)
    .setUser(interaction.author)
    .setBackground("./src/assets/img/rankBG.jpg")

    .setRank(params || params.rank !== undefined ? params.rank : 7) //optional
    .setLevel(params || params.level !== undefined ? params.level : 1) //optional
    .setXpNeed(params || params.xpNeed !== undefined ? params.xpNeed : 1000) //optional
    .setXp(params || params.xp !== undefined ? params.xp : 1) //optional
    .setColorFont(params || params.colorFont !== undefined ? params.colorFont : "#000000") //optional
    .setColorProgressBar(params || params.colorProgressBar !== undefined ? params.colorProgressBar : "#3748ff") //optional
    .toCard()


    return interaction.reply({files: [new Discord.AttachmentBuilder(Rank.toBuffer(), {name: "rank.png"})]})

}

module.exports = {
    createId,
    getRandomColor,
    rank,
}