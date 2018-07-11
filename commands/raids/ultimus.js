const Commando = require('discord.js-commando');
const Challenges = require('../../assets/challenges.json');
const Footer = require('../../assets/footer.json');
const Moment = require('moment-timezone');
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
        return message.channel.send('WIP')
            .then(msg => console.log('Sent challenges to channel'))
            .catch(console.error);
    }
}
module.exports = CharacterCmd