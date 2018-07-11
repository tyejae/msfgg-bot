const Commando = require('discord.js-commando');
const Request = require('request');
let bot
class LaneCmd extends Commando.Command {
    constructor(client) {
        bot = client;
        super(client, {
            name: 'lane',
            group: 'raids',
            memberName: 'lane',
            description: 'Use this command to get your lane assignments. (Uses !ln or !ln @user)',
            aliases: ['lane', 'ln']
        });
    }

    

    async run(message, args) {
        args = args.replace(/  /g, ' ').split(" ");
        let id = args[0];
        message.channel.send(`id: '${args[0]}'`)
        if (args[0] === '') {
            id = message.author.id;
        } else {
            let mention = message.mentions.members.first();
            if (mention) {
                id = mention.id;
            } else {
                message.channel.send('You are using this command incorrectly. Use ```!help lane``` to learn more.')
                    .then( msg => { msg.delete(2000); message.delete(2000); } )
                    .catch(console.error);
            }
        }
        // message.channel.send(id).then(msg => msg.delete(1000));
        if (id > 0) {
            Request(`https://run.tyejae.com/services/getLane?id=${id}`, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    try {
                        let json = JSON.parse(body);
                        let member = message.guild.members.array().forEach(member => {
                            if (member.id === id) {
                                message.channel.send(member.displayName);
                            }
                        });
                        
                        // message.channel.send(json);
                        
                    } catch (ex) {
                        message.channel.send(ex);
                    }
                } else {
                    message.channel.send(error)
                }
            })
        }
    }
}
module.exports = LaneCmd
