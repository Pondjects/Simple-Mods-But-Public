const Discord = require('discord.js')
const client = new Discord.Client();
client.config = require('../config.js')

module.exports = {
    name: "remove-user",
    description: "remove user from ticket command",
    aliases: ["remove"],
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

        if (!message.channel.name.endsWith(`-ticket`)) {
            if (client.config.main_config.error_messages !== "simple") {
                const disabled = new Discord.MessageEmbed()
                    .setDescription(`This command can only be ran in tickets`)
                    .setFooter(client.config.main_config.footer)
                    .setColor(client.config.main_config.error_color)
                    .setTimestamp()
                return message.channel.send(disabled).then(m => m.delete({ timeout: 10000 }))
            };

            if (client.config.main_config.error_messages !== "embed") {
                return message.channel.send(`This command can only be ran in tickets`).then(m => m.delete({ timeout: 10000 }))
            }
        }
        const perms = client.config.command_perms.add_remove_user_perms
        if (message.member.roles.cache.some(h => perms.includes(h.id))) {
            const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!user) {
                if (client.config.main_config.error_messages !== "simple") {
                    const disabled = new Discord.MessageEmbed()
                        .setDescription(`You must mention someone to remove from this ticket`)
                        .setFooter(client.config.main_config.footer)
                        .setColor(client.config.main_config.error_color)
                        .setTimestamp()
                    return message.channel.send(disabled).then(m => m.delete({ timeout: 10000 }))
                };

                if (client.config.main_config.error_messages !== "embed") {
                    return message.channel.send(`You must mention someone to remove from this ticket`).then(m => m.delete({ timeout: 10000 }))
                }
            };

            const removed = new Discord.MessageEmbed()
                .setAuthor(`New user removed from ticket`)
                .addFields(
                    { name: "Added By", value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
                    { name: "User Added", value: `\`\`\`${user.user.username} (${user.user.id})\`\`\`` },
                    { name: "Notice", value: `You can add this user back by doing \`${client.config.main_config.prefix}add ${user.user.id}\`` }
                )
                .setFooter(client.config.main_config.footer)
                .setColor(client.config.main_config.color)
                .setTimestamp()
            message.channel.send(removed)


            if (client.config.log_toggle.add_remove_user_logs !== true) return
            const log = new Discord.MessageEmbed()
                .setAuthor(`New Command Usage`)
                .addFields(
                    { name: `Sent By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
                    { name: `Command used`, value: `\`\`\`remove-user\`\`\`` },
                    { name: "User Added", value: `\`\`\`${user.user.username} (${user.user.id})\`\`\`` } ,
                    { name: "Sent In", value: ` \`\`\`#${message.channel.name} (${message.channel.id})\`\`\`` }
                )
                .setThumbnail(client.config.main_config.server_logo)
                .setFooter(client.config.log_config.log_embed_footer)
                .setColor(client.config.log_config.log_embed_color)
                .setTimestamp()
            client.channels.cache.get(client.config.log_config.add_remove_user_logs_channel).send(log)

            const channel = message.channel
            channel.updateOverwrite(user, {
                SEND_MESSAGE: false,
                VIEW_CHANNEL: false,
            });
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
}