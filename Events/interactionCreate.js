const Discord = require('discord.js');

module.exports = async (bot, interaction) => {

    if (interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {
        // console.log(arg)
        
        let entry = interaction.options.getFocused();

        if (interaction.commandName === 'help') { 

            let choices = bot.commands.filter(cmd => cmd.name.includes(entry))
            await interaction.respond(entry === "" ? bot.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choices.map(choice => ({name: choice.name, value: choice.name})))
        }
        // command.run(bot, interaction, interaction.options)
    }

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        // console.log(arg)
        
        let command = require(`../Commands/${interaction.commandName}`);
        command.run(bot, interaction, interaction.options, bot.db);
    }

    // if (interaction.type === Discord.InteractionType.MessageComponent) {
    //     let command = require(`../Commands/${interaction.commandName}`);
    //     command.run(bot, interaction)
    // }
}