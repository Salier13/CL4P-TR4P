const Discord = require('discord.js')
const bot = new Discord.Client()

bot.on('ready', function () {
  console.log("Je suis connecté !")
})

bot.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong !')
  }
  
  //Diplodocus
  var arr = /[dD]i(\w+)\W?/g.exec(message.content)
  if(arr != null) {
    for(i in arr) {
      console.log(i + " => " + arr[i])
    }
    message.channel.send(arr[1] + " !")
  }
  
  //Criplodocus
  arr = /[Cc]ri(\w+)\W?/g.exec(message.content)
  if(arr != null) {
    for(i in arr) {
      console.log(i + " => " + arr[i])
    }
    message.channel.send(arr[1].toUpperCase() + " !")
  }
})

bot.login('')
