const Discord = require('discord.js');
const client = new Discord.Client();
const commands = require('./commands.js');
const roleManagement = require('./roleManagement.js');
const owlScheduler = require('./complexLogic/owl/owlSchedulerS3');
require('dotenv').config();

client.on('ready', () => {
  console.log('Servers:');
  client.guilds.forEach((guild) => {
    console.log(' - ' + guild.name);

    guild.channels.forEach((channel) => {
      console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`);
    });
  });
});

client.on('message', (receivedMessage) => {
  let heckinMad = client.emojis.find(emoji => emoji.name === 'heckinMad');
  if(receivedMessage.author == client.user) {
    return
  }
  if(receivedMessage.content.startsWith('!')) {
    processCommand(receivedMessage)
  }
  if(commands.isRude(receivedMessage)){
    roleManagement.rudeActs(receivedMessage, receivedMessage.author.id, heckinMad);
  }
});

// Give default Huskers role to any new users

client.on('guildMemberAdd', (member) => {
  member.addRole(member.guild.roles.find(role => role.name === process.env.default_role));
}).on('error', (err) => {
  console.log(err.message);
})

function processCommand(receivedMessage) {
  let splitCommand = receivedMessage.content.substr(1).split(' ');
  let primaryCommand = splitCommand[0];
  let arguments = splitCommand.slice(1);

  console.log('Command received: ' + primaryCommand);
  console.log('Arguments: ' + arguments);
  console.log('User: ' + receivedMessage.author.id);

  switch(primaryCommand) {
    case 'help':
      commands.helpCommand(arguments, receivedMessage);
      break;
    case 'boop':
      receivedMessage.channel.send('Bork bork!');
      break;
    case 'purpose':
      receivedMessage.channel.send('I has no purpose but to be good boi.');
      break;
    case 'rollover':
      receivedMessage.channel.send('Can haz belly rubs? 😄');
      break;
    case 'sad':
      receivedMessage.channel.send(receivedMessage.author + ', we all love you!')
      break;
    case 'yes':
      receivedMessage.channel.send('WEEEE!!!');
      break;
    case 'max':
      receivedMessage.channel.send('Max is best friend.')
      break;
    case 'walk':
      receivedMessage.channel.send('ASFJEIFAEOFJAEFOAEHGREOFK!!!!!!!');
      break;
    case 'pet':
      commands.petCommand(arguments, receivedMessage);
      break;
    case 'goodboi':
      receivedMessage.channel.send('https://media.giphy.com/media/NkJEXWDr7KsG4/giphy.gif');
      break;
    case 'fetch':
      commands.fetchCommand(arguments, receivedMessage);
      break;
    case 'wow':
      receivedMessage.channel.send('Such doge. Much wow.')
      break;
    case 'potty':
      receivedMessage.channel.send('https://media.giphy.com/media/BTglLD3b6F4Ry/giphy.gif');
      break;
    case 'treat':
      receivedMessage.channel.send('https://media.giphy.com/media/1fhj2W53BjaVVib2A2/giphy.gif');
      break;
    case 'secret':
      receivedMessage.channel.send('I like to sniff booties.');
      break;
    case 'nextMatch':
      owlScheduler.nextMatch(receivedMessage);
      break;
    default:
      receivedMessage.channel.send('Wot? Try !help for list of commands.')
      break;
  }
}

client.login(process.env.bot_token);