const https = require('https');

var dogHouse = {};

module.exports = {
  rudeActs: function (message, userId, heckinMad) {
    if(dogHouse[userId] === undefined){
      dogHouse[userId] = 1;
      message.reply(`${heckinMad}`);
    } else {
      if(dogHouse[userId] === 3){
        let role = message.guild.roles.find(r => r.name === 'Dog House');
        let user = message.guild.members.find(u => u.id === userId);
        user.addRole(role).catch(console.error);
        message.reply(`Grr... you in the dog house for 10 minutes. ${heckinMad}`)
        dogHouse[userId] = 4;
        setTimeout(function removeDogHouse() {
          user.removeRole(role).catch(console.error);
          console.log('Timeout set');
          dogHouse[userId] = 1;
        }, 600000);
      } else {
        dogHouse[userId] += 1;
        message.reply(`${heckinMad}`);
      } 
    }
  }
}