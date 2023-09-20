require('dotenv').config();
const Discord = require('discord.js');
const intents = new Discord.IntentsBitField(3276799);

const bot = new Discord.Client({ intents });
const initBot = require('../Loaders/initBot');

initBot(bot);

