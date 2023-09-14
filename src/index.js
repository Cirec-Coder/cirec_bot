require('dotenv').config();
const Discord = require('discord.js');
const intents = new Discord.IntentsBitField(3276799);


const bot = new Discord.Client({ intents });
const loadCommands = require('../Loaders/loadCommands');
const loadEvents = require('../Loaders/loadEvents');

bot.commands = new Discord.Collection();
bot.login(process.env.TOKEN).then(() =>
    console.log(`Robot ${bot.user.tag} chargé avec succès !`)).catch(console.error);

loadCommands(bot);
loadEvents(bot);

