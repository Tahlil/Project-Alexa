const play = require('audio-play');
const load = require('audio-loader');
var googleTTS = require('google-tts-api');
const opn = require('opn');
var alexaAPI = function () {
  var now = new Date(),
    specificTimeHour = 15,
    specificTimeMinute = 0,
    askingIntervalSeconds = 900, //15*60
    maxAsking = 5,
    numberOfTimeAsked = 0,
    millisTillSpecifiedTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), specificTimeHour, specificTimeMinute, 0, 0) - now;



  var _checkProgress = function () {
    let today = new Date();
    console.log("It's " + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ", " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
    opn("https://localhost:8000/tasks?alexa=true");
  }
  
  const run = function () {
    console.log("From Run global.answer: " + global.answer);
    //console.log("This function get called");
    console.log("remaining Time " + millisTillSpecifiedTime / 1000 + " seconds");
    setTimeout(function () {  
      _checkProgress();   
      var interval = setInterval(() => {
        numberOfTimeAsked++;
        if (numberOfTimeAsked >= maxAsking) {
          // millisTillSpecifiedTime += 86400000; // after 24 hours    
          numberOfTimeAsked = 0;
          clearInterval(interval);
          millisTillSpecifiedTime = 86400000 - maxAsking * askingIntervalSeconds * 1000;
          global.answer = false;
          alexaAPI.run();
        } else if(!global.answer){
          _checkProgress();
        }
      }, askingIntervalSeconds * 1000);
    }, millisTillSpecifiedTime);
  }
  return {
    run: run
  }
}();

module.exports = alexaAPI;