const Discord = require('discord.js')
const client = new Discord.Client();
client.config = require('../config.js')

module.exports = {
    name: "suggest",
    description: "suggestion command",
    aliases: ["suggestion"],
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
        const m = args.join(' ');
        const guild = client.guilds.cache.get(client.config.main_config.server_id);
        const channel = message.guild.channels.cache.get(client.config.log_config.suggestion_channel)
        const suggest = new Discord.MessageEmbed()
            .setAuthor(`Suggestion From ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(m)
            .setColor(client.config.main_config.color)
            .setFooter(client.config.main_config.footer)
        channel.send(suggest).then(msg => {
            msg.react("👍"),
                msg.react("👎")
        }

        )

        const notify = new Discord.MessageEmbed()
            .setAuthor(`Thanks ${message.author.username} For the Suggestion!`)
            .setColor(client.config.main_config.color)
        message.channel.send(notify)

        if (client.config.log_toggle.suggestion_logs !== true) return
        const log = new Discord.MessageEmbed()
            .setAuthor(`New Suggestion`)
            .addFields(
                { name: `Suggested By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
                { name: `Suggestion`, value: `\`\`\`${m}\`\`\`` }
            )
            .setThumbnail(client.config.main_config.server_logo)
            .setFooter(client.config.log_config.log_embed_footer)
            .setColor(client.config.log_config.log_embed_color)
            .setTimestamp()
        client.channels.cache.get(client.config.log_config.general_logs_channel).send(log)

    }
}
