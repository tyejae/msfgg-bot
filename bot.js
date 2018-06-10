const Commando = require('discord.js-commando');
const client = new Commando.Client();

client.login(process.env.BOT_TOKEN);

client.registry.registerGroup('ultimus', 'Ultimus');
client.registry.registerCommandsIn(__dirname + "/commands");
client.registry.registerDefaults();