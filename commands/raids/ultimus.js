const Commando = require('discord.js-commando');
const Request = require('request');
let bot
class CharacterCmd extends Commando.Command {
    constructor(client) {
        bot = client;
        super(client, {
            name: 'ultimus',
            group: 'raids',
            memberName: 'ultimus',
            description: 'Use this command to set the lane for your ultimus raid.',
            aliases: ['ultimus', 'ult']
        });
    }

    

    async run(message, args) {
        args = args.replace(/  /g, ' ').split(" ");
        if (args.length < 3 || args.length > 3) {
            message.channel.send('You are using this command incorrectly. Use ```!help ultimus``` to learn more.')
                .then(msg => msg.delete(2000));
        } else {
            let mention = message.mentions.members.first();
            let arg1 = args[0];
            let arg2 = args[1];
            let arg3 = args[2];
            return message.channel.send(mention.id)
                .then( msg => msg.delete(2000) )
                .catch(console.error);
        }
        message.delete(2000);
        // Request('https://run.tyejae.com/services/getAvailableTeams', function (error, response, body) {
        //     if (!error && response.statusCode == 200) {
        //         // console.log(body) // Print the google web page.
        //         var json = 'fail';
        //         try {
        //             json = JSON.parse(body);
        //             message.channel.send(json[0].teamname);
        //         } catch (ex) {
        //             message.channel.send(ex);
        //         }
        //     } else {
        //         message.channel.send(error)
        //     }
        // })
    }
}
module.exports = CharacterCmd
