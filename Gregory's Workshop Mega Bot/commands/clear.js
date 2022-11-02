const Discord = require('discord.js')
const client = new Discord.Client();
client.config = require('../config.js')

module.exports = {
    name: "clear",
    description: "clears messages",
    async execute(client, message, args) {
        message.delete()
        if (client.config.command_toggle.clear_command !== true) {
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

        if (client.config.main_config.error_messages !== "simple") {
            const error1 = new Discord.MessageEmbed()
                .setDescription(`Please enter the amount of messages you want to clear!`)
                .setFooter(client.config.main_config.footer)
                .setColor(client.config.main_config.error_color)
                .setTimestamp()
                if (!args[0]) return message.reply(error1);
        };

        if (client.config.main_config.error_messages !== "embed") {
            if (!args[0]) return message.reply("Please enter the amount of messages you want to clear!");
        }

        if (client.config.main_config.error_messages !== "simple") {
            const error2 = new Discord.MessageEmbed()
                .setDescription(`Please use a Number between 1-100!`)
                .setFooter(client.config.main_config.footer)
                .setColor(client.config.main_config.error_color)
                .setTimestamp()
                if (isNaN(args[0])) return message.reply(error2);
        };

        if (client.config.main_config.error_messages !== "embed") {
            if (isNaN(args[0])) return message.reply("Please use a Number between 1-100!");
        }

        if (client.config.main_config.error_messages !== "simple") {
            const error3 = new Discord.MessageEmbed()
                .setDescription(`You cant delete more than 100 messages! Please type a number between 1 and 100!`)
                .setFooter(client.config.main_config.footer)
                .setColor(client.config.main_config.error_color)
                .setTimestamp()
                if (args[0] > 100) return message.reply(error3);
        };

        if (client.config.main_config.error_messages !== "embed") {
            if (args[0] > 100) return message.reply('You cant delete more than 100 messages! Please type a number between 1 and 100!');
        }

        if (client.config.main_config.error_messages !== "simple") {
            const error4 = new Discord.MessageEmbed()
                .setDescription(`You cant delete negative numbers! Make sure to delete atleast 1 message!`)
                .setFooter(client.config.main_config.footer)
                .setColor(client.config.main_config.error_color)
                .setTimestamp()
                if (args[0] < 1) return message.reply(error4)
        };

        const msg = args.join(' ');
        await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
            message.channel.bulkDelete(messages);
            const cleared = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username} has cleared the chat`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`**${message.author.username}** has cleared **${msg}** amount of messages from the chat`)
                .setColor(client.config.main_config.color)
                .setFooter(client.config.main_config.footer)
            message.channel.send(cleared);
            const perms = client.config.command_perms.clear_perms
            if (message.member.roles.cache.some(h => perms.includes(h.id))) {

                if (client.config.log_toggle.clear_logs !== true) return
                const cleared = new Discord.MessageEmbed()
                    .setAuthor(`Messages Cleared`)
                    .addFields(
                        { name: `Cleared By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
                        { name: "Cleared In", value: ` \`\`\`#${message.channel.name} (${message.channel.id})\`\`\`` },
                        { name: "Amount Cleared", value: ` \`\`\`${msg}\`\`\`` }
                    )
                    .setFooter(client.config.main_config.footer)
                    .setColor(client.config.log_config.log_embed_color)
                    .setTimestamp()
                client.channels.cache.get(client.config.log_config.clear_logs_channel).send(cleared)
            } else {
                if (client.config.main_config.error_messages !== "simple") {
                    const noperms = new Discord.MessageEmbed()
                        .setDescription(`You do not have the correct permissions to use this command`)
                        .setFooter(client.config.main_config.footer)
                        .setColor(client.config.main_config.error_color)
                        .setTimestamp()
                    return message.channel.send(noperms).then(m => m.delete({ timeout: 10000 }))
                }
                else if (client.config.main_config.error_messages !== "embed") {
                    return message.channel.send(`You do not have the correct permissions to use this command`).then(m => m.delete({ timeout: 10000 }))
                }
            }
        }
    )}
}