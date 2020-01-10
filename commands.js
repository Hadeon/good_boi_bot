const https = require('https');
require('dotenv').config();
const bobId = 502940237949960192;

module.exports = {
  helpCommand: function (arguments, receivedMessage) {
    if(arguments.length > 0) {
      switch(arguments[0]){
        case 'fetch':
          receivedMessage.channel.send('Dat fetches a random gif. If you !fetch [word] then it grab random gif relating to dat word.');
          break;
        case 'pet':
          receivedMessage.channel.send('Good boi gets pets :3');
          break;
        case 'secret':
          receivedMessage.channel.send('I not spoil da secrets.');
          break;
        default:
          receivedMessage.channel.send('Dat not a command lul.');
          break;
      }
    } else {
      receivedMessage.channel.send('Available Commands: \n **!nextMatch** shows next upcoming match or **!nextMatch [teamName]** shows next time that team plays \n **!schedule [teamName]** shows upcoming schedule or **!schedule [weekNumber]** shows the schedule for that week \n **!boop** \n **!fetch** a random gif or **!fetch [searchword]** \n **!goodboi** \n **!rollover** \n **!sad** \n **!pet** or **!pet [name of person giving pets]** \n **!purpose** \n **!walk** \n **!yes** \n **!treat** \n **!potty** \n I has secret doge commands too!');
    }
  },
  fetchCommand: function (arguments, receivedMessage) {

    let giphyEndpoint = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.giphy_key}`;
  
    if(receivedMessage.author.id == bobId) {
      receivedMessage.channel.send('https://i.pinimg.com/originals/d5/c7/a3/d5c7a3cee65eaa1d4ce5b1e16d064f36.jpg');
    } 
    else if(arguments.length > 0) {
      giphyEndpoint += `&tag=${arguments}`;
      https.get(giphyEndpoint, (res) => {
        let giphyObject = '';
      
        res.on('data', (chunk) => {
          giphyObject += chunk;
        });
      
        res.on('end', () => {
          let jsonResponse = JSON.parse(giphyObject);
          if(jsonResponse.data.url != undefined) {
            receivedMessage.channel.send(jsonResponse.data.url);
          } else {
            receivedMessage.channel.send('Where it go? Fetch me a different one plz.')
          }
        });
      
        }).on("error", (err) => {
          console.log("Error: " + err.message);
      });
    }
    else {
      https.get(giphyEndpoint, (res) => {
        let giphyObject = '';
      
        res.on('data', (chunk) => {
          giphyObject += chunk;
        });
      
        res.on('end', () => {
          let jsonResponse = JSON.parse(giphyObject);
          if(jsonResponse.data.url != undefined) {
            receivedMessage.channel.send(jsonResponse.data.url);
          } else {
            receivedMessage.channel.send('Where it go? Fetch me a different one plz.')
          }
        });
      
        }).on("error", (err) => {
          console.log("Error: " + err.message);
      });
    }
  },
  petCommand: function (arguments, receivedMessage) {
    if(receivedMessage.author.id == bobId) {
      receivedMessage.channel.send('https://media.giphy.com/media/61hMOSBBeqUCY/giphy.gif');
    }
    else if(arguments.length > 0 && arguments != '@everyone' && arguments != '@here'){
      receivedMessage.channel.send(`Can I haz pets plz ${arguments}? 👅`)
    } else {
      receivedMessage.channel.send('👅')
    }
  },
  isRude: function(message) {
    var rude = process.env.rude.split(' ');
    for(let i=0; i < rude.length; i++){
      if(message.content.toLowerCase().includes(rude[i])){
        return true;
      }
    }
    return false;
  },
  isGladiator: function(message){
    if(message.content.toLowerCase().includes('gladiator')){
      return true;
    }
  }
}



