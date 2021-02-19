const distube = require('distube');

module.exports.run = async (bot, message, args) => {
    if (!message.member.voice.channel) return message.channel.send('음성채널에 들어가 있지 않았습니다');
    
    const music = args.join(" ");

    bot.distube.play(message, music)
}

module.exports.config = {
    name: "play",
    aliases: ['p']
}
