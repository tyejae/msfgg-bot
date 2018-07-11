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
        Request('https://run.tyejae.com/services/getAvailableTeams', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body) // Print the google web page.
                var json = 'fail';
                try {
                    json = JSON.parse(response);
                    message.channel.send(json);
                } catch (ex) {
                    message.channel.send(ex);
                }
            } else {
                message.channel.send(error)
            }
        })
        return message.channel.send('WIP')
            .then(msg => console.log('Sent challenges to channel'))
            .catch(console.error);
    }
}
module.exports = CharacterCmd
