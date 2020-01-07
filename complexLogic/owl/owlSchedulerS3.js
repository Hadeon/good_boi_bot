// This will be a scheduler for OWL Season 3's matches
// Have a daily check to see when the next match is coming up
// If it's the same week, post message stating that there are matches on ___ day starting at ___
// On that day, send out a reminder matches today start in ___ hours
// Commands checking specific teams
// Ex. !owlSchedule Eternal
// Res. "Next Eternal match starts is Eternal v Fusion on ___ at ___ ."

// Schedule JSON structure

// Date dd-MM-yyyy
// Time
// Team One
// Team Two
const moment = require('moment');
const schedule = require('./owlS3.json');

module.exports = {
  nextMatch: function(arguments, receivedMessage){
    let today = moment().format('MMDD');
    let todayFull = moment().format('MMDDYYYY');
    let currentTime = moment().format('HH:mm');
    
    if(arguments.length > 0){
      for(const week in schedule){
        let weekSplit = week.split('-');
        if(weekSplit[0] > today || weekSplit[1] > today){
          for(var i = 0; i < schedule[week].length; i++){
            if(schedule[week][i].date === todayFull && schedule[week][i].time > currentTime && (schedule[week][i].teamOne === arguments[0] || schedule[week][i].teamTwo === arguments[0])){
              receivedMessage.channel.send(`Next match is at ${schedule[week][i].time}PST --- ${schedule[week][i].teamOne} vs ${schedule[week][i].teamTwo} `)
              return;
            }
            if(schedule[week][i].date > todayFull && (schedule[week][i].teamOne === arguments[0] || schedule[week][i].teamTwo === arguments[0])){
              let nextDate = moment(schedule[week][i].date, 'MMDDYYYY');
              receivedMessage.channel.send(`Next match is on ${nextDate.format('MMMM Do')} at ${schedule[week][i].time} PST --- ${schedule[week][i].teamOne} vs ${schedule[week][i].teamTwo}`)
              return;
            }
          }
        }
      }
      receivedMessage.channel.send('Command not understood. Please only type the team name, such as Eternal, rather than Paris or Paris Eternal.');
      return;
    }

    // If no arguments
    for(const week in schedule){
      let weekSplit = week.split('-');
      if(weekSplit[0] > today || weekSplit[1] > today){
        for(var i = 0; i < schedule[week].length; i++){
          if(schedule[week][i].date === todayFull && schedule[week][i].time > currentTime){
            receivedMessage.channel.send(`Next match is at ${schedule[week][i].time}PST --- ${schedule[week][i].teamOne} vs ${schedule[week][i].teamTwo} `)
            return;
          }
          if(schedule[week][i].date > todayFull){
            let nextDate = moment(schedule[week][i].date, 'MMDDYYYY');
            receivedMessage.channel.send(`Next match is on ${nextDate.format('MMMM Do')} at ${schedule[week][i].time} PST`)
            return;
          }
        }
      }
    }
  }
}