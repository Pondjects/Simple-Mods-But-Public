const Discord = require('discord.js')
const client = new Discord.Client();
client.config = require('../config.js')

module.exports = {
    name: "ping",
    description: "shows bots ping",
    async execute(client, message, args) {
        message.delete()

        const calculating = message.channel.send(`<@${message.author.id}>Calculating the ping...`).then((resultMessage,) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp

            const ping_reply = new Discord.MessageEmbed()
                .setDescription(`Bot latency: ${ping}, API Latency: ${client.ws.ping}`)
                .setAuthor(`📊 ${client.config.main_config.bot_name} Latency 📊`)
                .setColor(client.config.main_config.color)
                .setFooter(client.config.main_config.footer)
                .setThumbnail(client.config.main_config.server_logo)
            message.channel.send(ping_reply)

            if (client.config.log_toggle.general_logs !== true) return
            const log = new Discord.MessageEmbed()
                .setAuthor(`New Command Usage`)
                .addFields(
                    { name: `Sent By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
                    { name: `Command used`, value: `\`\`\`ping\`\`\`` },
                    { name: "Sent In", value: ` \`\`\`#${message.channel.name} (${message.channel.id})\`\`\`` }
                )
                .setThumbnail(client.config.main_config.server_logo)
                .setFooter(client.config.log_config.log_embed_footer)
                .setColor(client.config.log_config.log_embed_color)
                .setTimestamp()
            client.channels.cache.get(client.config.log_config.general_logs_channel).send(log)

        })
    }
}