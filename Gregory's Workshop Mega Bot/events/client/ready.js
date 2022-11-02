const Discord = require('discord.js')
const client = new Discord.Client();
const config = require('..//..//config.js')
const nodelogger = require('hyperz-nodelogger')
require('discord-buttons')(client);
const memberCounter = require('..//..//config.js')

module.exports = (client) => {
    const logger = new nodelogger()
    logger.hypelogger(`${config.main_config.bot_name}`, '1000', 'blue', `Made By Crizzle#3587 and GregoryDev#6527`, 'disabled', 'blue', 'single', false)
    console.log(`Developed and being updated by GregoryDev#6527 | You can buy here https://discord.gg/y9vZ7xjAJE https://gregory-workshop.xyz/store/megabot-greg`)
};
process.on('unhandledRejection', (err) => { 
    console.log(`\nFATAL ERROR: \n\n`, err.stack)
 });