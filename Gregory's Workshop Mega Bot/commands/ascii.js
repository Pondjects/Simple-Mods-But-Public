const Discord = require('discord.js')
const client = new Discord.Client();
client.config = require('../config.js')
const figlet = require("figlet");
const { promisify } = require("util");
const figletAsync = promisify(figlet);

module.exports = {
    name: "ascii",
    description: "Turns text into line art",
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
        const Content = args.join(" ");

        message.delete()

        if (client.config.main_config.error_messages !== "embed"){
        if (!Content) return message.channel.send(`Please enter some text to turn into ascii!`);
        }
        if (client.config.main_config.error_messages !== "simple"){
            const text_error = new Discord.MessageEmbed()
            .setAuthor(`Error`)
            .setDescription(`Please enter some text to turn into ascii!`)
            .setColor(client.config.main_config.color)
            .setColor(client.config.main_config.footer)
            if (!Content) return message.channel.send(text_error);
            }

        const Result = await figletAsync(Content);
        const msg = args.join(' ');

        message.channel.send("```" + Result + "```");

        if (client.config.log_toggle.fun_commands_logs !== true) return
        const log = new Discord.MessageEmbed()
            .setAuthor(`New Fun Command Usage`)
            .addFields(
                { name: `Sent By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
                { name: `Command used`, value: `\`\`\`ascii\`\`\`` },
                { name: `Ascii Text`, value: `\`\`\`${msg}\`\`\`` },
                { name: "Sent In", value: ` \`\`\`#${message.channel.name} (${message.channel.id})\`\`\`` }
            )
            .setThumbnail(client.config.main_config.server_logo)
            .setFooter(client.config.log_config.log_embed_footer)
            .setColor(client.config.log_config.log_embed_color)
            .setTimestamp()
        client.channels.cache.get(client.config.log_config.fun_commands_logs_channel).send(log)

    }
};