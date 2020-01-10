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
      let argumentsLowerCase = arguments[0].toLowerCase();
      let teamName = argumentsLowerCase.replace(/^\w/, c => c.toUpperCase())
      for(const week in schedule){
        let weekSplit = week.split('-');
        if(weekSplit[0] > today || weekSplit[1] > today){
          for(var i = 0; i < schedule[week].length; i++){
            let matchData = schedule[week][i];
            if(matchData.date === todayFull && matchData.time > currentTime && (matchData.teamOne === teamName || matchData.teamTwo === teamName)){
              receivedMessage.channel.send(`Next match is at ${matchData.time}PST --- ${matchData.teamOne} vs ${matchData.teamTwo} --- hosted by ${matchData.hostedBy}`)
              return;
            }
            if(matchData.date > todayFull && (matchData.teamOne === teamName || matchData.teamTwo === teamName)){
              let nextDate = moment(matchData.date, 'MMDDYYYY');
              receivedMessage.channel.send(`Next match is on ${nextDate.format('MMMM Do')} at ${matchData.time} PST --- ${matchData.teamOne} vs ${matchData.teamTwo} --- hosted by ${matchData.hostedBy}`)
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
            receivedMessage.channel.send(`Next match is at ${matchData.time}PST --- ${matchData.teamOne} vs ${matchData.teamTwo} --- hosted by ${matchData.hostedBy}`)
            return;
          }
          if(matchData.date > todayFull){
            let nextDate = moment(matchData.date, 'MMDDYYYY');
            receivedMessage.channel.send(`Next match is on ${nextDate.format('MMMM Do')} at ${matchData.time} PST --- ${matchData.teamOne} vs ${matchData.teamTwo} --- hosted by ${matchData.hostedBy}`)
            return;
          }
        }
      }
    }
  },
  isMatchToday: function (){
    let today = moment().format('MMDD');
    for(const week in schedule){
      let weekSplit = week.split('-');
      if(weekSplit[0] === today || weekSplit[1] === today){
        return true;
      }
    }
    return false;
  },
  getTodaysMatches: function (){
    let today = moment().format('MMDD');
    let todayFull = moment().format('MMDDYYYY');
    let todaySchedule = [];
    for(const week in schedule){
      let weekSplit = week.split('-');
      if(weekSplit[0] === today || weekSplit[1] === today){
        for(var i = 0; i < schedule[week].length; i++){
          let matchData = schedule[week][i];
          if(matchData.date === todayFull){
            let matchDetails = `@${matchData.time} PST --- ${matchData.teamOne} vs ${matchData.teamTwo} --- hosted by ${matchData.hostedBy}`;
            todaySchedule.push(matchDetails);
          }
        }
        return todaySchedule.join('\r')
      }
    }
  },
  getTeamSchedule: function(arguments, receivedMessage) {
    let teamSchedule = [];
    if(arguments.length > 0){
      let argumentsLowerCase = arguments[0].toLowerCase();
      let teamName = argumentsLowerCase.replace(/^\w/, c => c.toUpperCase())
      for(const week in schedule){
        let weekSplit = week.split('-');
        let today = moment().format('MMDD');
        if(weekSplit[0] > today || weekSplit[1] > today){
          for(var i = 0; i < schedule[week].length; i++){
            let matchData = schedule[week][i];
            let nextDate = moment(matchData.date, 'MMDDYYYY');
            if(matchData.teamOne === teamName || matchData.teamTwo === teamName){
              teamSchedule.push(`*${nextDate.format('MMMM Do')} @${matchData.time}PST* --- **${matchData.teamOne} vs ${matchData.teamTwo}** --- hosted by ${matchData.hostedBy}`)
            }
          }
        }
      }
      receivedMessage.channel.send(teamSchedule.join('\r'))
    } else {
      receivedMessage.channel.send('!schedule [teamName] required.')
    }
  }
}