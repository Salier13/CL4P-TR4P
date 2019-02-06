const fs = require('fs');
const http = require('http');
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', function () {
  console.log("Je suis connecté !");
  bot.user.setActivity("!help (ou mp Salicorne)");
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
  /*
  var arr = /d[iy]([\wéèêëãàâäñÉÈÊËÀÂÄ]+)\W?/gi.exec(message.content);
  if(arr != null && !message.content.startsWith("!")) {
    var exceptions = ["SENT", "SAIENT", "MANCHE", "SANT", "RAIENT", "RENT", "RONT", "REZ", "RAIS", "RAIT"];
    if(arr[1].length > 2 && /a|e|i|o|u|y|é|è|ô|ù/i.test(arr[1]) && !exceptions.includes(arr[1].toUpperCase())) {
      message.channel.send(arr[1] + " !");
    }
  }
  */
  
  // Criplodocus
  /*
  arr = /cr[iy]([\wéèêëãàâäñÉÈÊËÀÂÄ]+)\W?/gi.exec(message.content);
  if(arr != null && !message.content.startsWith("!")) {
    if(arr[1].length > 2 && /a|e|i|o|u|y|é|è|ô|ù/i.test(arr[1])) {
      message.channel.send(arr[1].toUpperCase() + " !");
    }
  }
  */

  // Con de bot
  arr = /con de bot/gi.exec(message.content);
  if(arr != null && !message.content.startsWith("!")) {
    message.channel.send("Désolé, je le referai plus...");
  }

  // Vote
  arr = /^!vote (.+)$/gi.exec(message.content);
  if(arr != null) {
    const options = arr[1].split("|").map(e => e.trim());
    var send = "*" + message.author.username + "* : ";
    if(options.length <= 1) {
      send += options[0];
      message.channel.send(send)
      .then(async msg => {
        await msg.react(bot.emojis.find(e => {return e.name == "VoteYea"}).id);
        await msg.react(bot.emojis.find(e => {return e.name == "Goodenough"}).id);
        await msg.react(bot.emojis.find(e => {return e.name == "NotConvinced"}).id);
        await msg.react(bot.emojis.find(e => {return e.name == "VoteNay"}).id);
      })
      .catch(() => {});
      message.delete();
      return;
    }
    else {
      // bot.emojis.forEach(i => console.log(i.name));
      var emojis = bot.emojis.keyArray();
      var usedEmojis = [];
      options.forEach(i => {
        if((i+"").length > 0 && emojis.length > 0) {
          eid = Math.floor(Math.random()*emojis.length);
          send += '\n' + bot.emojis.get(emojis[eid]) + ": " + i;
          usedEmojis.push(emojis[eid]);
          emojis.splice(eid, 1);
        }
      });
      message.channel.send(send).then(async function (msg) {
        for(var i = 0; i < usedEmojis.length; i++) {  // For loop instead of .forEach because of async
          await msg.react(bot.emojis.get(usedEmojis[i]));
        };
      })
      .catch(() => {});
      message.delete();
      return;
    }
  }

  // Help
  if(message.content == "!help" || message.content == "!aide") {
    message.channel.send("**Bonjour, je suis CL4P-TR4P !**\nVoici toutes les comandes que je connais pour le moment :\n - !say *message* : parle. \n - !vote message : Demande un vote\n - !vote option 1 | option 2 [|options n...] : Demande un vote entre plusieurs options\n - !help : affiche ce message d'aide. \nPlus de fonctionnalités sont en cours de développement, un jour je battrai José... ");
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

