function creationDays(date) {
    let now = new Date();
    let check = now.getTime() - date.getTime();
    let days = Math.floor(check / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};

const Discord = require("discord.js")
module.exports = {
    name: 'server-info',
    description: 'Gets the server info',
    aliases: ['server', 'serverinfo'],
    async execute(client, message, args) {
        message.delete()

        const info = new Discord.MessageEmbed()
        info.setAuthor = (`Server Information`)
        info.addFields(
            { name: `**Creation Date**`, value: `${message.guild.createdAt.toString().substr(0, 15)}, (${creationDays(message.guild.createdAt)})` },
            { name: `**Server ID**`, value: `${message.guild.id}` },
            { name: `Owner`, value: `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}` },
            { name: `Member Count`, value: `${message.guild.memberCount}` },
            { name: `Channel Count`, value: `${message.guild.channels.cache.size}` },
            { name: `Role Count`, value: `${message.guild.roles.cache.size}` },
        )
        .setThumbnail(client.config.main_config.server_logo)
        .setFooter(client.config.main_config.footer)
        .setColor(client.config.main_config.color)
        .setTimestamp();
    message.channel.send(info);

    if (client.config.log_toggle.general_logs !== true) return
    const log = new Discord.MessageEmbed()
        .setAuthor(`New Command Usage`)
        .addFields(
            { name: `Sent By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
            { name: `Command used`, value: `\`\`\`server-info\`\`\`` },
            { name: "Sent In", value: ` \`\`\`#${message.channel.name} (${message.channel.id})\`\`\`` }
        )
        .setThumbnail(client.config.main_config.server_logo)
        .setFooter(client.config.log_config.log_embed_footer)
        .setColor(client.config.log_config.log_embed_color)
        .setTimestamp()
    client.channels.cache.get(client.config.log_config.general_logs_channel).send(log)
}
}