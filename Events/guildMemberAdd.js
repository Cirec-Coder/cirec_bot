const Discord = require("discord.js");

module.exports = async (bot, member) => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'logs');
	if (!channel) return;

	let Embed = new Discord.EmbedBuilder()
		.setTitle(`Bienvenue sur ${member.guild.name}, ${member.user.tag}`)
		.setDescription(`Nous sommes ravi de t'accueillir \n Nous sommes désormais ${member.guild.memberCount} sur le serveur !`)
		.setColor(bot.color)
		.setFooter({text: "Bienvenue"})
		.setThumbnail(member.user.displayAvatarURL({dynamic: true}))
		.setTimestamp()

	channel.send({embeds: [Embed]});
}