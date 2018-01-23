const fs = require('fs');
const http = require('http');
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', function () {
  console.log("Je suis connecté !");
  bot.user.setGame("!help (ou mp Salicorne)");
})

bot.on('message', message => {
  if(message.author.username == bot.user.username) {return;}  // Do not process our own messages

  if (message.content === 'ping') {
    message.reply('pong !');
  }
  
  // Neighbours
  /*var words = message.content.split(' ').map((x) => { return x.toString().trim(); });
  var found = false;
  var answer;
  for(i in words) {
    if(words[i].toUpperCase() == words[i] && words[i].toString().length > 3 && /[\w]{3}/.test(words[i])) {
      if(found && /\w/.test(words[i])) {
        answer += " et que " + words[i];
      }else {
        answer = "Hey, les voisins ont pas besoin de savoir que " + words[i];
        found = true;
      }
    }
  }
  if(found) {
    message.channel.send(answer + " !");
    return;
  }*/

  // Say
  arr = /^!say (.+)/gi.exec(message.content);
  if(arr != null) {
    message.channel.send(arr[1]+" *("+message.author.username+")*");
    message.delete();
  }
  
  // Diplodocus
  var arr = /d[iy]([\wéèãàñÉÈÀ]+)\W?/gi.exec(message.content);
  if(arr != null && !message.content.startsWith("!")) {
    if(arr[1].length > 2 && /a|e|i|o|u|y|é|è|ô|ù/i.test(arr[1])) {
      message.channel.send(arr[1] + " !");
    }
  }
  
  // Criplodocus
  arr = /cr[iy]([\wéèãàñÉÈÀ]+)\W?/gi.exec(message.content);
  if(arr != null && !message.content.startsWith("!")) {
    if(arr[1].length > 2 && /a|e|i|o|u|y|é|è|ô|ù/i.test(arr[1])) {
      message.channel.send(arr[1].toUpperCase() + " !");
    }
  }

  // Con de bot
  arr = /con(.*) bot/gi.exec(message.content);
  if(arr != null && !message.content.startsWith("!")) {
    message.channel.send("Désolé, je le referai plus...");
  }

  // Vote
  arr = /^!vote ([^\|]+)\|([^\|]+)/gi.exec(message.content);
  if(arr != null) {
    var send = "*" + message.author.username + "* : " + arr[1] + " (";
    const ping = arr[2].split(", ").map(e => e.trim());
    ping.forEach((e) => {
      if(e[0] == '@' || (e[0] == '<' && e[1] == '@')) { send += e + " "; }
      // console.log(e);
    });
    send += ")";

    message.channel.send(send)
    .then(function(msg) {
      msg.react(bot.emojis.find("name", "VoteNay").id);
      msg.react(bot.emojis.find("name", "VoteYea").id);
      msg.react(bot.emojis.find("name", "Goodenough").id);
    })
    .catch(() => {});
    message.delete();
    return;
  }

  arr = /^!vote ([^\|]+)/gi.exec(message.content);
  if(arr != null) {
    message.channel.send("*" + message.author.username + "* : " + arr[1])
    .then(function(msg) {
      msg.react(bot.emojis.find("name", "VoteNay").id);
      msg.react(bot.emojis.find("name", "VoteYea").id);
      msg.react(bot.emojis.find("name", "Goodenough").id);
      msg.react(bot.emojis.find("name", "NotConvinced").id);
    })
    .catch(() => {});
    message.delete();
    return;
  }

  // Help
  if(message.content == "!help" || message.content == "!aide") {
    message.channel.send("**Bonjour, je suis CL4P-TR4P !**\nVoici toutes les comandes que je connais pour le moment :\n - !say *message* : parle. \n - !vote message : Demande un vote\n - !vote message | @p1[, @p2 ,   @p3,@p4] : Demande un vote et ping\n - !help : affiche ce message d'aide. \nPlus de fonctionnalités sont en cours de développement, un jour je battrai José... ");
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

