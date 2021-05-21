const Discord = require('discord.js');
const client = new Discord.Client({intents: Discord.Intents.ALL})
const axios = require('axios')
module.exports = {
    name : 'KBO',
    execute(message, args){
        function random(min, max){
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
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

        if(args[0] === undefined || args[1] === undefined || args[2] === undefined){
            const today = new Date();
            axios({
                method : 'get',
                url : `https://kbo-api.herokuapp.com?year=${today.getFullYear()}&month=${today.getUTCMonth()+1}&day=${today.getUTCDate()}`,
                responseType : 'steam'
            }).catch(function(error){
                message.reply("에러 발생")
            }).then(function(response){
                console.log(response.data);
                const KBOEmbed = new Discord.MessageEmbed()
                    .setTitle(`${today.getFullYear()}년 ${today.getUTCMonth()+1}월 ${today.getUTCDate()}일 경기 결과`)
                    .setDescription(`금일 KBO 리그 경기 결과입니다`)
                    .setImage(player[random(0, 9)])
                    .setFooter('https://github.com/seeeturtle/kbo')
                for(i = 0; i<response.data.length; i++){
                    if(response.data[i].canceled){
                        KBOEmbed.addField(`${KBOTeam[response.data[i].home][1]}(우천취소)`, `${KBOTeam[response.data[i].away][0]} ${KBOTeam[response.data[i].away][2]} vs ${KBOTeam[response.data[i].home][2]} ${KBOTeam[response.data[i].home][0]}`)
                    }else{
                        KBOEmbed.addField(`${KBOTeam[response.data[i].home][1]}`, `${response.data[i].score[0]}  ${KBOTeam[response.data[i].away][0]} ${KBOTeam[response.data[i].away][2]} vs ${KBOTeam[response.data[i].home][2]} ${KBOTeam[response.data[i].home][0]} ${response.data[i].score[1]}`)
                    }
                }    
                message.reply(KBOEmbed);
            })
            return;
        }
        const KBOTeam = [' '];
        const LG = ['LG 트윈즈', '잠실 야구장', '<:LG:812762788291936287>'];
        const KT = ['KT 위즈', '수원 KT 위즈 파크', '<:KT:812762789293850675>'];
        const Hanhwa = ['한화 이글스', '한화 생명 이글스 파크', '<:Hanhwa:812762790389219359>'];
        const Lotte = ['롯데 자이언츠', '사직 야구장', '<:LOTTE:812762789436325919>'];
        const Nexen = ['넥센 히어로즈', '고척스카이돔', '<:Nexen:812765361731797062>'];
        const KIA = ['기아 타이거즈', '광주 기아 챔피언스 필드', '<:KIA:812762789545508884>'];
        const Samsung = ['삼성 라이온즈', '삼성 라이온즈 파크', '<:SAMSUNG:812762794016768100>'];
        const Doosan = ['두산 베어스', '잠실야구장', '<:Doosan:812762796508184597>'];
        const NC = ['NC 다이노스', '창원 NC 파크', '<:NC:812762789226610730>'];
        const SK = ['SK 와이번즈', '인천 SK 행복 드림구장', '<:SK:812762789642108948>'];
        const Nanum = ['나눔팀', '아무구장', '<:KBO:812764329514500169>'];
        const Dream = ['드림팀', '아무 구장', '<:KBO:812764329514500169>'];
        const Kiwoom = ['키움 히어로즈', '고척 스카이돔', '<:Kiwoom:812762789781045318>'];
        const SSG = ['SSG랜더스', '인천SSG랜더스필드', '<:SSG:812762789781045318>'];
        KBOTeam.push(Doosan, NC, Hanhwa, Lotte, Nexen, Samsung, KIA, LG, KT, SK, Nanum, Dream, Kiwoom, SSG);
        axios({
            method : 'get',
            url : `https://kbo-api.herokuapp.com?year=${args[0]}&month=${args[1]}&day=${args[2]}`,
            responseType : 'steam'
        }).then(function(response){
            console.log(response.data);
            const KBOEmbed = new Discord.MessageEmbed()
                .setTitle(`${args[0]}년 ${args[1]}월 ${args[2]}일 경기 결과`)
                .setDescription(`금일 KBO 리그 경기 결과입니다`)
                .setImage(player[random(0, 9)])
                .setFooter('https://github.com/seeeturtle/kbo')
            for(i = 0; i<response.data.length; i++){
                if(response.data[i].canceled){
                    KBOEmbed.addField(`${KBOTeam[response.data[i].home][1]}(우천취소)`, `${KBOTeam[response.data[i].away][0]} ${KBOTeam[response.data[i].away][2]} vs ${KBOTeam[response.data[i].home][2]} ${KBOTeam[response.data[i].home][0]}`)
                }else{
                    KBOEmbed.addField(`${KBOTeam[response.data[i].home][1]}`, `${response.data[i].score[0]}  ${KBOTeam[response.data[i].away][0]} ${KBOTeam[response.data[i].away][2]} vs ${KBOTeam[response.data[i].home][2]} ${KBOTeam[response.data[i].home][0]} ${response.data[i].score[1]}`)
                }
            }    
            message.reply(KBOEmbed);
            
        })
    }
}