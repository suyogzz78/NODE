import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();
//addded dotenv to load environment variables from .env file
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (message) => {

  if (message.author.bot) return;
  message.reply("Ghar ki ayad nahi ayi tujhe jassi?");

  console.log(message);
});


client.on("interactionCreate",(interaction)=>{
  if(!interaction.isChatInputCommand()) return;

  if(interaction.commandName === "ping")
  interaction.reply("pong dhyang dong");

  if(interaction.commandName === "url")
  interaction.reply("URL shortening feature is coming soon!");

  if(interaction.commandName === "help")
  interaction.reply("Available commands: /ping, /url, /help");

})
  
client.login(process.env.DISCORD_TOKEN);