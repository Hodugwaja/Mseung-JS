const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({intents: Discord.Intents.ALL})
const DisTube = require('distube');
//const config = require('../config.json');
const axios = require('axios');


const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });
const activities_list = [
    "문의는 호두과자#2022 에게", 
    "카운터사이드",
    "앰생봇 개발",
    `${process.env.prefix}도움말을 통해 도움말 얻기`,
    `사용할 Open API 추천 받습니다`,
    `카운터사이드 당장 시작해!`
];

function random(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`${client.user.tag}'s system online`);
    setInterval(() => {
        const index = random(0, activities_list.length-1);
        client.user.setActivity(activities_list[index]);
    }, 10000); 
    
});


client.on("message", async (message) => {

    if (message.author.bot) return;
    if (!message.content.startsWith(process.env.prefix)) return;
    const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
    const command = args.shift();
    
    if(['테스트'].includes(command)){
        const emoji = message.guild.emojis.cache.find(emoji => emoji.name === "cute");
        message.reply(`:${emoji.name}:${emoji.id}`);
    }
    if(['초대', '초대코드'].includes(command)){
        const inviteEmbed = new Discord.MessageEmbed()
            .setTitle('초대 코드')
            .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=0`)
        message.reply(inviteEmbed);
    }
    if(['파랑이'].includes(command)){
        client.commands.get('cutePiko').execute(message, args);
    }
    if(['도움', 'readme', '도움말', 'help'].includes(command)){
        client.commands.get('readme').execute(message, args);
    }
    if(['KBO', '크보'].includes(command)){
        client.commands.get('KBO').execute(message, args);
    }
    if(['한강', '한강수온'].includes(command)){
        client.commands.get('Hanriver').execute(message, args);
    }
    if((['방주원'].includes(command) && message.author.id !== '812752099582148609')|| ['코로나19', 'covid19', '우한패렴', '코로롱코로롱', '우주원'].includes(command)){
        client.commands.get('covid19').execute(message, args);
    }
    if(['티켓'].includes(command)){
        client.commands.get('ticket').execute(message, args);
    }
    if (['재생', '음원찾기', '추가'].includes(command)){
        distube.play(message, args.join(" "));
    }   
    if (["반복"].includes(command))
        distube.setRepeatMode(message, parseInt(args[0]));

    if (['나가', '정지'].includes(command)) {
        distube.stop(message);
        message.reply("모든 음원을 종료했습니다");   
    }

    if (['스킵', '다음'].includes(command))
        distube.skip(message);

    if (['큐', '목록', '재생목록'].includes(command)) {
        let queue = distube.getQueue(message);
        message.channel.send('재생목록\n' + queue.songs.map((song, id) =>`**${id + 1}**. ${song.name} - \`${song.formattedDuration}\` - ${song.user}` ).join("\n"));
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
    message.channel.send(playSongEmbed);
})

distube.on("addSong", (message, queue, song) => {
    const addSongEmbed = new Discord.MessageEmbed()
        .setTitle("음악 추가")
        .addField(`추가된 음악`,`${song.name}`)
        .addField(`요청자`,`${song.user}`)
    message.reply(addSongEmbed);
})

distube.on("playList", (message, queue, playlist, song) =>{
    const playListEmbed = new Discord.MessageEmbed()
        .setTitle(`${playlist.name}`)
        .setDescription('재생목록 정보')
        .addField(`등록된 음원 수`, `${playlist.song.length}`)
        .addField(`${song.formattedDuration}`, ``)
    message.reply(playListEmbed);
})

distube.on("addList", (message, queue, playlist) =>{ 
    message.reply(`(${playlist.songs.length}개의 음원들이) ${playlist.name}재생목록에 추가 완료\n${status(queue)}`)
})

distube.on("searchResult", (message, result) => {
    let i = 0;
    message.channel.send(`**해당 음원 검색 결과입니다**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*60초 내에 선택해주세요*`);
})

distube.on("searchCancel", (message) => message.channel.send(`검색이 취소되었습니다`))

distube.on("error", (message, e) => {
        console.error(e)
        message.channel.send("야생의 에러가 들이 탁쳤다: " + e);
    });

client.login(process.env.TOKEN);