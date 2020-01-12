var dogHouse = {};

// Keep object with userIds and the amount of warnings they've had
// For small servers this works fine, but for larger servers this will DEFINITELY need to be changed

// TODO: Replace Dog House role with process.env.rude_rule
// TODO: Allow for the timeout to be configured with a custom amount of time

module.exports = {
  rudeActs: function (message, userId, heckinMad) {
    if(dogHouse[userId] === undefined){
      dogHouse[userId] = 1;
      message.reply(`${heckinMad}`);
    } else {
      switch(dogHouse[userId]){
        case 1:
          dogHouse[userId] += 1;
          message.reply('I warnin you...');
          break;
        case 2:
          dogHouse[userId] += 1;
          message.reply('You heckin wut?!')
          break;
        case 3:
          let role = message.guild.roles.find(r => r.name === 'Dog House');
          let user = message.guild.members.find(u => u.id === userId);
          user.addRole(role).catch(console.error);
          message.reply(`Grr... you in the dog house for 10 minutes. ${heckinMad}`)
          dogHouse[userId] = 4;
          setTimeout(function removeDogHouse() {
            user.removeRole(role).catch(console.error);
            dogHouse[userId] = 1;
          }, 600000);
          break;
        case 4:
          message.reply('You still in Dog House punk! Stop dat!')
          break;
      }
    } 
  }
}
