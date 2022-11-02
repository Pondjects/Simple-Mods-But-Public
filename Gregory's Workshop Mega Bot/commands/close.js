const Discord = require('discord.js')
const client = new Discord.Client();
client.config = require('../config.js')

module.exports = {
    name: "close",
    description: "A close ticket command",
    async execute(client, message, args) {
        message.delete();
        if (client.config.command_toggle.fun_commands !== true) {
            if (client.config.main_config.error_messages !== "simple") {
                const disabled = new Discord.MessageEmbed()
                    .setDescription(`This Command Is Disabled Within The \`config.js\` File!`)
                    .setFooter(client.config.main_config.footer)
                    .setColor(client.config.main_config.error_color)
                    .setTimestamp()
                return message.channel.send(disabled).then(m => m.delete({ timeout: 10000 }))
            };

            if (client.config.main_config.error_messages !== "embed") {
                return message.channel.send(`This Command Is Disabled Within The \`config.js\` File!`).then(m => m.delete({ timeout: 10000 }))
            }
        };

        if(!message.channel.name.endsWith(`-ticket`)){
            if (client.config.main_config.error_messages !== "simple") {
                const disabled = new Discord.MessageEmbed()
                    .setDescription(`You can only use this command in tickets`)
                    .setFooter(client.config.main_config.footer)
                    .setColor(client.config.main_config.error_color)
                    .setTimestamp()
                return message.channel.send(disabled).then(m => m.delete({ timeout: 10000 }))
            };

            if (client.config.main_config.error_messages !== "embed") {
                return message.channel.send(`You can only use this command in tickets`).then(m => m.delete({ timeout: 10000 }))
            }
        }

        const perms = client.config.command_perms.close_perms
        if (message.member.roles.cache.some(h => perms.includes(h.id))) {
            setTimeout(function(){(message.channel.delete()); }, 5000);

            const closingmsg = new Discord.MessageEmbed()
                .addFields(
                    { name: "Closing Ticket", value :"This ticket will close in 5 seconds"},
                    { name: "Notice", value: `To open another ticket just head over to <#${client.config.ticket_config.open_ticket_channelID}>`}
                )
                .setFooter(client.config.main_config.footer)
                .setColor(client.config.main_config.color)
                .setTimestamp()
            message.channel.send(closingmsg)

            if (client.config.log_toggle.general_logs !== true) return
            const log = new Discord.MessageEmbed()
                .setAuthor(`New Command Usage`)
                .addFields(
                    { name: `Sent By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
                    { name: `Command used`, value: `\`\`\`close\`\`\`` },
                    { name: "Sent In", value: ` \`\`\`#${message.channel.name} (${message.channel.id})\`\`\`` }
                )
                .setThumbnail(client.config.main_config.server_logo)
                .setFooter(client.config.log_config.log_embed_footer)
                .setColor(client.config.log_config.log_embed_color)
                .setTimestamp()
            client.channels.cache.get(client.config.log_config.general_logs_channel).send(log)

        } else {
            if (client.config.main_config.error_messages !== "simple") {
                const noperms = new Discord.MessageEmbed()
                    .setDescription(`You have incorrect permissions for this command`)
                    .setFooter(client.config.main_config.footer)
                    .setColor(client.config.main_config.error_color)
                    .setTimestamp()
                return message.channel.send(noperms).then(m => m.delete({ timeout: 10000 }))
            }
            else if (client.config.main_config.error_messages !== "embed") {
                return message.channel.send(`You have incorrect permissions for this command`).then(m => m.delete({ timeout: 10000 }))
            }
        }
    }
}