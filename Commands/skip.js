const Discord = require("discord.js");

module.exports = {
    name: "skip",
    description: "Skip la musique ",
    permission: "Aucune",
    dm: false,
    category: "Musique",

    options: [],

    async run(bot, message, args) {
        const queue = await bot.player.nodes.get(message.guild);
        //console.log(queue.node);
        if (!queue) {
            return message.reply(
                "Le bot n'est pas connecté à un salon vocal !"
            );
        }

        queue.node.skip();
        message.reply("La musique à bien été skip !");
    //     const track = queue.currentTrack;

    //     const embed = new Discord.EmbedBuilder()
    //     //   .baseEmbed(message)
    //     //   .setAuthor({ name: "Nowplaying 🎵" })
    //       .setTitle(`${track.title}`)
    //     //   .setURL(`${track.url}`)
    //     //   .setThumbnail(`${track.thumbnail}`)
    //       .setDescription(`Played by: ${track.requestedBy.toString()}\n
    // ${queue.node.createProgressBar()}`);
    
    //      message.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
        },
};