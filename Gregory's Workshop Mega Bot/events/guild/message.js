module.exports = (Discord, client, message) => {
    client.config = require('..//..//config.js')
    if (!message.content.startsWith(client.config.main_config.prefix) || message.author.bot) return;
    const args = message.content.slice(client.config.main_config.prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    const user = message.mentions.users.first()
    if (command) command.execute(client, message, args, Discord);
    else if (!command) {
        message.delete();
        if (client.config.main_config.error_messages !== "simple") {
            const misspelt = new Discord.MessageEmbed()
                .setDescription(`${message.author} You miss-spelt a command or this command does not exist. I suggest using \`${client.config.main_config.prefix}help\` to find out if the command exists.`)
                .setFooter(client.config.main_config.footer)
                .setColor(client.config.main_config.error_color)
                .setTimestamp()
            return message.channel.send(misspelt)
        };
        if (client.config.main_config.error_messages !== "embed") {
            return message.channel.send(`${message.author} You miss-spelt a command or this command does not exist. I suggest using \`${client.config.main_config.prefix}help\` to find out if the command exists.`)
        }
    }
}
