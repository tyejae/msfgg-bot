const Commando = require('discord.js-commando');
let bot
class ClearAll extends Commando.Command {
    constructor(client) {
        bot = client;
        super(client, {
            name: 'unassign',
            group: 'ultimus',
            memberName: 'unassign',
            description: ''
        });
    }

    async run(message, args) {
        if (args.split(" ")[0] === 'all') {
            message.member.guild.members.forEach(function(guildMember, guildMemberId) {
                // console.log(guildMemberId, guildMember.user.username);
                if (message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
                    try {
                        let nickname = message.member.guild.members.get(guildMemberId).nickname;
                        if (nickname) {
                            nickname = nickname.substring(0, nickname.indexOf(' —'));
                            message.member.guild.members.get(guildMemberId).setNickname(nickname);
                        }
                    } catch (err) {
                        console.log(err)
                        return message.channel.send('I don\'t have permission to change ' + guildMember.user.username + '\'s nickname');
                    }
                } else {
                    return message.channel.send('I don\'t have permission to change nicknames, did you forget to give me permissions to do so?');
                }
                /**
                 * Removes the ST-# roles from the user and sets it to the correct one
                 */
                guildMember.roles.forEach(function(role, roleId) {
                    switch(role.name) {
                        case 'ST-1':
                        case 'ST-2':
                        case 'ST-3':
                            guildMember.removeRole(role);
                            break;
                    }
                });
            })
        } else {
            message.mentions.members.forEach(function(guildMember, guildMemberId) {
                if (message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
                    try {
                        let nickname = message.member.guild.members.get(guildMemberId).nickname;
                        if (nickname) {
                            nickname = nickname.substring(0, nickname.indexOf(' —'));
                            message.member.guild.members.get(guildMemberId).setNickname(nickname);
                        }
                        /**
                         * Removes the ST-# roles from the user and sets it to the correct one
                         */
                        guildMember.roles.forEach(function(role, roleId) {
                            switch(role.name) {
                                case 'ST-1':
                                case 'ST-2':
                                case 'ST-3':
                                    guildMember.removeRole(role);
                                    break;
                            }
                        });
                    } catch (err) {
                        console.log(err)
                        return message.channel.send('I don\'t have permission to change ' + guildMember.user.username + '\'s nickname');
                    }
                    
                } else {
                    return message.channel.send('I don\'t have permission to change nicknames, did you forget to give me permissions to do so?');
                }
            })
        }
    }
}
module.exports = ClearAll