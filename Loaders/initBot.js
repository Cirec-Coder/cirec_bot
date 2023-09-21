const Discord = require('discord.js');
const Player = require('discord-player')
const loadCommands = require('../Loaders/loadCommands');
const loadEvents = require('../Loaders/loadEvents');
const loadPlayerEvents = require('../Loaders/loadPlayerEvents');
/**
 * 
 * @param {Discord.Client} bot 
 * @returns void
 */
module.exports = async bot => {

    bot.player = new Player.Player(bot, {
        leaveOnEnd: true,
        leaveOnEmpty: true,
        initialVolume: 2,
        ytdlOptions: {
            filter: "audioonly",
            quality: "highestaudio",
            highWaterMark: 1 << 25,
            bufferingTimeout: 3000,
        }
    })
    
    // console.log(bot.player.eventNames()) 
    bot.volume = 20;
    bot.color = "#ffffff";
    // bot.function = {
    //     rank: require('../Fonctions/rank'),
    //     createId: require('../Fonctions/createId'),
    //     getRandomColor: require('../Fonctions/getRandomColor'),
    // }

    bot.utils = require('../Modules/utils')

    bot.myEmojis = {
        information: "❓",
        musique: "🎶",
        recherche: "🔎",
        humour: "🥳",
        moderation: "✍",
        code: "📝"
    };
    const { YouTubeExtractor, SpotifyExtractor } = require('@discord-player/extractor');

    bot.player.extractors.register(YouTubeExtractor, SpotifyExtractor);
    // bot.player.extractors.loadDefault();


    bot.commands = new Discord.Collection();

    bot.login(process.env.TOKEN).then(() =>
        console.log(`Robot ${bot.user.tag} chargé avec succès !`)).catch(console.error);

    loadCommands(bot);
    loadEvents(bot);
    loadPlayerEvents(bot);

    return //bot
}