const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

/**
 * 
 * @param {Discord.Client} bot 
 * @returns void
 */
module.exports = async bot => {

    function *walkSync(dir) {
        const files = fs.readdirSync(dir, { withFileTypes: true });
        for (const file of files) {
          if (file.isDirectory()) {
            yield* walkSync(path.join(dir, file.name));
          } else {
            yield path.join(dir, file.name);
          }
        }
      }
      
      for (const file of walkSync("./commands")) {
        let command = require(`../commands/${file.replace("commands\\", "").replace("\\", "/")}`)
        // console.log(file.slice(0, file.length - 3).replace("commands\\", "").replace("\\", ""))
        if (!command.name || typeof command.name !== 'string') throw new TypeError(`La Commande ${file.slice(0, file.length - 3)} n'a pas de nom !`); 
        bot.commands.set(command.name, command);
        console.log(`Commande ${file} chargée avec succès !`)
      }
};