const fs = require('fs');
const http = require('http');
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', function () {
  console.log("Je suis connecté !");
})

bot.on('message', message => {
  if(message.author.username == bot.user.username) {return;}  // Do not process our own messages

  if (message.content === 'ping') {
    message.reply('pong !');
  }
  
  // Diplodocus
  var arr = /d[iy]([\wéèãàñÉÈÀ]+)\W?/gi.exec(message.content);
  if(arr != null) {
    message.channel.send(arr[1] + " !");
  }
  
  // Criplodocus
  arr = /cr[iy]([\wéèãàñÉÈÀ]+)\W?/gi.exec(message.content);
  if(arr != null) {
    message.channel.send(arr[1].toUpperCase() + " !");
  }
  
  // Say
  arr = /!say (.+)/gi.exec(message.content);
  if(arr != null) {
    message.channel.send(arr[1]);
    message.delete();
  }
  
  // Help
  if(message.content == "!help" || message.content == "!aide") {
    message.channel.send("**Bonjour, je suis CL4P-TR4P !**\nVoici toutes les comandes que je connais pour le moment :\n - !say *message* : parle à la place du bot. \n - !help : affiche ce message d'aide. \nPlus de fonctionnalités sont en cours de développement, un jour je battrai José... '");
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

