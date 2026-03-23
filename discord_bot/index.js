const { Client,  GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
//creating a discord bot client using the discord.js library. The Client class is used to create a new instance of the bot, and we specify the intents that the bot will use to listen for events and interact with the Discord API. In this case, we are using the Guilds, GuildMessages, and MessageContent intents to allow the bot to access guild information, read messages in guilds, and access the content of messages.
//connecting to discord server
// The 'messageCreate' event is emitted whenever a new message is created in a channel that the bot has access to. We listen for this event and respond to messages accordingly.
client.on("messageCreate",(message)=>{
    if(message.author.bot) return; // Ignore messages from bots
    message.reply("Hello user! I am a bot created by NITRO. How can I assist you today?");
})
//discord bot token is used to authenticate the bot with the Discord API. It is a unique identifier that allows the bot to connect to Discord and perform actions on behalf of the bot's account. The token should be kept secret and not shared publicly, as it grants access to the bot's functionality and permissions within Discord.
require('dotenv').config();
client.login(process.env.DISCORD_TOKEN);