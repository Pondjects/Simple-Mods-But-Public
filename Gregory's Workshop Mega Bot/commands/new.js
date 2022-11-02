const Discord = require('discord.js')
const client = new Discord.Client();
client.config = require('../config.js')

module.exports = {
    name: "new",
    description: "Ticket Command",
    aliases: ["ticket"],
    async execute(client, message, args) {
        message.delete();
        if (client.config.command_toggle.ticket_commands !== true) {
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

        if (message.channel.id !== client.config.ticket_config.open_ticket_channelID) {
            if (client.config.main_config.error_messages !== "simple") {
                const disabled = new Discord.MessageEmbed()
                    .setDescription(`This command can only be used in <#${client.config.ticket_config.open_ticket_channelID}>`)
                    .setFooter(client.config.main_config.footer)
                    .setColor(client.config.main_config.error_color)
                    .setTimestamp()
                return message.channel.send(disabled).then(m => m.delete({ timeout: 10000 }))
            };
            if (client.config.main_config.error_messages !== "embed") {
                return message.channel.send(`This command can only be used in <#${client.config.ticket_config.open_ticket_channelID}>`).then(m => m.delete({ timeout: 10000 }))
            }
        };

        const channel = await message.guild.channels.create(`${message.author.username} ticket`);
        channel.setParent(client.config.ticket_config.ticket_category);
        channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false,
        });
        channel.updateOverwrite(message.author, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true,
        });

        const ticketmsg = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username} Please patiently wait for support!`, message.author.displayAvatarURL({ dyanmic: true }))
            .setDescription(client.config.ticket_config.open_ticket_message)
            .setFooter(client.config.main_config.footer)
            .setColor(client.config.main_config.color)
            .setTimestamp()
        channel.send(ticketmsg)

        channel.send(`<@&${client.config.ticket_config.ticket_staff_ping}>`).then(m => m.delete({ timeout: 1000 }))
        channel.send(`<@&${message.author.id}>`).then(m => m.delete({ timeout: 1000 }))

        const success = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username} Your ticket has been opened!`, message.author.displayAvatarURL({ dyanmic: true }))
            .setDescription(`I have created your ticket head over to ${channel} to view it`)
            .setFooter(client.config.main_config.footer)
            .setColor(client.config.main_config.color)
            .setTimestamp()
        message.channel.send(success).then(m => m.delete({ timeout: 7000 }))

        if (client.config.log_toggle.new_ticket_logs !== true) return
        const log = new Discord.MessageEmbed()
            .setAuthor(`New Ticket Opened`)
            .addFields(
                { name: `Opened By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
                { name: `Command used`, value: `\`\`\`new\`\`\`` },
                { name: "Opened In", value: ` \`\`\`#${message.channel.name} (${message.channel.id})\`\`\`` }
            )
            .setThumbnail(client.config.main_config.server_logo)
            .setFooter(client.config.log_config.log_embed_footer)
            .setColor(client.config.log_config.log_embed_color)
            .setTimestamp()
        client.channels.cache.get(client.config.log_config.new_ticket_logs_channel).send(log)
    }
}
