const Discord = require('discord.js')
const client = new Discord.Client();
client.config = require('../config.js')

module.exports = {
    name: "ticket-panel",
    description: "sends the ticket-panel",
    async execute(client, message, args) {
        message.delete()
        if (client.config.command_toggle.ticket_panel !== true) {
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

        const perms = client.config.command_perms.ticket_panel_perms
        if (message.member.roles.cache.some(h => perms.includes(h.id))) {

            const panel = new Discord.MessageEmbed()
                .setAuthor(`${client.config.main_config.server_name} Ticket Panel`)
                .setDescription(`To create a ticket just type the following \`\`\`${client.config.main_config.prefix}new\`\`\``)
                .setFooter(client.config.main_config.footer)
                .setColor(client.config.main_config.color)
                .setThumbnail(client.config.main_config.server_logo)
            message.channel.send(panel)


            if (client.config.log_toggle.general_logs !== true) return
            const log = new Discord.MessageEmbed()
                .setAuthor(`New Command Usage`)
                .addFields(
                    { name: `Sent By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
                    { name: `Command used`, value: `\`\`\`ticket-panel\`\`\`` },
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
                    .setDescription(`You do not have the correct permissions to use this command`)
                    .setFooter(client.config.main_config.footer)
                    .setColor(client.config.main_config.error_color)
                    .setTimestamp()
                return message.channel.send(noperms).then(m => m.delete({ timeout: 10000 }))
            }
            else if (client.config.main_config.error_messages !== "embed") {
                return message.channel.send(`You do not have the correct permissions to use this command`).then(m => m.delete({ timeout: 10000 }))
            }
        }
    }
};