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

client.login("")