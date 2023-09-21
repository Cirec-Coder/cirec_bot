const Discord = require("discord.js");

module.exports = {
    name: "nowplaying",
    directory: 'music/',
    description: "Change le volume de la musique ",
    permission: "Aucune",
    dm: false,
    category: "Musique",

    async run(bot, message, args) {

        const queue = await bot.player.nodes.get(message.guild);
        if (!queue) {
            return message.reply(
                "Le bot n'est pas connecté à un salon vocal !"
            );
        }

        const track = queue.currentTrack;
        // let color = bot.function.getRandomColor()
        // console.log(Math.floor(Math.random() * 16777215), color)
        const embed = new Discord.EmbedBuilder()
            // .baseEmbed(interaction)
            .setColor(bot.utils.getRandomColor())
            .setAuthor({ name: "Nowplaying 🎵" })
            .setTitle(`${track.title}`)
            .setURL(`${track.url}`)
            .setThumbnail(`${track.thumbnail}`)
            .setDescription(`Played by: ${track.requestedBy.toString()}\n
                ${queue.node.createProgressBar()}`);

        return message.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);

    }
}