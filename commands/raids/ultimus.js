const Commando = require('discord.js-commando');
const Request = require('request');
let bot
class UltimusCmd extends Commando.Command {
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
                .then( msg => { msg.delete(2000); message.delete(2000); } )
                .catch(console.error);
        } else {
            let mention = message.mentions.members.first();
            let arg1 = args[0];
            let arg2 = args[1];
            let arg3 = args[2];
            var postBody = {
                url: 'https://run.tyejae.com/services/setLane',
                body: JSON.stringify({
                    id: mention.id,
                    raid: 'ultimus',
                    team: arg2,
                    lane: arg3
                }),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              };
            Request.post(postBody, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    return message.channel.send(`Assignment set for ${mention.displayName}!`)
                        .catch(console.error);
                } else {
                    message.channel.send(error)
                }
            });
        }
    }
}
module.exports = UltimusCmd
