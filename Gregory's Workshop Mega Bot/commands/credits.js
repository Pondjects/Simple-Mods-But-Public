const Discord = require('discord.js')
const client = new Discord.Client();
client.config = require('../config.js')

module.exports = {
    name: "credits",
    description: "shows credits",
    async execute(client, message, args) {
        message.delete()

        const credits = new Discord.MessageEmbed()
        .setAuthor(`Mega Bot Credits`)
        .setDescription(`[@Crizzle#3587](https://discord.gg/Q7jNdCkmH8) [@GregoryDev#6527](https://discord.gg/y9vZ7xjAJE) - Main development of this bot \n\n If you wish to purchase this bot please click [here](https://discord.gg/Q7jNdCkmH8)`)
        .setThumbnail(`https://gregory-workshop.xyz/assets/logo.png`)
        .setColor(client.config.main_config.color)
        message.channel.send(credits)


        if (client.config.log_toggle.general_logs !== true) return
        const log = new Discord.MessageEmbed()
            .setAuthor(`New Command Usage`)
            .addFields(
                { name: `Sent By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
                { name: `Command used`, value: `\`\`\`credits\`\`\`` },
                { name: "Sent In", value: ` \`\`\`#${message.channel.name} (${message.channel.id})\`\`\`` }
            )
            .setThumbnail(client.config.main_config.server_logo)
            .setFooter(client.config.log_config.log_embed_footer)
            .setColor(client.config.log_config.log_embed_color)
            .setTimestamp()
        client.channels.cache.get(client.config.log_config.general_logs_channel).send(log)

    }
}

