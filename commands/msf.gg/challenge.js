const Commando = require('discord.js-commando');
const Challenges = require('../../assets/challenges.json');
const Footer = require('../../assets/footer.json');
const Moment = require('moment-timezone');
let bot
class CharacterCmd extends Commando.Command {
    constructor(client) {
        bot = client;
        super(client, {
            name: 'challenge',
            group: 'msf.gg',
            memberName: 'challenge',
            description: 'Displays which challenges are currently running in game. (!chal for short)',
            aliases: ['challenges', 'chal']
        });
    }

    

    async run(message, args) {
        let c = [];
        let d = Moment();
        let n = d.day();

        const dayString = (Cs) => {
            let dayString = '';
            Cs.forEach(function(challenge) {
                dayString += `\n— ${challenge}`;
            })
            return dayString;
        };
        const dow = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ]
        Object.keys(Challenges.GameData).forEach(function(key) {
            if (Challenges.GameData[key].m_requirements.dayOfWeek) {
                if (Challenges.GameData[key].m_requirements.dayOfWeek.includes(n)) {
                    c.push(Challenges.GameData[key].m_name)
                }
            }
        })
        const embed = {
            "color": 0,
            "author": {
                "name": `Challenges for ${dow[n]}`
            },
            "footer": Footer
        };
        embed.description = dayString(c);
        return message.channel.send({ embed: embed })
            .then(msg => console.log('Sent challenges to channel'))
            .catch(console.error);
    }
}
module.exports = CharacterCmd