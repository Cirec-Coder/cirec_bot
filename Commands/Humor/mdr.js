const Discord = require('discord.js');

module.exports = {

    name: 'mdr',
    directory: 'humor/',
    description: 'Répond avec un gif mdr ',
    permission: 'Aucune',
    dm: false,
    category: 'Humour',


    options: [
        {
            type: "number",
            name: "nombre",
            description: "Le le numéro du gif lassez vide pour aléatoire",
            required: false,
            autocomplete: false,
        },
    ],
    /**
    * 
    * @param {Discord.Client} bot 
    * @param {Discord.Interaction} message 
    * @param {Discord.CommandInteractionOptionResolver} args 
    * @returns 
    */
    async run(bot, message, args) {

        let gifNum = args.getNumber("nombre");


        const mdrArray = [
            "https://tenor.com/view/muppets-old-laughing-lol-thats-funny-gif-16437157",
            "https://tenor.com/view/lmao-spit-take-cracking-up-haha-so-funny-omg-gif-17921247",
            "https://tenor.com/view/haha-funny-lol-laughing-out-loud-giggle-gif-15515505",
            "https://tenor.com/view/rigolo-youn-mickael-cest-rigolo-hein-gif-26661857",
            "https://tenor.com/view/bart-simpson-haha-laughing-lol-funny-gif-20417725",
        ]
        // ( ͡° ͜ʖ ͡°) \n 
        if (!gifNum || gifNum < 0 || gifNum > mdrArray.length) { 
            gifNum = Math.floor(Math.random() * mdrArray.length) ;
        }
        await message.reply({ content: `${mdrArray[gifNum]}`, ephemeral: false })
    }
}