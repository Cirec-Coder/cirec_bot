module.exports = async (bot, member) => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'logs');
	if (!channel) return;

	channel.send(`${member} nous as quitté... Nous sommes plus que ${member.guild.memberCount} sur le serveur !`);
}