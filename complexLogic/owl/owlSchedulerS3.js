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
  nextMatch: function(receivedMessage){
    // let todayDate = moment().format('MMDDYYYY');
    // receivedMessage.channel.send(`${todayDate}`)
    console.log(schedule.weekOne[0]);
    let match = moment(schedule.weekOne[0].date, 'MMDDYYYY');
    receivedMessage.channel.send(`Next match is on ${match.format('MMMM Do')} at ${schedule.weekOne[0].time}PST`)
  }
}