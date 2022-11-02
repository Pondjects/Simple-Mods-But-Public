const Discord = require('discord.js')
const client = new Discord.Client();
client.config = require('../config.js')

module.exports = {
    name: "8ball",
    description: "simple 8-ball command",
    async execute(client, message, args) {
        message.delete();
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
        const Content = args.join(" ");

        if (!args[0]) {
            if (client.config.main_config.error_messages !== "simple"){
                const disabled = new Discord.MessageEmbed()
                    .setDescription(`Please ask me a full question`)
                    .setFooter(client.config.main_config.footer)
                    .setColor(client.config.main_config.error_color)
                    .setTimestamp()
                return message.channel.send(disabled).then(m => m.delete({ timeout: 10000 }))
            };

            if (client.config.main_config.error_messages !== "embed"){
                return message.channel.send(`Please ask me a full question`).then(m => m.delete({ timeout: 10000 }))
            }
        }

        const replies = ["Yes", "No", "No u", "Who asked", "Dont ask me", "I dont know and i dont care", "Sheesh", "Lets Goooo", "Who .......... Asked", "When ....... Did i ask", "Piss off", "I dont like you anymore", "Stop bullying", "Shush", "Possibly", "Not too sure", "Leave me alone", "👍", "👎", "Im taking doing a poo, leave me alone!", "Idk", "Idk are they?", "You tell me!"];
        const result = Math.floor((Math.random() * replies.length));
        const msg = args.join(' ');

        const ball = new Discord.MessageEmbed()
            .setDescription (`**Question**\n${msg}\n**Answer**\n${replies[result]}`)
            .setColor(client.config.main_config.color)
            .setFooter(client.config.main_config.footer)
            .setTimestamp()
        message.channel.send(ball)

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