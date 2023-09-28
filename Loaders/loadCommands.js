const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

/**
 * 
 * @param {Discord.Client} bot 
 * @returns void
 */
module.exports = async bot => {

// Cette fonction génératrice parcourt récursivement un répertoire et génère les chemins de tous les fichiers qu'elle trouve.

function* walkSync(dir) {
  // Lire le contenu du répertoire de manière synchrone (bloquante).
  const files = fs.readdirSync(dir, { withFileTypes: true });

  // Parcourir chaque élément (fichier ou répertoire) dans le répertoire actuel.
  for (const file of files) {
    // Vérifier si l'élément est un répertoire.
    if (file.isDirectory()) {
      // Si c'est un répertoire, appeler récursivement la fonction sur ce sous-répertoire.
      // Le chemin complet du sous-répertoire est obtenu en joignant le chemin actuel et le nom du sous-répertoire.
      yield* walkSync(path.join(dir, file.name));
    } else {
      // Si ce n'est pas un répertoire, c'est un fichier.
      // Générer le chemin complet du fichier en joignant le chemin actuel et le nom du fichier.
      // Utiliser "yield" pour générer le chemin du fichier sans interrompre complètement la fonction.
      yield path.join(dir, file.name);
    }
  }
}

  for (const file of walkSync("./commands")) {
    let command = require(`../commands/${file.replace("commands\\", "").replace("\\", "/")}`)
    // console.log(file.slice(0, file.length - 3).replace("commands\\", "").replace("\\", ""))
    if (!command.name || typeof command.name !== 'string') throw new TypeError(`La Commande ${file.slice(0, file.length - 3)} n'a pas de nom !`);
    bot.commands.set(command.name, command);
    console.log(`✅ Commande ${file} chargée avec succès !`)
  }
};