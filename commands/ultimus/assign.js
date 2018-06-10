const Commando = require('discord.js-commando');
let bot
class Nick extends Commando.Command {
    constructor(client) {
        bot = client;
        super(client, {
            name: 'assign',
            group: 'ultimus',
            memberName: 'assign',
            description: ''
        });
    }

    async run(message, args) {
        let argArray = args.replace(/  /g, ' ').split(" ");
        let member = message.mentions.members.first();
        // message.mentions.members.forEach(function(guildMember, guildMemberId) {
            if (message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
                /**
                 * Sets the nickname of the user
                 */
                try {
                    let nickname = member.nickname;
                    if (nickname !== null) {
                        nickname = nickname.substring(0, nickname.indexOf(' —'));
                    }
                    if (nickname === null) {
                        nickname = member.user.username;
                    }
                    member.setNickname(nickname + ' — ST' + argArray[1] + '-' + argArray[2] );
                } catch (err) {
                    console.log(err)
                    return message.channel.send('I don\'t have permission to change ' + member.user.username + '\'s nickname');
                }

                /**
                 * Removes the ST-# roles from the user and sets it to the correct one
                 */
                member.roles.forEach(function(role, roleId) {
                    switch(role.name) {
                        case 'ST-1':
                        case 'ST-2':
                        case 'ST-3':
                            if (!role.name.includes(argArray[1])) {
                                member.removeRole(role);
                            }
                            break;
                    }
                });

                let role = message.guild.roles.find("name", "ST-" + argArray[1]);
                if (role !== null) {
                    member.addRole(role).catch(console.error);
                }

            } else {
                return message.channel.send('I don\'t have permission to change nicknames, did you forget to give me permissions to do so?');
            }
        // })
    }
}
module.exports = Nick