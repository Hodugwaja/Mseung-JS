module.exports ={
    name : 'ticket',
    execute(message, args){
        try{
            const filter = (msg) => msg.author.id === message.author.id 
        }catch(error){
            message.reply(error);
        }
    }
}