const Discord = require("discord.js");
const client = new Discord.Client();
client.config = require('./config.js');
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["event", "command"].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

const activities_list = [
    { type: `${client.config.status_config.type1}`, message: `${client.config.status_config.name1}` },
    { type: `${client.config.status_config.type2}`, message: `${client.config.status_config.name2}` },
    { type: `${client.config.status_config.type3}`, message: `${client.config.status_config.name3}` }
];

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);

        client.user.setActivity(activities_list[index].message, { type: activities_list[index].type });
    }, 10000);
});

if (client.config.command_toggle.member_counter_VC == true) {
client.once('ready', () => {
    console.log(`${client.user.tag} is now online!`)
    setInterval(() => {
        let Guild = client.guilds.cache.get(client.config.main_config.server_id)
        let GuildSize = Guild.memberCount.toLocaleString();
        let MainChannel = Guild.channels.cache.get(client.config.log_config.member_counter_vc_channel);
        MainChannel.setName(`Total Members: ${GuildSize}`);
    }, 5000);
})
}

client.on('message', message => {
    if (message.channel.type === 'dm'){ 
     console.log(`New dm from ${message.author.username}: `, message.content)

     if (client.config.log_toggle.dm_logs !== true) return
     const dms = new Discord.MessageEmbed()
         .setAuthor(`New Direct Message Sent To The Bot`)
         .addFields(
             { name: `Sent By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
             { name: `Message`, value: `\`\`\`${message.content}\`\`\`` }
         )
         .setFooter(client.config.main_config.footer)
         .setColor(client.config.log_config.log_embed_color)
         .setTimestamp()
     client.channels.cache.get(client.config.log_config.dm_logs_channel).send(dms)

}

});


//////////////////////////////////////////////////////////////////// Welcome Messages And Logs \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
client.on('guildMemberAdd', member => {
    if (client.config.command_toggle.welcome_enabled == true) {
        member.roles.add(client.config.welcome_config.welcome_role)
        const welcome = new Discord.MessageEmbed()
            .setAuthor(`${member.user.username} Has Joined ${client.config.main_config.server_name}!`)
            .setDescription(`Welcome **${member.user.username}** **(${member.user.id})** to **${client.config.main_config.server_name}** we hope you enjoy your stay! \n\n **Notice** \n ${client.config.welcome_config.welcome_notice}`)
            .setFooter(client.config.main_config.footer)
            .setColor(client.config.main_config.color)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        client.channels.cache.get(client.config.welcome_config.welcome_channel).send(welcome)
    }
});

client.on('guildMemberAdd', member => {
    if (client.config.log_toggle.welcome_logging == true) {
        const welcomelog = new Discord.MessageEmbed()
            .setAuthor(`New Member`)
            .addFields(
                { name: `Member Joined`, value: `\`\`\`${member.user.username} (${member.user.id})\`\`\`` }
            )
            .setFooter(client.config.main_config.footer)
            .setColor(client.config.log_config.logging_color)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        client.channels.cache.get(client.config.log_config.welcome_logging_channel).send(welcomelog)
    }
});

//////////////////////////////////////////////////////////////////// Leave Messages And Logs \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

client.on('guildMemberRemove', member => {
    if (client.config.command_toggle.leave_enabled == true) {
        const leave = new Discord.MessageEmbed()
            .setAuthor(`${member.user.username} Has Joined ${client.config.main_config.server_name}!`)
            .setDescription(`Goodbye **${member.user.username}** **(${member.user.id})**`)
            .setFooter(client.config.main_config.footer)
            .setColor(client.config.main_config.color)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        client.channels.cache.get(client.config.leave_config.leave_channel).send(leave)
    }
});

client.on('guildMemberRemove', member => {
    if (client.config.log_toggle.leave_logging == true) {
        const leavelog = new Discord.MessageEmbed()
            .setAuthor(`Member Left`)
            .addFields(
                { name: `Member Left`, value: `\`\`\`${member.user.username} (${member.user.id})\`\`\`` }
            )
            .setFooter(client.config.main_config.footer)
            .setColor(client.config.log_config.logging_color)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        client.channels.cache.get(client.config.log_config.leave_logging_channel).send(leavelog)
    }
});

//////////////////////////////////////////////////////////////////// Deleted Message Logging \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
client.on('messageDelete', message => {
    if (client.config.log_toggle.deleted_message_logs == true) {
        if (message.author && message.author.bot) return
        const deletedmsg = new Discord.MessageEmbed()
            .setAuthor(`New Deleted Message`)
            .addFields(
                {name: `Sent By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\``},
                {name: `Deleted In`, value: `\`\`\`#${message.channel.name} (${message.channel.id})\`\`\``},
                {name: `Deleted Message`, value: `\`\`\`${message.content}\`\`\``}
            )
            .setFooter(client.config.log_config.log_embed_footer)
            .setThumbnail(client.config.main_config.server_logo)
            .setColor(client.config.log_config.log_embed_color)
            .setTimestamp()
        client.channels.cache.get(client.config.log_config.deleted_message_logging_channel).send(deletedmsg)
    }
})

client.login(client.config.main_config.token)