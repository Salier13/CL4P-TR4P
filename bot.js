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
  
  //Diplodocus
  var arr = /[dD]i(\w+)\W?/g.exec(message.content);
  if(arr != null) {
    for(i in arr) {
      console.log(i + " => " + arr[i]);
    }
    message.channel.send(arr[1] + " !");
  }
  
  //Criplodocus
  arr = /[Cc]ri(\w+)\W?/g.exec(message.content);
  if(arr != null) {
    for(i in arr) {
      console.log(i + " => " + arr[i]);
    }
    message.channel.send(arr[1].toUpperCase() + " !");
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
  bot.login(data.token)
});

