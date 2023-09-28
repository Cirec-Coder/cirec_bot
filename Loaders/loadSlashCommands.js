const Discord = require('discord.js');
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord.js')

/**
 * 
 * @param {Discord.Client} bot 
 */
module.exports = async bot => {

    let commands = [];

    bot.commands.forEach(async command => {

        let slashCommand = new Discord.SlashCommandBuilder()
            .setName(command.name)
            .setDescription(command.description)
            .setDMPermission(command.dm)
            .setDefaultMemberPermissions(command.permission === "Aucune" ? null : command.permission)


        if (command.options?.length >= 1) {
            for (let i = 0; i < command.options.length; i++) {
                if (command.options[i].type === "string")
                slashCommand[`add${command.options[i].type.slice(0, 1).toUpperCase() + command.options[i].type.slice(1, command.options[i].type.length)}Option`]
                    (option => option.setName(command.options[i].name)
                        .setDescription(command.options[i].description)
                        .setAutocomplete(command.options[i].autocomplete)
                        .setRequired(command.options[i].required)
                    )
                else slashCommand[`add${command.options[i].type.slice(0, 1).toUpperCase() + command.options[i].type.slice(1, command.options[i].type.length)}Option`]
                    (option => option.setName(command.options[i].name)
                        .setDescription(command.options[i].description)
                        .setRequired(command.options[i].required)
                    )
            }
        }

        commands.push(slashCommand);
    });


            // console.log(commands)
    const comm = [
        {
            name: 'mdr',
            type: 2,
        },
        {
            name: 'pause',
            type: 2,
        },
        {
            name: 'skip',
            type: 2,
        },
        {
            name: 'code',
            type: 2,
        },
    ]
    const GUILD_ID = "1093245130800111737";//"1150761376747372554" 
    const rest = new REST({ version: "10" }).setToken(bot.token)

    await rest.put(Routes.applicationCommands(bot.user.id), {body: commands});
    console.log("✅ Les slashs commandes sont créées avec succès !")
}