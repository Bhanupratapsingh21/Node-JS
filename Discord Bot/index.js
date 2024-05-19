import {Client, GatewayIntentBits} from "discord.js"

const client = new Client({
    intents : [
        GatewayIntentBits.Guilds ,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
]});



client.on("messageCreate" , (message) =>{
    if(message.author.bot) return;
    else{
        message.reply({
            content:"Hi From Bot"
        })
    }
});

client.login("MTI0MTcxNTg5MzA5NzIwNTg0MQ.GInbRN.5YfTGxHnKa5O1xiUIygriME8_VK6w6ja5TOnvM")