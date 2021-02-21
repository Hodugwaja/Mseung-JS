module.exports = {
    name : 'covid19',
    execute(message, args){
        axios.get('https://api.corona-19.kr/korea/?serviceKey=jdJyFz4etxkcXWrni3fu16S5TsHhBpCUw').then(function(response){
            const covid19Embed = new Discord.MessageEmbed()
                .setTitle('코로나19 현황')
                .setDescription(response.data.updateTime)
                .addField(`확진자`, `${response.data.TotalCase}명`,true)
                .addField(`감염자`, `${response.data.NowCase}명`, true)
                .addField(`격리중`, `${response.data.TotalCase}명`, true)
                .addField(`확진자`, `${response.data.TotalCase}명`, true)
                .addField(`완치자`, `${response.data.TotalRecovered}명`, true)
                .addField(`완치율`, `${response.data.recoveredPercentage}%`,true)
                .addField(`확진자`, `${response.data.TotalCase}명`, true)
                .addField(`사망자`, `${response.data.TotalDeath}명`, true)
                .addField(`사망률`, `${response.data.deathPercentage}%`, true)
                .addField(`격리중`, `${response.data.checkingCounter}명`, true)
                .addField(`검사자`, `${response.data.TotalChecking}명`, true)
                .addField(`양성율`, `${100 - response.data.notcasePercentage}%`, true)
                .addField(`확진자 증감추이`, `${response.data.TotalCaseBefore}`, true)
                .addField(`금일 완치자`, `${response.data.TodayRecovered}명`, true)
                .addField(`금일 사망자`, `${response.data.TodayDeath}명`, true)
                .setImage('https://cdn.discordapp.com/attachments/811935682997780480/812759630320107610/H0bQMBd.png')
                .setFooter('https://github.com/dhlife09/Corona-19-API')
            message.reply(covid19Embed);
        })
    }
}