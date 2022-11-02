const Discord = require('discord.js')
const client = new Discord.Client();
client.config = require('../config.js')

module.exports = {
    name: "rules",
    description: "Shows server rules",
    async execute(client, message, args) {
        message.delete()
        if (client.config.command_toggle.rule_command !== true) {
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
        const Content = args.join(" ");

        const rule_embed = new Discord.MessageEmbed()
        .setAuthor(`Server Rules`)
            .setDescription(`${client.config.main_config.server_rules}`)
            .setFooter(client.config.main_config.footer)
            .setColor(client.config.main_config.color)
            .setThumbnail(client.config.main_config.server_logo)
            .setTimestamp()
        message.channel.send(rule_embed)


        if (client.config.log_toggle.general_logs !== true) return
        const log = new Discord.MessageEmbed()
            .setAuthor(`New Command Usage`)
            .addFields(
                { name: `Sent By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
                { name: `Command used`, value: `\`\`\`rules\`\`\`` },
                { name: "Sent In", value: ` \`\`\`#${message.channel.name} (${message.channel.id})\`\`\`` }
            )
            .setThumbnail(client.config.main_config.server_logo)
            .setFooter(client.config.log_config.log_embed_footer)
            .setColor(client.config.log_config.log_embed_color)
            .setTimestamp()
        client.channels.cache.get(client.config.log_config.general_logs_channel).send(log)

    }
};