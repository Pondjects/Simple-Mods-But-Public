const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const client = new Discord.Client();
client.config = require('../config.js')
const moment = require('moment');

module.exports = {
    name: 'user-info',
    description: 'Displays user info',
    aliases: ['userinfo', 'user'],
    async execute(client, message, args) {
        message.delete()
        const member = message.mentions.members.first() || message.guild.member(args[0]) || message.member;

        const status = message.member.presence.status;

        switch (status) {
            case 'online':
                status = 'Online';
                break;

            case 'invisible':
                status = 'Invisible';
                break;

            case 'оffline':
                status = 'Offline';
                break;

            case 'idle':
                status = 'Idle';
                break;

            case 'dnd':
                status = 'Do Not Disturb';
                break;
        }

        const inform2 = new MessageEmbed()
            .addFields(
                {name: `**Creation Date**`, value: `${moment(member.user.createdAt).format('MMMM Do YYYY')}`},
                {name: `**Date Joined**`, value: `${moment(member.joinedAt).format('MMMM Do YYYY')}`},
                {name: `Discord`, value: `${member.user} | (${member.user.tag})`},
                {name: `ID`, value:  `${member.id}`},
                {name: `Status`, value: `${status}`},
                {name: `Highest Role`, value: `${member.roles.highest}`},
            )
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter(client.config.main_config.footer)
            .setColor(client.config.main_config.color)
            .setTimestamp();
        message.channel.send(inform2);

        if (client.config.log_toggle.general_logs !== true) return
        const log = new Discord.MessageEmbed()
            .setAuthor(`New Command Usage`)
            .addFields(
                { name: `Sent By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
                { name: `Command used`, value: `\`\`\`user-info\`\`\`` },
                { name: "Sent In", value: ` \`\`\`#${message.channel.name} (${message.channel.id})\`\`\`` }
            )
            .setThumbnail(client.config.main_config.server_logo)
            .setFooter(client.config.log_config.log_embed_footer)
            .setColor(client.config.log_config.log_embed_color)
            .setTimestamp()
        client.channels.cache.get(client.config.log_config.general_logs_channel).send(log)
    }
}