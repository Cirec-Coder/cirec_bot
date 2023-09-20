const Discord = require('discord.js');

module.exports = {

    name: 'code',
    directory: 'code/',
    description: 'Affiche du code avec la coloration syntaxique ',
    permission: 'Aucune',
    dm: true,
    category: 'Code',
    // options: [
    //     {
    //         type: "string",
    //         name: "language",
    //         description: "Le langage du code posté",
    //         required: false,
    //         autocomplete: false,
    //     },
    //     {
    //         type: "string",
    //         name: "content",
    //         description: "Le code à poster",
    //         required: false,
    //         autocomplete: false,
    //     },

    // ],


    async run(bot, message) {
        try {
            // console.log(message);
            let messageArray = message.content.split(' ');
            let language = messageArray[1];;
            messageArray.slice(1)
            let contents = messageArray.slice(2).join(' ');;
            await message.reply({ content: "\`\`\`" + language + "\n" + contents + "\`\`\`\nAuteur : " + message.author.globalName + ` à : <t:${Math.floor(Date.now() / 1000)}:F> !` , ephemeral: false });
            await message.delete();

        } catch (error) {
            // console.error(error);
        }
    }
}
