const Discord = require("discord.js");

module.exports = {
    name: "skip",
    directory: 'music/',
    description: "Skip la musique ",
    permission: "Aucune",
    dm: false,
    category: "Musique",

    options: [],

    async run(bot, interaction, args) {
        const queue = await bot.player.nodes.get(interaction.guild);

        if (!queue) {
            return interaction.reply(
                "Le bot n'est pas connecté à un salon vocal !"
            );
        }

        queue.node.skip();
        if (interaction.isButton()) {
            const { message } = interaction;
            message.edit({ components: [] });

            // termine l'intercation en silence
            await interaction.deferUpdate()
        } else {
            interaction.reply({ content: "La musique à bien été skip !" });
        }

        //     const track = queue.currentTrack;

        //     const embed = new Discord.EmbedBuilder()
        //     //   .baseEmbed(interaction)
        //     //   .setAuthor({ name: "Nowplaying 🎵" })
        //       .setTitle(`${track.title}`)
        //     //   .setURL(`${track.url}`)
        //     //   .setThumbnail(`${track.thumbnail}`)
        //       .setDescription(`Played by: ${track.requestedBy.toString()}\n
        // ${queue.node.createProgressBar()}`);

        //      interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
    },
};