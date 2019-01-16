console.log("List of tasks");
var text = 'Hey Rakib, are you there Can you tell the progress of Pulse, what percentage completed';
var isAnswered = false;
var isActive = false;
var conversationClosed = false;
var clickButton;
var speakerTimer;
var speakerActiveTimer, askQuestion = false;
var query = window.location.search;
if (query !== '') {
  askQuestion=JSON.parse(query.split('=')[1]);
}
console.log(askQuestion);
var speaker = function () {
  if ('speechSynthesis' in window) {
    var voices = window.speechSynthesis.getVoices();
    var msg = new SpeechSynthesisUtterance();
    msg.voice = voices[1];
    msg.rate = 1;
    msg.pitch = 2;
    $('#speak').click(function () {
      msg.text = text;
      speechSynthesis.speak(msg);
      startConverting();
    })
  }
};

function startConverting() {
  var listening = true;
  if ('webkitSpeechRecognition' in window) {
    var speechRecognizer = new webkitSpeechRecognition();
    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.lang = 'en-IN';
    speechRecognizer.start();

    var finalTranscripts = '';
    var x = 0;

    speechRecognizer.onresult = function (event) {
      isActive = true;
      x++;
      if (listening && isActive) {
        var interimTranscripts = '';
        for (var i = event.resultIndex; i < event.results.length; i++) {
          var transcript = event.results[i][0].transcript;
          transcript.replace("\n", "<br>")
          if (event.results[i].isFinal) {
            finalTranscripts += transcript;
          } else {
            interimTranscripts += transcript;
          }
        }

        text = transcript;
        if (text.indexOf('I am fine') != -1 || text.indexOf("I'm fine") != -1) {
          console.log('I am fine told');
          text = "What percentage completed? I need to tell Raisul";
        }
        else if (text.indexOf('%') != -1) {
          let percentage = getPercentOfComplete(text);
          console.log(text);
          $("#progress").attr("value", percentage);
          $("#submit").click();
          console.log('server updated');
          isActive = false;
          text = 'Ok, thanks';
          clickButton.click();
          isAnswered = true;
          setTimeout(function(){
            window.close();
          }, 5000);
          // clearInterval(speakerTimer);
          clearInterval(speakerActiveTimer);
        }
        else {
          console.log('text:' + text);
          if(text != 'I am fine told')text = "Can not understand, again please.";
        }
        listening = false;
      }
      else listening = true;



    };
    speechRecognizer.onerror = function (event) {
    };
  } else {

    r.innerHTML = 'Your browser is not supported. Please upgrade your browser.'

  }

}

function getPercentOfComplete(line){
  var words = line.split(" ");
  var i = 0;
  for(i;i<words.length;i++){
    if(words[i].indexOf("%") != -1) {
      var integerNum = parseInt(words[i], 10);
      console.log("after number extraction");
      console.log(integerNum);
      return integerNum;
    }
  }
}

$(document).ready(function () {
  if (askQuestion) {
    speaker();
    clickButton = document.getElementById('speak');
    ///clickButton.click();
    speakerTimer =setTimeout(function () {
        console.log("button clicked 10");
        clickButton.click(); 
    }, 1000);
    speakerActiveTimer = setInterval(function () {
      
      if (!isAnswered && isActive ){
        console.log("button clicked 7");
        clickButton.click();
      } 
      clearInterval(speakerActiveTimer);
      speakerActiveTimer2 = setInterval(function () {
        if (!isAnswered && isActive ){
          console.log("button clicked 7");
          clickButton.click();
        } 
        
      }, 7000);  
      
    }, 11000);    
  }
  setTimeout(() => {
    console.log();
    window.close();
  }, 900000);
}
);

