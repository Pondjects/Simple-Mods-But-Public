const Discord = require('discord.js')
const client = new Discord.Client();
client.config = require('../config.js')

module.exports = {
    name: "flip-coin",
    description: "coin flip command",
    aliases: ['coin', 'flip'],
    async execute(client, message, args) {
        if (client.config.command_toggle.fun_commands !== true) {
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

        message.delete()

        const replies = ["Heads", "Tails"];
        const result = Math.floor((Math.random() * replies.length));
        const msg = args.join(' ');

        const coin = new Discord.MessageEmbed()
            .setDescription(`Your coin landed on **${replies[result]}**`)
            .setColor(client.config.main_config.color)
        message.channel.send(coin)


        if (client.config.log_toggle.fun_commands_logs !== true) return
        const log = new Discord.MessageEmbed()
            .setAuthor(`New Fun Command Usage`)
            .addFields(
                { name: `Sent By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
                { name: `Command used`, value: `\`\`\`coin-flip\`\`\`` },
                { name: `Coin Landed On`, value: `\`\`\`${replies[result]}\`\`\`` },
                { name: "Sent In", value: ` \`\`\`#${message.channel.name} (${message.channel.id})\`\`\`` }
            )
            .setThumbnail(client.config.main_config.server_logo)
            .setFooter(client.config.log_config.log_embed_footer)
            .setColor(client.config.log_config.log_embed_color)
            .setTimestamp()
        client.channels.cache.get(client.config.log_config.fun_commands_logs_channel).send(log)

    }
}

