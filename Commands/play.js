const Discord = require('discord.js');

module.exports = {

    name: 'play',
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

        let color = Math.floor(Math.random() * 16777215);

        let Embed = new Discord.EmbedBuilder()
            .setTitle('File d\'attente')
            .setDescription(`Votre musique a été ajoutée à la file d'attente !`)
            .setColor(color)
            .setFields([
                { name: "Musique", value: `[${track.title}](${track.url})`, inline: true },
                { name: "Durée", value: `${track.duration}`, inline: true },
                { name: "Vues", value: `${track.views}`, inline: true },
                { name: "Commande effectué par", value: `${track.requestedBy}`, inline: false },
            ])
            .setImage(track.thumbnail)
            
            .setTimestamp()


        // const pause = new Discord.ButtonBuilder()
        //     .setCustomId('pause')
        //     .setLabel('Pause')
        //     .setStyle(Discord.ButtonStyle.Primary);

        // const stop = new Discord.ButtonBuilder()
        //     .setCustomId('stop')
        //     .setLabel('Stop')
        //     .setStyle(Discord.ButtonStyle.Primary);

        // const row = new Discord.ActionRowBuilder()
        //     .addComponents(stop, pause);




        await queue.play(track);
        await message.followUp({ embeds: [Embed]/*, components: [row]*/ })
        // await message.followUp({
        // 	content: ``,
        // 	components: [row],
        // });
    },
};