const https = require('https');

const bobId = 502940237949960192;
const myId = 435653444187979776;

module.exports = {
  helpCommand: function (arguments, receivedMessage) {
    if(arguments.length > 0) {
      receivedMessage.channel.send('Need help with ' + arguments + '?');
    } else {
      receivedMessage.channel.send('Available Commands: \n !boop \n !fetch a random gif or !fetch [searchword] \n !goodboi \n !rollover \n !sad \n !pet or !pet [name of person giving pets] \n !purpose \n !walk \n !yes');
    }
  },
  fetchCommand: function (arguments, receivedMessage) {

    let giphyEndpoint = `https://api.giphy.com/v1/gifs/random?api_key=i0Oym3xZWtKfitV418rTdB2ZPEbaev2N`;
  
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
    else if(arguments.length > 0){
      receivedMessage.channel.send('👅 \n Thanks ' + arguments + '!')
    } else {
      receivedMessage.channel.send('👅')
    }
  }
}



