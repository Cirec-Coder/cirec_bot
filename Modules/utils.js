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


/**
 * logs error through discord webhook
 * @param {Discord.Client} bot
 * @param {Discord.DiscordAPIError|HTTPError|Error|unknown} error
 * @param {"warning" | "error"} type
 * @returns {Promise<void>}
 */
async function sendErrorLog(bot, error, type) {
    try {
      if (error.message?.includes("Missing Access")) return;
      if (error.message?.includes("Unknown Message")) return;
      if (error.message?.includes("Unknown interaction")) return;
  
      if (
        error.stack?.includes("TypeError: Cannot read properties of undefined (reading 'messages')")
      ) {
        return bot.logger.error("ERR_LOG", error);
      }
  
      const GUILD_ID  = process.env.GUILD_ID;
      if (!GUILD_ID) return bot.logger.error("ERR_LOG", error?.stack || `${error}`);
  
      const channel =
        bot.channels.cache.get(GUILD_ID) || (await bot.channels.fetch(GUILD_ID));
  
      if (!channel || !havePermissions(channel)) {
        return bot.logger.error("ERR_LOG", error?.stack || `${error}`);
      }
  
      const code = "code" in error ? error.code : "N/A";
      const httpStatus = "httpStatus" in error ? error.httpStatus : "N/A";
      const requestData = "requestData" in error ? error.requestData : { json: {} };
  
      const name = error.name || "N/A";
      let stack = error.stack || error;
      let jsonString = "";
  
      try {
        jsonString = JSON.stringify(requestData.json, null, 2);
      } catch {
        jsonString = "";
      }
  
      if (jsonString?.length > 2048) {
        jsonString = jsonString ? `${jsonString?.slice(0, 2045)}...` : "";
      }
  
      if (typeof stack === "string" && stack.length > 2048) {
        console.error(stack);
        stack = "An error occurred but was too long to send to Discord, check your console.";
      }
  
      const embed = new Discord.EmbedBuilder()
        .setTitle("An error occurred")
        .addFields(
          { name: "Name", value: name, inline: true },
          {
            name: "Code",
            value: code.toString(),
            inline: true,
          },
          {
            name: "httpStatus",
            value: httpStatus.toString(),
            inline: true,
          },
          {
            name: "Timestamp",
            value: bot.logger.now,
            inline: true,
          },
          {
            name: "Request data",
            value: Discord.codeBlock(jsonString.slice(0, 2045)),
            inline: false,
          }
        )
        .setDescription(Discord.codeBlock(stack))
        .setColor(type === "error" ? Discord.Colors.Red : Discord.Colors.Orange);
  
      await channel.send({ embeds: [embed], ephemeral: true });
    } catch (e) {
      console.error({ error });
      console.error(e);
    }
  }
  

/**
 * check if the bot has the default permissions
 * @param {Discord.CommandInteraction | Discord.TextChannel} resolveable
 * @returns {boolean}
 */
function havePermissions(resolveable) {
    const channel = "channel" in resolveable ? resolveable.channel : resolveable;
    const permissions = channel.permissionsFor(resolveable.guild.members.me);
    return (
      permissions?.has(Discord.PermissionsBitField.Flags.ViewChannel) &&
      permissions?.has(Discord.PermissionsBitField.Flags.SendMessages) &&
      permissions?.has(Discord.PermissionsBitField.Flags.EmbedLinks)
    );
  }
    

module.exports = {
    createId,
    getRandomColor,
    rank,
    sendErrorLog,
}