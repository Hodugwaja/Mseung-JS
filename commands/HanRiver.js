const Discord = require('discord.js');
const client = new Discord.Client({intents: Discord.Intents.ALL})
const axios = require('axios')

module.exports = {
    name : 'Hanriver',
    execute(message, args){
        axios({
            method : 'get',
            url : 'https://api.hangang.msub.kr/',
            responseType : 'stream '
        }).then(function(response){
            const hangangEmbed = new Discord.MessageEmbed()
                .setTitle("한강수온")
                .setDescription('현재 한강 수온입니다')
                .addField(`기준 시간`, `${response.data.time}`, true)
                .addField(`한강 수온`, `섭씨 ${response.data.temp}°C`, true)
                .addField(`기준 위치`, `${response.data.station}역 기준`, true)
                .setImage('https://cdn.pixabay.com/photo/2017/10/01/13/35/bridge-2805540_960_720.jpg')
                .setFooter('https://api.hangang.msub.kr/')
            const hangangFailEmbed = new Discord.MessageEmbed()
                .setTitle("한강수온")
                .setDescription(`한강 수온을 가져오기 실패했습니다`)
                .setFooter('https://api.hangang.msub.kr/')
            message.reply(response.data.status === "success" ? hangangEmbed : hangangFailEmbed);
            
        })
    }
}