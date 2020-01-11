const cron = require('node-cron');
const Discord = require('discord.js');
const client = new Discord.Client();
const commands = require('./commands.js');
const roleManagement = require('./roleManagement.js');
const owlScheduler = require('./complexLogic/owl/owlSchedulerS3');
require('dotenv').config();

client.on('ready', () => {
  console.log('Servers:');
  client.guilds.forEach((guild) => {
    console.log(' - ' + guild.name + ' - ' + guild.id);

    guild.channels.forEach((channel) => {
      console.log(` --- ${channel.name} (${channel.type}) - ${channel.id}`);
    });
  });
});

// Checks at 7am every day if there are matches, and if there are, posts the schedule in the specified channel using the owl_channel_id

cron.schedule("0 0 * * *", () => {
  if(owlScheduler.isMatchToday()){
    let todaysSchedule = owlScheduler.getTodaysMatches();
    client.guilds.get(`${process.env.guild_id}`).channels.get(`${process.env.owl_channel_id}`).send(`Matches today: \r ${todaysSchedule}`);
  } else {
    console.log('No matches today');
  }
});

client.on('message', (receivedMessage) => {
  let heckinMad = client.emojis.find(emoji => emoji.name === 'heckinMad');
  if(receivedMessage.author == client.user) {
    return
  }
  if(receivedMessage.content.startsWith('!')) {
    processCommand(receivedMessage)
    return;
  }
  if(commands.isRude(receivedMessage)){
    roleManagement.rudeActs(receivedMessage, receivedMessage.author.id, heckinMad);
    return;
  }
  if(commands.isGladiator(receivedMessage)){
    receivedMessage.channel.send('GLADIATOR! GLADIATOR!');
    return;
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
      owlScheduler.nextMatch(arguments, receivedMessage);
      break;
    case 'schedule':
      if(arguments.length > 0){
        if(arguments[0].includes('week')){
          if(arguments.length > 1){
            owlScheduler.getWeekSchedule(arguments, receivedMessage);
          } else {
            receivedMessage.channel.send('Please specify the week ex. **one** or **1**.')
          }
          return;
        }
        owlScheduler.getTeamSchedule(arguments, receivedMessage);
      } else {
        receivedMessage.channel.send('Team name or week number needs to be specified.')
      }
      break;
    default:
      receivedMessage.channel.send('Wot? Try !help for list of commands.')
      break;
  }
}

client.login(process.env.bot_token);