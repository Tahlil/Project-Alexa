console.log("List of tasks");
TextToSpeech.talk("Hello Beautiful World!");
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";
recognition.continuous = true;
recognition.start();

recognition.onresult = function(event) {
  console.log("results in");
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      if (event.results[i][0].transcript.trim() == "play") {
        remoteControl.play();
      }
      if (event.results[i][0].transcript.trim() == "stop") {
        remoteControl.stop();
      }
      if (event.results[i][0].transcript.trim() == "mute") {
        remoteControl.mute();
      }
      if (event.results[i][0].transcript.trim() == "unmute") {
        remoteControl.unmute();
      }
      console.info(`You said : ${event.results[i][0].transcript}`);
    }
  }
}