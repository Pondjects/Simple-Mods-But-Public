const Discord = require('discord.js')
const client = new Discord.Client();
client.config = require('../config.js')

module.exports = {
    name: "rename",
    description: "rename a ticket",
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

        const perms = client.config.command_perms.rename_perms
        if (message.member.roles.cache.some(h => perms.includes(h.id))) {

            const new_name = args.join("-")
            const tick_name = new_name + '-ticket'


            const renamed = new Discord.MessageEmbed()
                .setAuthor(`Ticket Renamed`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Ticket successfully renamed`)
                .setFooter(client.config.main_config.footer)
                .setColor(client.config.main_config.color)
            message.channel.send(renamed)
            message.channel.setName(tick_name)

            if (client.config.log_toggle.rename_ticket_logs !== true) return
            const log = new Discord.MessageEmbed()
                .setAuthor(`New Command Usage`)
                .addFields(
                    { name: `Sent By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
                    { name: `Command used`, value: `\`\`\`help\`\`\`` },
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
            } else {
                if (client.config.main_config.error_messages !== "simple") {
                    const noticket = new Discord.MessageEmbed()
                        .setDescription(`This is not a ticket, please run this command in a ticket!`)
                        .setFooter(client.config.main_config.footer)
                        .setColor(client.config.main_config.error_color)
                        .setTimestamp()
                    return message.channel.send(noticket).then(m => m.delete({ timeout: 10000 }))
                }
                else if (client.config.main_config.error_messages !== "embed") {
                    return message.channel.send(`This is not a ticket, please run this command in a ticket!`).then(m => m.delete({ timeout: 10000 }))
                }
            }
        }
    }
}



