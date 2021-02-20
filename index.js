const Discord = require('discord.js');
const client = new Discord.Client({intents: Discord.Intents.ALL})
const DisTube = require('distube');
const config = require('./config.json');
const axios = require('axios');

const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });
const activities_list = [
    "made by hodugwaja", 
    "카운터사이드",
    "앰생봇 개발",
];

function random(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

client.on('ready', () => {
    console.log(`${client.user.tag}'s system online`);
    setInterval(() => {
        const index = random(1, activities_list.length-1);
        client.user.setActivity(activities_list[index]);
    }, 10000); 
    
});

client.on('guildMemberAdd', (member) => {
    if(member.guild.channels.cache.find(channel => channel.topic === "#입장")){
        const welcomeEmbed = new Discord.MessageEmbed()
            .setTitle("야생의 유저가 들어왔다!")
            .setDescription(`들어온 유저 : ${member}`)
            .setTimestamp()
        message.channel.send(welcomeEmbed);
    }
})

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift();
    if(['테스트'].includes(command)){
        message.reply("테스트 실행합니다");
    }

    if (['재생', '음원찾기'].includes(command))
        distube.play(message, args.join(" "));

    if (["반복"].includes(command))
        distube.setRepeatMode(message, parseInt(args[0]));

    if (['나가', '정지'].includes(command)) {
        if(message.author === song.user || message.author.role === message.member.roles.find(role => role.hasPermission('Administrator'))){
            distube.stop(message);
            message.reply("요청자 또는 관리자에 의해 음악을 정지했습니다");
        }else{
            message.reply("요청자 또는 관리자를 제외한 유저는 음악을 정지할수 없습니다")
        }
        
    }

    if (['스킵', '다음'].includes(command))
        distube.skip(message);

    if (['큐', '목록'].includes(command)) {
        let queue = distube.getQueue(message);
        message.channel.send('재생목록\n' + queue.songs.map((song, id) =>`**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).slice(0, 10).join("\n"));
    }

    if(['한강', '한강수온'].includes(command)){
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
    if(['코로나19', 'covid19', '우한패렴', '방주원', '코로롱코로롱', '우주원'].includes(command)){
        axios({
            method : 'get',
            url : 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson',
            responseType : 'stream'
        }).then(function(response) {
            console.log(response)
            const COVID19Embed = new Discord.MessageEmbed()
                .setTitle("코로나 19")
        })
    }
    if(['KBO', '크보'].includes(command)){
        axios({
            method : 'post',
            url : 'https://kbo-api.herokuapp.com?year=2018&month=7&day=27',
            responseType : 'steam'
        }).then(function(response){
            console.log(response.data);
        })
    }
    
});

const status = (queue) => {
    const statusEmbed = new Discord.MessageEmbed()
        .setTitle(`현황판`)
        .setDescription(`현재 재생중익 음원의 설정상황 입니다`)
        .addField(`음향`, `${queue.volume}`)
        .addField(`필터`, `${queue.filter || "off"}`)
        .addField(`반복 유무`, `${queue.repeatMode ? queue.repeatMode == 2 ? "전체" : "현재 노래" : "없음"}`)
        .addField(`다음 노래 자동 재생`, `${queue.autoPlay ? "자동 재생 켜짐": "자동재생 꺼짐"}`)
    message.reply(statusEmbed);
}

distube.on("playSong", (message, queue, song) => {
    const playSongEmbed = new Discord.MessageEmbed()
        .setTitle("음악 재생")
        .addField(`재생중인 음악`, `${song.name}`)
        .addField(`요청자`, `${song.user}`)
    message.reply(playSongEmbed);
})

distube.on("addSong", (message, queue, song) => {
    const addSongEmbed = new Discord.MessageEmbed()
        .setTitle("음악 추가")
        .addField(`추가된 음악`,`${song.name}`)
        .addField(`요청자`,`${song.user}`)
    message.reply(addSongEmbed);
})

distube.on("playList", (message, queue, playlist, song) =>{
    message.reply
})
distube.on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("야생의 에러가 들이 탁쳤다: " + e);
    });

client.login(config.token);