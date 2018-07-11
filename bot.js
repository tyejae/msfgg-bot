const Commando = require('discord.js-commando');
const client = new Commando.Client();

client.login('NDU1MzY4Njk3NTAzMTU0MTg4.DgnxnQ.giYVDSfgkVzCe3quihlA92B4i48');

client.registry.registerGroup('msf.gg', 'MSG.GG');
client.registry.registerGroup('raids', 'raids');
client.registry.registerCommandsIn(__dirname + "/commands");
client.registry.registerDefaults();