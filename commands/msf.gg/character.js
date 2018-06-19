const Commando = require('discord.js-commando');
const Heroes = require('../../assets/heroes.json');
const HeroThumbnails = require('../../assets/discord_hero_pics.json');
const Footer = require('../../assets/footer.json');
let bot
class CharacterCmd extends Commando.Command {
    constructor(client) {
        bot = client;
        super(client, {
            name: 'character',
            group: 'msf.gg',
            memberName: 'character',
            description: '',
            aliases: ['char']
        });
    }


    async run(message, args) {
        let Hs = []
        Object.keys(Heroes).forEach(function(key) {
            if (key.endsWith('Operator') || key.startsWith("S_") || key.startsWith("NUE")) {
            } else if (Heroes[key].Name.toLowerCase().includes(args.toLowerCase())) {
                Hs.push(key);
            }
        });

        if (Hs.length === 0) {
            message.channel.send('Could not find any characters that matched your search. Please broaden your search.')
        } else if (Hs.length > 6) {
            message.channel.send('There were too many results that matched your search. Please narrow your search.');
        } else {
            Hs.forEach(function(key) {
                let traits = '*' + (Heroes[key].traits + '').replace(/,/g, ', ') + '*';
                const embed = {
                    "color": HeroThumbnails[key].color,
                    "author": {
                        "name": Heroes[key].Name,
                        "url": 'https://msf.gg/characters/' + key,
                        "icon_url": HeroThumbnails[key].img
                    },
                    "description": traits + '\n' + Heroes[key].Description + '\n\n',
                    "footer": Footer
                };
                embed.description += '**__' + Heroes[key].basic_name + '__**\n\n**Ability Type:** Basic\n' + Heroes[key].basic[Heroes[key].basic.length - 1].replace(/<color=#[0-9|a-z]{6}>/g, '**').replace(/<\/color>/g, '**') 
                if (Heroes[key].special_name) {
                    embed.description += '\n\n**__' + Heroes[key].special_name + '__**\n\n**Ability Type:** Special\n' + Heroes[key].special[Heroes[key].special.length - 1].replace(/<color=#[0-9|a-z]{6}>/g, '**').replace(/<\/color>/g, '**') 
                }
                if (Heroes[key].passive_name) {
                    embed.description += '\n\n**__' + Heroes[key].passive_name + '__**\n\n**Ability Type:** Passive\n' + Heroes[key].passive[Heroes[key].passive.length - 1].replace(/<color=#[0-9|a-z]{6}>/g, '**').replace(/<\/color>/g, '**') 
                }
                if (Heroes[key].ultimate_name) {
                    embed.description += '\n\n**__' + Heroes[key].ultimate_name + '__**\n\n**Ability Type:** Ultimate\n' + Heroes[key].ultimate[Heroes[key].ultimate.length - 1].replace(/<color=#[0-9|a-z]{6}>/g, '**').replace(/<\/color>/g, '**') 
                }
                message.channel.send({
                    embed: embed
                });
            })
        }
    }
}
module.exports = CharacterCmd