const Discord = require('discord.js');
const { codeBlock } = require('discord.js');
/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.Interaction} interaction 
 */
module.exports = async (bot, interaction) => {

    if (interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

        let entry = interaction.options.getFocused();

        if (interaction.commandName === 'help') {

            let choices = bot.commands.filter(cmd => cmd.name.includes(entry))
            await interaction.respond(entry === "" ? bot.commands.map(cmd => ({ name: cmd.name, value: cmd.name })) : choices.map(choice => ({ name: choice.name, value: choice.name })))
        }
    }

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        let dir;
        bot.commands.filter(cmd => cmd.name === interaction.commandName)
            .map(cmd => dir = cmd.directory)
        let command = require(`../Commands/${dir ? dir : ""}${interaction.commandName}`);
        await command.run(bot, interaction, interaction.options, bot.db);
    }
    else if (interaction.type === Discord.InteractionType.ModalSubmit) {
        if (interaction.customId === "codeHighlighterModal") {
            const language = interaction.fields.getTextInputValue("language");
            const code = interaction.fields.getTextInputValue("code");

            const splitedCode = code.split("\n");
            const nbLines = splitedCode.length;
            let i = 0, newCodes = [], newCode = "", tmpLine = "";
            while (i < nbLines) {
                tmpLine = splitedCode[i];
                if (newCode.length + tmpLine.length + i + 1 < 1500) {
                    newCode += tmpLine + "\n";
                    i++;
                } else {
                    newCodes.push(newCode);
                    newCode = "";
                }
            }
            if (newCode) newCodes.push(newCode);

            await interaction.reply({ content: `Langage : **\` ${language} \`** ( ${code.length.toLocaleString()} Caractères )\n${codeBlock(language, newCodes[0])}`, ephemeral: false });

            for (let i = 1; i < newCodes.length; i++) {
                await interaction.channel.send({ content: codeBlock(language, newCodes[i]), ephemeral: false });
            }
        }
    }
    if (interaction.isButton()) {
        const { customId } = interaction;

        let dir;
        bot.commands.filter(cmd => cmd.name === customId)
            .map(cmd => dir = cmd.directory)
        let command = require(`../Commands/${dir ? dir : ""}${customId}`);
        await command.run(bot, interaction, interaction.options, bot.db);
    }
}