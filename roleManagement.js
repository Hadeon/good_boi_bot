const https = require('https');

module.exports = {
  testCommand: function (arguments, receivedMessage) {
    receivedMessage.channel.send('👅');
  }
}