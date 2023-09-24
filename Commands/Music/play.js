const {EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');

module.exports = {

    name: 'play',
    directory: 'music/',
    description: 'Joue de la musique ',
    permission: "Aucune",
    dm: false,
    category: 'Musique',

    options: [
        {
            type: "string",
            name: "musique",
            description: "Le nom de la musique à jouer",
            required: true,
            autocomplete: false,
        }
    ],

    async run(bot, message, args) {
        let song = args.getString("musique");

        if (!message.member.voice.channel)
            return message.reply("Tu n'es pas en vocal !");
        if (
            (await message.guild.members.fetchMe()).voice.channel &&
            (await message.guild.members.fetchMe()).voice.channel.id !==
            message.member.voice.channel.id
        )
            return message.reply("Nous ne somme pas dans le même salon vocal");

        message.deferReply()

        const queue = await bot.player.nodes
            .create(message.guild, { metadata: { message: message }, volume: bot.volume });

        const track = await bot.player
            .search(song, { requestedBy: message.user })
            .then((x) => x.tracks[0]);

        if (!track) return message.reply("Aucune musique trouvée !");
        if (!queue.connection) await queue.connect(message.member.voice.channel);

        const nbViews = track.views.toLocaleString().replace(/ /g, "  ")
        let Embed = new EmbedBuilder()
            .setTitle('File d\'attente')
            .setDescription(`Votre musique a été ajoutée à la file d'attente !`)
            .setColor(bot.utils.getRandomColor())
            .setFields([
                { name: "Musique", value: `[${track.title}](${track.url})`, inline: true },
                { name: "Durée", value: `${track.duration}`, inline: true },
                { name: "Vues", value: `${nbViews}`, inline: true },
                { name: "Commande effectué par", value: `${track.requestedBy}`, inline: true },
                { name: "Volume", value: `${bot.volume} / 100`, inline: true },
            ])
            .setImage(track.thumbnail)

            .setTimestamp()

        await queue.play(track);
        if (!queue.node.isPlaying()) {
            const pause = new ButtonBuilder()
                .setCustomId('pause')
                .setLabel('Pause')
                .setStyle(ButtonStyle.Primary);

            const resume = new ButtonBuilder()
                .setCustomId('resume')
                .setLabel('Resume')
                .setStyle(ButtonStyle.Primary);

            const stop = new ButtonBuilder()
                .setCustomId('stop')
                .setLabel('Stop')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder()
                .addComponents(pause, resume, stop);
            await message.followUp({ embeds: [Embed], components: [row] })
            //.then((msg) => msg.pin())
        } else {

            const skip = new ButtonBuilder()
                .setCustomId('skip')
                .setLabel('Skip')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder()
                .addComponents(skip);
            await message.followUp({ embeds: [Embed], components: [row] })
        }
    },
};