const Discord = require('discord.js')
const client = new Discord.Client();
client.config = require('../config.js')

module.exports = {
    name: "report",
    description: "report a player",
    aliases: ['player-report'],
    async execute(client, message, args) {
        message.delete()
        if (client.config.command_toggle.player_report_command !== true) {
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
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const msg = args.splice(1).join(' ');
        if (!user) {
            if (client.config.main_config.error_messages !== "simple") {
                const nomention = new Discord.MessageEmbed()
                    .setDescription(`You must enter someone to report`)
                    .setFooter(client.config.main_config.footer)
                    .setColor(client.config.main_config.error_color)
                    .setTimestamp()
                return message.channel.send(nomention).then(m => m.delete({ timeout: 10000 }))
            }
            if (client.config.main_config.error_messages !== "embed") {
                return message.channel.send(`You must enter someone to report`)
            }
        };
        if (!msg) {
            if (client.config.main_config.error_messages !== "simple") {
                const nomessage = new Discord.MessageEmbed()
                    .setDescription(`You must enter a reason of this report`)
                    .setFooter(client.config.main_config.footer)
                    .setColor(client.config.main_config.error_color)
                    .setTimestamp()
                return message.channel.send(nomessage).then(m => m.delete({ timeout: 10000 }))
            }
            if (client.config.main_config.error_messages !== "embed") {
                return message.channel.send(`You must enter a reason of this report`)
            }
        };

        if (client.config.log_toggle.player_report_logs !== true) return
        const reported = new Discord.MessageEmbed()
            .setAuthor(`We have a new player report`)
            .addFields(
                { name: `Reported By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
                { name: `Reported User`, value: `\`\`\`${user.user.username} (${user.user.id})\`\`\`` },
                { name: `Report`, value: `\`\`\`${msg}\`\`\`` },
                { name: "Sent In", value: ` \`\`\`#${message.channel.name} (${message.channel.id})\`\`\`` }
            )
            .setFooter(client.config.main_config.footer)
            .setColor(client.config.log_config.log_embed_color)
            .setTimestamp()
            client.channels.cache.get(client.config.log_config.player_report_logs_channel).send(reported)

        if (client.config.main_config.error_messages !== "simple") {
            const nomessage = new Discord.MessageEmbed()
                .setDescription(`Your report has been sent`)
                .setFooter(client.config.main_config.footer)
                .setColor("#17fc03")
                .setTimestamp()
            return message.channel.send(nomessage).then(m => m.delete({ timeout: 10000 }))
        }
        if (client.config.main_config.error_messages !== "embed") {
            return message.channel.send(`Your report has been sent`)
        };
    }
}