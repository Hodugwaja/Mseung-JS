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
const player = [
    'https://file2.nocutnews.co.kr/newsroom/image/2020/05/07/20200507222219152034_0_825_593.jpg',
    'https://wizzap.ktwiz.co.kr/files/article/2020/11/16/20201116221933.f6e-e03fb023ce12.jpg',
    'https://www.skwyverns.com:8443/Common/Attach/WyvernsPhoto/2020/10/17/3910be0e-79f8-4435-a862-0fd6964a9d9d.jpg',
    'https://pds.joins.com/news/component/htmlphoto_mmdata/201908/29/af945680-b765-40aa-b180-7b2f8fbbf916.jpg',
    'https://pds.joins.com/news/component/htmlphoto_mmdata/201905/18/227e75be-005f-4f57-984f-7eea5b3fc795.jpg',
    'https://lh3.googleusercontent.com/proxy/iByP4ZNtwLmcexzhDqIEPhnH_949iPjiLperZU2VJ1JChsZ9JVti3ABfFghzImIROrRagIZRMDwps_5RhUIjoPQmi1kMS_junEcfityJFnHxmPUzIl3LCnjv32tTiMcYIg6qUNbzV8o-TrI7',
    'http://ojsfile.ohmynews.com/STD_IMG_FILE/2020/0323/IE002619826_STD.jpg',
    'https://newsimg.hankookilbo.com/cms/articlerelease/2020/08/05/b9fc93c8-9f34-4a92-8f24-b628d6f654e0.jpg',
    'https://www.heroesbaseball.co.kr/files/bbs.5//2020/06/26/0d30ed75-a097-4c12-8c58-05c9fe8a87f7.jpg',
    'https://pds.joins.com//news/component/htmlphoto_mmdata/201805/24/dbd84d4f-4210-4122-8267-027566e2437c.jpg'
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
    const argsKBO = message.content.split(' ');
    const command = args.shift();
    if(['테스트'].includes(command)){
        message.reply("핑퐁!");
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
    if((['방주원'].includes(command) && message.author.id !== '812752099582148609')|| ['코로나19', 'covid19', '우한패렴', '코로롱코로롱', '우주원'].includes(command)){
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
    if(['KBO', '크보'].includes(command)){
        if(args[0] === undefined || args[1] === undefined || args[2] === undefined){
            message.reply("형식에 맞지 않습니다");
            return;
        }
        const KBOTeam = [' '];
        const LG = ['LG 트윈즈', '잠실 야구장',];
        const KT = ['KT 위즈', '수원 KT 위즈 파크'];
        const Hanhwa = ['한화 이글스', '한화 생명 이글스 파크'];
        const Lotte = ['롯데 자이언츠', '사직 야구장'];
        const Nexen = ['넥센 히어로즈', '고척스카이돔']
        const KIA = ['기아 타이거즈', '광주 기아 챔피언스 필드', ];
        const Samsung = ['삼성 라이온즈', '삼성 라이온즈 파크'];
        const Doosan = ['두산 베어스', '잠실야구장'];
        const NC = ['NC 다이노스', '창원 NC 파크'];
        const SK = ['SK 와이번즈', '인천 SK 행복 드림구장']
        const Nanum = ['나눔팀', '아무구장']
        const Dream = ['드림팀', '아무 구장']
        const Kiwoom = ['키움 히어로즈', '고척 스카이돔'];
        KBOTeam.push(Doosan, NC, Hanhwa, Lotte, Nexen, Samsung, KIA, LG, KT, SK, Nanum, Dream, Kiwoom);
        axios({
            method : 'get',
            url : `https://kbo-api.herokuapp.com?year=${args[0]}&month=${args[1]}&day=${args[2]}`,
            responseType : 'steam'
            /* 
                1 -> 두산
                2 -> NC
                3 -> 한화
                4 -> 키움
                5 -> 롯데
                6 -> 삼성
                7 -> KIA
                8 -> LG
                9 -> KT 
                10 -> SK

            */
        }).then(function(response){
            console.log(response.data);
            const KBOEmbed = new Discord.MessageEmbed()
                .setTitle(`${args[0]}년 ${args[1]}월 ${args[2]}일 경기 결과`)
                .setDescription(`금일 KBO 리그 경기 결과입니다`)
                .setImage(player[random(0, 9)])
                .setFooter('https://github.com/seeeturtle/kbo')
            for(i = 0; i<response.data.length; i++){
                if(response.data[i].canceled){
                    KBOEmbed.addField(`${KBOTeam[response.data[i].home][1]}(우천취소)`, `${KBOTeam[response.data[i].away][0]} vs ${KBOTeam[response.data[i].home][0]}`)
                }else{
                    KBOEmbed.addField(`${KBOTeam[response.data[i].home][1]}`, `${response.data[i].score[0]}  ${KBOTeam[response.data[i].away][0]} vs ${KBOTeam[response.data[i].home][0]} ${response.data[i].score[1]}`)
                }
            }    
            message.reply(KBOEmbed);
            
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