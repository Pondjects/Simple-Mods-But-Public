const Discord = require('discord.js')
const client = new Discord.Client();
client.config = require('../config.js')
const axios = require('axios');

module.exports = {
    name: "meme",
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
        const url = 'https://some-random-api.ml/meme';

        let data, response;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            if (client.config.main_config.error_messages !== "simple") {
                const error1 = new Discord.MessageEmbed()
                .setDescription(`An error has occured, try again later!`)
                .setFooter(client.config.main_config.footer)
                .setColor(client.config.main_config.error_color)
                .setTimestamp()
                return message.channel.send(error1)
                };
            if (client.config.main_config.error_messages !== "embed") {
            return message.channel.send(`An error has occured, try again later!`)
            }
        }

        const meme = new Discord.MessageEmbed()
            .setTitle(`${message.author.username} Here is your meme!`)
            .setFooter(client.config.main_config.footer)
            .setDescription(data.caption)
            .setColor(client.config.main_config.color)
            .setImage(data.image)

        message.channel.send(meme)
        message.delete().catch(O_o=>{});

        if (client.config.log_toggle.fun_commands_logs !== true) return
        const log = new Discord.MessageEmbed()
            .setAuthor(`New Fun Command Usage`)
            .addFields(
                { name: `Sent By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
                { name: `Command used`, value: `\`\`\`meme\`\`\`` },
                { name: `Meme`, value: `\`\`\`${data.image}\`\`\`` },
                { name: "Sent In", value: ` \`\`\`#${message.channel.name} (${message.channel.id})\`\`\`` }
            )
            .setThumbnail(client.config.main_config.server_logo)
            .setFooter(client.config.log_config.log_embed_footer)
            .setColor(client.config.log_config.log_embed_color)
            .setTimestamp()
        client.channels.cache.get(client.config.log_config.fun_commands_logs_channel).send(log)
    }
}