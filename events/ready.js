module.exports = client => {
    const activities_list = [
        "made by hodugwaja", 
        "M생톤 봇 개발",
        "카운터사이드"
    ];
    
    
    function random(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    console.log(`${client.user.tag}'s system online`);
            
    setInterval(() => {
        const index = random(1, activities_list.length-1);
        client.user.setActivity(activities_list[index]);
    }, 10000); 
        
        
}