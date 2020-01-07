// This will be a scheduler for OWL Season 3's matches

const moment = require('moment');
const schedule = require('./owlS3.json');

module.exports = {
  nextMatch: function(arguments, receivedMessage){
    let today = moment().format('MMDD');
    let todayFull = moment().format('MMDDYYYY');
    let currentTime = moment().format('HH:mm');

    // Checks for closest upcoming match for specific team
    
    if(arguments.length > 0){
      for(const week in schedule){
        let weekSplit = week.split('-');
        if(weekSplit[0] > today || weekSplit[1] > today){
          for(var i = 0; i < schedule[week].length; i++){
            let matchData = schedule[week][i];
            if(matchData.date === todayFull && matchData.time > currentTime && (matchData.teamOne === arguments[0] || matchData.teamTwo === arguments[0])){
              receivedMessage.channel.send(`Next match is at ${matchData.time}PST --- ${matchData.teamOne} vs ${matchData.teamTwo} `)
              return;
            }
            if(matchData.date > todayFull && (matchData.teamOne === arguments[0] || matchData.teamTwo === arguments[0])){
              let nextDate = moment(matchData.date, 'MMDDYYYY');
              receivedMessage.channel.send(`Next match is on ${nextDate.format('MMMM Do')} at ${matchData.time} PST --- ${matchData.teamOne} vs ${matchData.teamTwo}`)
              return;
            }
          }
        }
      }
      receivedMessage.channel.send('Command not understood. Please only type the team name, such as Eternal, rather than Paris or Paris Eternal.');
      return;
    }

    // Checks for closest upcoming match

    for(const week in schedule){
      let weekSplit = week.split('-');
      if(weekSplit[0] > today || weekSplit[1] > today){
        for(var i = 0; i < schedule[week].length; i++){
          let matchData = schedule[week][i];
          if(matchData.date === todayFull && matchData.time > currentTime){
            receivedMessage.channel.send(`Next match is at ${matchData.time}PST --- ${matchData.teamOne} vs ${matchData.teamTwo} `)
            return;
          }
          if(matchData.date > todayFull){
            let nextDate = moment(matchData.date, 'MMDDYYYY');
            receivedMessage.channel.send(`Next match is on ${nextDate.format('MMMM Do')} at ${matchData.time} PST`)
            return;
          }
        }
      }
    }
  }
}