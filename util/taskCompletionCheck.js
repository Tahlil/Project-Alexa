const opn = require('opn');
var alexaAPI = function () {
  var now = new Date(),
    specificTime = 14,
    askingIntervalSeconds = 5,
    maxAsking = 1,
    numberOfTimeAsked = 0,
    millisTillSpecifiedTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), specificTime, 46, 0, 0) - now;


  var _checkProgress = function () {

    let today = new Date();
    console.log("It's " + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ", " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
  }
  var googleTTS = require('google-tts-api');
  const run = function () {
    opn("http://localhost:3000/");
    googleTTS('Hello World', 'en', 1) // speed normal = 1 (default), slow = 0.24
      .then(function (url) {
        opn(url);
        console.log(url); // https://translate.google.com/translate_tts?...
      })
      .catch(function (err) {
        console.error(err.stack);
      });
    // console.log("This function get called");
    console.log("remaining Time " + millisTillSpecifiedTime / 1000 + " seconds");
    setTimeout(function () {
      _checkProgress();
      var interval = setInterval(() => {
        numberOfTimeAsked++;
        if (numberOfTimeAsked >= maxAsking) {
          // millisTillSpecifiedTime += 86400000; // after 24 hours    
          numberOfTimeAsked = 0;
          clearInterval(interval);
          millisTillSpecifiedTime = 60000 - maxAsking * askingIntervalSeconds * 1000;
          alexaAPI.run();
        } else {
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