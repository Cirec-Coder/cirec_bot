const Discord = require('discord.js');

module.exports = {

    name: 'warn',
    directory: 'moderation/',
    description: 'Warn un membre ',
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: true,
    category: 'Moderation',
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à warn",
            required: true,
            autocomplete: false,
        },
        {
            type: "string",
            name: "raison",
            description: "La raison du warn",
            required: false,
            autocomplete: false,
        },

    ],


    async run(bot, message, args, db) {

        let user = args.getUser("membre");
        if (!user) return message.reply("Pas de membre");
        let membre = message.guild.members.cache.get(user.id);
        if (!membre) return message.reply("Pas de membre");

        let raison = args.getString("raison");
        if (!raison) raison = "Pas de raison fournie";
       
        if (message.user.id === user.id) return message.reply("Essaie pas de te warn !");
        if ((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne warn pas le propriétaire du serveur !");
        if (message.member.roles.highest.comparePositionTo(membre.roles.highest) <= 0) return message.reply("Tu ne peux pas warn ce membre !")    
        if ((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(membre.roles.highest) <= 0) return message.reply("Le robot ne peut pas warn ce membre !")    ;

        try {
            await user.send(`${message.user.tag} vous a warn sur le serveur : ${message.guild.name} pour la raison : \`${raison} \``)
        } catch (err) {}

        await message.reply(`Vous avez warn ${user.tag} pour la raison : \`${raison} \` avec succès !`);

        let ID = await bot.utils.createId("WARN");

        db.query(`INSERT INTO warns (guild, user, author, warn, reason, date) VALUES ('${message.guild.id}', '${user.id}', '${message.user.id}', '${ID}', '${raison.replace(/'/g, "\\'")}', '${Date.now()}')`);
    }
}
