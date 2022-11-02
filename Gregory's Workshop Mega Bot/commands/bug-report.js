const Discord = require('discord.js')
const client = new Discord.Client();
client.config = require('../config.js')

module.exports = {
    name: "bug-report",
    description: "report a bug",
    aliases: ['bug'],
    async execute(client, message, args) {
        message.delete()
        if (client.config.command_toggle.bug_report_command !== true) {
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
        const msg = args.join(' ');
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

        if (client.config.log_toggle.bug_report_logs !== true) return
        const reported = new Discord.MessageEmbed()
            .setAuthor(`We have a new bug report`)
            .addFields(
                { name: `Reported By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
                { name: `Report`, value: `\`\`\`${msg}\`\`\`` },
                { name: "Sent In", value: ` \`\`\`#${message.channel.name} (${message.channel.id})\`\`\`` }
            )
            .setFooter(client.config.main_config.footer)
            .setColor("#fc0303")
            .setTimestamp()
            client.channels.cache.get(client.config.log_config.bug_report_logs_channel).send(reported)

        if (client.config.main_config.error_messages !== "simple") {
            const bug_sent = new Discord.MessageEmbed()
                .setDescription(`Your report has been sent`)
                .setFooter(client.config.main_config.footer)
                .setColor("#17fc03")
                .setTimestamp()
            return message.channel.send(bug_sent).then(m => m.delete({ timeout: 10000 }))
        }
        if (client.config.main_config.error_messages !== "embed") {
            return message.channel.send(`Your report has been sent`)
        };
    }
}