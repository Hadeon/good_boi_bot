// This will be a scheduler for OWL Season 3's matches

const moment = require('moment');
const schedule = require('./owlS3.json');
const weekConstants = require('./weekConstants.json');

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
      if(teamSchedule.length === 0){
        receivedMessage.channel.send('Not recognized. Ex. **Eternal** not **Paris** or **Paris Eternal**');
        return;
      }
      receivedMessage.channel.send(teamSchedule.join('\r'))
  },
  getWeekSchedule: function(arguments, receivedMessage){
    let weekSchedule = [];
    if(isNaN(arguments[1]) === false){
      let arrayNumber = arguments[1] - 1;
      let weekData = schedule[Object.keys(schedule)[arrayNumber]];
      if(weekData === undefined){
        receivedMessage.channel.send('Invalid week.');
        return;
      }
      for(let i = 0; i < weekData.length; i++){
        let matchDate = moment(weekData[i].date, 'MMDDYYYY');
        weekSchedule.push(`*${matchDate.format('MMMM Do')} @${weekData[i].time}PST* --- **${weekData[i].teamOne} vs ${weekData[i].teamTwo}** --- hosted by ${weekData[i].hostedBy}`);
      }
      receivedMessage.channel.send(weekSchedule.join('\r'));
    } else {
      let weekNumber = weekConstants[arguments[1].toLowerCase()];
      if(weekNumber != undefined){
        let weekData = schedule[Object.keys(schedule)[weekNumber]];
        for(let i = 0; i < weekData.length; i++){
          let matchDate = moment(weekData[i].date, 'MMDDYYYY');
          weekSchedule.push(`*${matchDate.format('MMMM Do')} @${weekData[i].time}PST* --- **${weekData[i].teamOne} vs ${weekData[i].teamTwo}** --- hosted by ${weekData[i].hostedBy}`);
        }
        receivedMessage.channel.send(weekSchedule.join('\r'));
      } else {
        receivedMessage.channel.send('Invalid week');
        return;
      }
    }
  }
}

  // "six": 5,
  // "seven": 6,
  // "eight": 7,
  // "nine": 8,
  // "ten": 9,
  // "eleven": 10,
  // "twelve": 11,
  // "thirteen": 12,
  // "fourteen": 13,
  // "fifteen": 14,
  // "sixteen": 15,
  // "seventeen": 16,
  // "eighteen": 17