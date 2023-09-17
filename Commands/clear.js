const Discord = require("discord.js");

module.exports = {
    name: "clear",
    description: "Clear les messages du salon (par défaut 100)",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "Moderation",

    options: [
        {
            type: "number",
            name: "nombre",
            description: "Le nombre de message à supprimer",
            required: false,
            autocomplete: false,
        },
    ],

    async run(bot, message, args) {
        let nbMsg = args.getNumber("nombre");

        if (!nbMsg) nbMsg = 100;

        if (nbMsg > 100)
            return message.reply(
                "Le nombre de message ne peut pas être supérieur à 100 !"
            );

        const messages = await message.channel.messages.fetch({ limit: nbMsg });
        const messagesToDelete = messages.filter(
            (m) => Date.now() - m.createdTimestamp < 1209600 * 1000
        );

        if (messagesToDelete.size === 0) {
            return message.reply("Aucun message à supprimer !");
        } else if (messagesToDelete.size < nbMsg) {
            return message.reply(
                "Je ne peux pas supprimer les messages de plus de 2 semaines !"
            );
        } else {
            await message.channel.bulkDelete(messagesToDelete.size);
            message.reply(`J'ai supprimé ${nbMsg} messages !`);
        }
    },
};
