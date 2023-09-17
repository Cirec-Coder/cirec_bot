const Discord = require('discord.js');

module.exports = {

    name: 'code',
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
            let messageArray = message.content.split(' ');
            let language = messageArray[1];;
            messageArray.slice(1)
            let contents = messageArray.slice(2).join(' ');;
            // console.log("\`\`\`" + language + "\n" + contents + "\`\`\`");
            await message.reply({ content: "\`\`\`" + language + "\n" + contents + "\`\`\`", ephemeral: false });
            await message.delete();

        } catch (error) {
            // console.error(error);
        }
    }
}

// let content = message.options?.getString("content").value;
// content = content.split(/\`\`\`(?:\w+\n)?/).join("");
// await message.reply("\`\`\`"+language+"\`\`\`");
