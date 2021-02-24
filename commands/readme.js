const Discord = require('discord.js');
const client = new Discord.Client({intents: Discord.Intents.ALL})
////const config = require('../config.json');
module.exports = {
    name : 'readme',
    execute(message, args){
        const readmeEmbed = new Discord.MessageEmbed()
            .setTitle("해당 봇을 이용하기 위한 도움말입니다")
            .setDescription("M생톤을 위해 만든 기능들(추후 TypeSript화 시킬 예정)")
            .addField(`${process.env.prefix}(초대 or 초대코드)`, `봇을 초대할 수 있는 초대코드를 받을 수 있습니다`)
            .addField(`${process.env.prefix}(재생 or 음원찾기) (링크 or 검색어)`, `링크 혹은 검색어를 통해 음악을 틀 수 있습니다(음성 채널 들어가야함)`)
            .addField(`${process.env.prefix}(반복)`, `현재 재생 중인 음악을 반복 할 수 있습니다`)
            .addField(`${process.env.prefix}(스킵 or 다음)`, `현재 재생중인 곡을 중지하고 재생목록에 있는 다음곡으로 넘어감`)     
            .addField(`${process.env.prefix}(큐 or 목록 or 재생목록)`, `재생목록을 볼 수 있습니다`)
            .addField(`${process.env.prefix}(나가 or 정지)`, `음악과 관련된 모든 것을 정지하고 음성 채널을 나갑니다`)
            .addField(`${process.env.prefix}(한강수온 or 한강)`, `현재 한강수온을 볼 수 있습니다`)
            .addField(`${process.env.prefix}KBO (연도) (월) (일)`, `해당 날짜의 KBO 경기 결과를 볼 수 있습니다`)
            .addField(`${process.env.prefix}코로나19`, `코로나19 현황을 볼 수 있습니다`)
            .setFooter('호두과자#2022', 'https://cdn.discordapp.com/avatars/811070880846446593/e0021d819dce387e4809a323c1cf0d30.webp?size=128')
        message.reply(readmeEmbed)
    }
}