const Discord = require('discord.js')
const client = new Discord.Client();
client.config = require('../config.js')

module.exports = {
    name: "kick",
    description: "kicks the mentioned user",
    async execute(client, message, args) {
        message.delete()
        if (client.config.command_toggle.kick_command !== true) {
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

        const perms = client.config.command_perms.kick_perms
        if (message.member.roles.cache.some(h => perms.includes(h.id))) {
            const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            const msg = args.splice(1).join(' ');
            if (!user) {
                if (client.config.main_config.error_messages !== "simple") {
                    const nomention = new Discord.MessageEmbed()
                        .setDescription(`You must mention a valid user to kick`)
                        .setFooter(client.config.main_config.footer)
                        .setColor(client.config.main_config.error_color)
                        .setTimestamp()
                    return message.channel.send(nomention).then(m => m.delete({ timeout: 10000 }))
                }
                if (client.config.main_config.error_messages !== "embed") {
                    return message.channel.send(`You must mention a valid user to kick`)
                }
            };
            if (!msg) {
                if (client.config.main_config.error_messages !== "simple") {
                    const nomessage = new Discord.MessageEmbed()
                        .setDescription(`You must provide a reason of the kick`)
                        .setFooter(client.config.main_config.footer)
                        .setColor(client.config.main_config.error_color)
                        .setTimestamp()
                    return message.channel.send(nomessage).then(m => m.delete({ timeout: 10000 }))
                }
                if (client.config.main_config.error_messages !== "embed") {
                    return message.channel.send(`You must provide a reason of the kick`)
                }
            };

            if (client.config.main_config.error_messages !== "simple") {
                const kick_dm_embed = new Discord.MessageEmbed()
                    .setAuthor(`New have been kicked from ${client.config.main_config.server_name}!`)
                    .setDescription(`**Kicked By:**\n${message.author.username} || (${message.author.id}) ||\n**Reason:**\n ${msg} \n **Notice:** \n This is not a direct message from the bot. This message has been sent via the \`${client.config.main_config.prefix}kick\` command from ${client.config.main_config.server_name}`)
                    .setFooter(client.config.main_config.footer)
                    .setColor("#17fc03")
                    .setTimestamp()
                user.user.send(kick_dm_embed)
            };
            if (client.config.main_config.error_messages !== "embed") {
                user.user.send(`**Kicked By:**\n${message.author.username} || (${message.author.id}) ||\n**Reason:**\n ${msg} \n **Notice:** \n This is not a direct message from the bot. This message has been sent via the \`${client.config.main_config.prefix}kick\` command from ${client.config.main_config.server_name}`).catch(err => console.log(`Error. Could not send the message to that user. More information: ${err}`))
            }

            if (client.config.log_toggle.kick_logs !== true) return
            const kicked = new Discord.MessageEmbed()
                .setAuthor(`New kick`)
                .addFields(
                    { name: `Kicked By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
                    { name: `Kicked User`, value: `\`\`\`${user.user.username} (${user.user.id})\`\`\`` },
                    { name: `Reason`, value: `\`\`\`${msg}\`\`\`` },
                    { name: "Kicked In", value: ` \`\`\`#${message.channel.name} (${message.channel.id})\`\`\`` }
                )
                .setFooter(client.config.main_config.footer)
                .setColor(client.config.log_config.log_embed_color)
                .setTimestamp()
            client.channels.cache.get(client.config.log_config.kick_logs_channel).send(kicked)

            if (client.config.main_config.error_messages !== "simple") {
                const nomessage = new Discord.MessageEmbed()
                    .setDescription(`User has been kicked`)
                    .setFooter(client.config.main_config.footer)
                    .setColor("#17fc03")
                    .setTimestamp()
                return message.channel.send(nomessage).then(m => m.delete({ timeout: 10000 })).then(async () => {
                    await user.kick()
                }).catch(async (e) => {
                    await user.kick()
                });
            }
            if (client.config.main_config.error_messages !== "embed") {
                return message.channel.send(`User has been kicked`).then(async () => {
                    await user.kick()
                }).catch(async (e) => {
                    await user.kick()
                });
            };

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