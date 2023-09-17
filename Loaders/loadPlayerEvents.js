const fs = require('fs');

module.exports = async bot => {

    fs.readdirSync('./playerevents')
        .filter(f => f.endsWith(".js"))
        .forEach(async file => {
            let event = require(`../playerevents/${file}`);
            bot.player.on(file.split(".js").join(""), event.bind(null, bot));
            console.log(`Evènnement ${file} chargé avec succès !`);
        });

};