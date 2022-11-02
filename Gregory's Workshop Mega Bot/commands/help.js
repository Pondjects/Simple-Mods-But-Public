const Discord = require('discord.js')
const client = new Discord.Client();
client.config = require('../config.js')
const pagination = require('discord.js-pagination')

module.exports = {
    name: "help",
    description: "A multipage help menu",
    aliases: ['commands'],
    async execute(client, message, args) {

        const prefix = client.config.main_config.prefix

        message.delete()

        const page1 = new Discord.MessageEmbed()
            .setAuthor(`Mega Bot Help Menu`)
            .setThumbnail(`https://cdn.discordapp.com/attachments/975057529484767262/979462504591798282/CD_Logo_2.png`)
            .setDescription(`This is Gregory's Workshop Mega Bot. In this menu you can see all of the featured comands. Click the arrows at the bottom to change`)
            .setColor(client.config.main_config.color)

        const page2 = new Discord.MessageEmbed()
            .setAuthor(`Mega Bot Credits`)
            .setDescription(`To purchase this bot join https://discord.gg/y9vZ7xjAJE   `)
            .setThumbnail(`https://gregory-workshop.xyz/assets/logo.png`)
            .setColor(client.config.main_config.color)

        const page3 = new Discord.MessageEmbed()
            .setAuthor(`Mega Bot Information Commands`)
            .setDescription(`\`${[prefix]}bug-report\`\nSends in a bug report.\n \`${[prefix]}credits\`\nDisplays the credits page. \n \`${[prefix]}help\`\nShows this menu.\n \`${[prefix]}intro\`\nIntroduces command author.\n \`${[prefix]}outro\`\nOutroduces command author.\n \`${[prefix]}ping\`\nCalculates and shows the bots latency.\n\`${[prefix]}report\`\nReports mentioned user.\n\`${[prefix]}rules\`\nDisplays the server rules.\n\`${[prefix]}server-info\`\nAll the server information.\n\`${[prefix]}suggest\`\nCreates a suggestion.\n\`${[prefix]}ticket-panel\`\nShows ticket panel\n\`${[prefix]}user-info\`\nDisplays user information`)
            .setThumbnail(`https://gregory-workshop.xyz/assets/logo.png`)
            .setColor(client.config.main_config.color)

        const page4 = new Discord.MessageEmbed()
            .setAuthor(`Mega Bot Fun Commands`)
            .setDescription(`\`${[prefix]}8ball\`\n8ball that gives random answer.\n\`${[prefix]}ascii\`\nMakes text into line art.\n\`${[prefix]}dice\`\nWorks just like a dice.\n\`${[prefix]}flip-coin\`\nFlips a coin.\n\`${[prefix]}how-gay\`\nTells you how gay you are.\n\`${[prefix]}meme\`\nShows you "funny" meme.`)
            .setThumbnail(`https://gregory-workshop.xyz/assets/logo.png`)
            .setColor(client.config.main_config.color)

        const page5 = new Discord.MessageEmbed()
            .setAuthor(`Mega Bot Admin Commands`)
            .setDescription(`\`${[prefix]}ban\`\nBans mentioned user.\n\`${[prefix]}dm\`\nSends a direct message to user.\n\`${[prefix]}do-not-type\`\nSends a message saying do not type.\n\`${[prefix]}kick\`\nKicks mentioned user.\n\`${[prefix]}say\`\nSends custom mesasge as bot.\n\`${[prefix]}sayem\`\nEmbeds a custom message.\n\`${[prefix]}warn\`\nWarns mentioned user.`)
            .setThumbnail(`https://gregory-workshop.xyz/assets/logo.png`)
            .setColor(client.config.main_config.color)

        const page6 = new Discord.MessageEmbed()
            .setAuthor(`Mega Bot Ticket Commands`)
            .setDescription(`\`${[prefix]}add-user\`\nAdds the mentioned user into ticket.\n\`${[prefix]}close\`\nCloses the ticket that command is ran in.\n\`${[prefix]}new\`\nOpens a ticket (can only be used in <#${client.config.ticket_config.open_ticket_channelID}>).\n\`${[prefix]}remove-user\`\nRemoved user from ticket.\n\`${[prefix]}rename\`\nRenames the ticket that command ran in.`)
            .setThumbnail(`https://gregory-workshop.xyz/assets/logo.png`)
            .setColor(client.config.main_config.color)

        const pages = [
            page1,
            page2,
            page3,
            page4,
            page5,
            page6
        ]
        const emoji = ["⏮️", "⏭️"]
        const timeout = '60000'
        pagination(message, pages, emoji, timeout)

        if (client.config.log_toggle.general_logs !== true) return
        const log = new Discord.MessageEmbed()
            .setAuthor(`New Command Usage`)
            .addFields(
                { name: `Sent By`, value: `\`\`\`${message.author.username} (${message.author.id})\`\`\`` },
                { name: `Command used`, value: `\`\`\`help\`\`\`` },
                { name: "Sent In", value: ` \`\`\`#${message.channel.name} (${message.channel.id})\`\`\`` }
            )
            .setThumbnail(client.config.main_config.server_logo)
            .setFooter(client.config.log_config.log_embed_footer)
            .setColor(client.config.log_config.log_embed_color)
            .setTimestamp()
        client.channels.cache.get(client.config.log_config.general_logs_channel).send(log)


    }
}