const Discord = require('discord.js');
const { execute } = require('./readme');
const client = new Discord.Client({intents: Discord.Intents.ALL})
module.exports = {
    name : 'cutePiko',
    execute(message, args){
        message.react('<:cute:811844921128386601>');
        message.reply("파랑이 귀여워!");
    }
}