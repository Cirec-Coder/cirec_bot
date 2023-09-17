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
            description: "Le nom de la misique à jouer",
            required: true,
            autocomplete: false,
        }
    ],

    async run(bot, message, args) {
        let song = args.getString("musique");
        if (!message.member.voice.channel) return message.reply("Tu n'es pas en vocal !");
        if ((await message.guild.members.fetchMe()).voice.channel && (await message.guild.members.fetchMe()).voice.channel.id !== message.member.voice.channel.id) return message.reply("Nous ne somme pas dans le même salon vocal");

        message.deferReply()

        // console.log(bot.player.createQueue)
        const queue = await bot.player.nodes.create(message.guild, { metadata: { message: message } })
        const track = await bot.player.search(song, { requestBy: message.user })
            .then(x => x.tracks[0])
        if (!track) return message.reply("Aucune musique trouvée !")

        if (!queue.connection) await queue.connect(message.member.voice.channel)
        await queue.play(track)
        message.followUp(`La musique ${track.title} a été ajoué à la file d'attente avec succès !`)
    }
}
