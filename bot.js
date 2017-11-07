const fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', function () {
  console.log("Je suis connecté !");
})

bot.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong !');
  }
  
  // Diplodocus
  var arr = /d[iy](\w+)\W?/gi.exec(message.content);
  if(arr != null) {
    message.channel.send(arr[1] + " !");
  }
  
  // Criplodocus
  arr = /cr[iy](\w+)\W?/gi.exec(message.content);
  if(arr != null) {
    message.channel.send(arr[1].toUpperCase() + " !");
  }
  
  // Say
  arr = /!say (.+)/gi.exec(message.content);
  if(arr != null) {
    message.channel.send(arr[1]);
    message.delete();
  }
})

fs.readFile('./config.json', 'utf-8', (err, data) => {
  if(err) {
    console.error("Error : could not open file config.json");
    return;
  }
  data = JSON.parse(data);
  if(!data.hasOwnProperty('token') || data.token == '' || data.token == undefined) {
    console.error("Error : config.json does not contain a valid token. ");
    return;
  }
  bot.login(data.token);
});

