const Discord = require('discord.js')
const client = new Discord.Client();
client.config = require('../config.js')

module.exports = {
    name: "dm",
    description: "sends message as bot",
    async execute(client, message, args) {
        message.delete()
        if (client.config.command_toggle.dm_command !== true) {
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

        const perms = client.config.command_perms.dm_perms
        if (message.member.roles.cache.some(h => perms.includes(h.id))) {

            const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (client.config.main_config.error_messages !== "simple") {
                const no_user = new Discord.MessageEmbed()
                    .setDescription(`Please mention a user to dm`)
                    .setFooter(client.config.main_config.footer)
                    .setColor(client.config.main_config.error_color)
                    .setTimestamp()
                if (!user) return message.channel.send(no_user)
            };
            if (client.config.main_config.error_messages !== "embed") {
                if (!user) return message.channel.send(`Please mention a user to dm`);
            }
            const dm = args.splice(1).join(' ');
            if (client.config.main_config.error_messages !== "simple") {
                const dm_msg_req = new Discord.MessageEmbed()
                    .setDescription(`Please send some type of message`)
                    .setFooter(client.config.main_config.footer)
                    .setColor(client.config.main_config.error_color)
                    .setTimestamp()
                if (!dm) return message.channel.send(dm_msg_req)
            };
            if (client.config.main_config.error_messages !== "embed") {
                if (!dm) return message.channel.send("Please send some type of message");
            }

            if (client.config.main_config.error_messages !== "simple") {
                const dm_msg_req = new Discord.MessageEmbed()
                    .setAuthor(`New Direct Message from ${client.config.main_config.bot_name}`)
                    .setDescription(`**Message:**\n${dm}\n**Notice:**\nThis is not a direct message from the bot. This message has been sent by **${message.author.username}** ** || (${message.author.id}) || **, from **${client.config.main_config.server_name}**`)
                    .setFooter(client.config.main_config.footer)
                    .setColor(client.config.main_config.color)
                    .setTimestamp()
                user.user.send(dm_msg_req)
            };
            if (client.config.main_config.error_messages !== "embed") {
                user.user.send(dm).catch(err => console.log(`Error. Could not send the message to that user. More information: ${err}`))
            }
            if (client.config.log_toggle.dm_logs !== true) return
            const dms = new Discord.MessageEmbed()
                .setAuthor(`New Direct Message Sent`)
                .addFields(
                    { name: `Sent By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
                    { name: `Sent to`, value: `\`\`\`${user.user.username} (${user.user.id})\`\`\`` },
                    { name: `Message`, value: `\`\`\`${dm}\`\`\`` },
                    { name: "Sent In", value: ` \`\`\`#${message.channel.name} (${message.channel.id})\`\`\`` }
                )
                .setFooter(client.config.main_config.footer)
                .setColor(client.config.log_config.log_embed_color)
                .setTimestamp()
            client.channels.cache.get(client.config.log_config.dm_logs_channel).send(dms)
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