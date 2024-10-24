import * as Tone from "tone";
import Recorder from "./Recorder";

class  Loop {
  constructor(setPlayheadPosition, bpm, setIsRecording, setIsCountingDown, setIsPlaying) {
    console.log("Loop constructor called");
    this.setPlayheadPosition = setPlayheadPosition;
    this.bpm = bpm
    
    
    this.setIsRecording = setIsRecording;
    this.setIsCountingDown = setIsCountingDown;
    this.setIsPlaying = setIsPlaying;
    

  }

  init(){
    this.recorder = new Recorder(this.bpm);
    this.recorder.init();
    this.loop = Tone.getTransport();
    this.loop.loop = true;
    this.loop.loopEnd = '4m'; 
    this.click = new Tone.MembraneSynth().toDestination();
    this.metronome = new Tone.Loop((time) => {
          
        this.click.triggerAttackRelease("C2", "8n", time); // Metronome click sound
    }, "4n");

    this.countdownLoop = new Tone.Loop((time) => {
          
        this.click.triggerAttackRelease("B2", "8n", time); // Metronome click sound
    }, "4n");

    this.playhead = this.loop.scheduleRepeat((time) => {
         	// use the time argument to schedule a callback with Draw
         	Tone.getDraw().schedule((time) => {
         		// do drawing or DOM manipulation here
                 this.setPlayheadPosition((prev) => (prev + 1) % 16); // Move playhead across 16 steps

         	}, time);
         }, "4n");
  
   
    this.metronome.mute = false;
    this.metronome.start();
    


  }

  getBeatDuration() {
    return (60 /this.bpm) * 1000; // ms per beat
  };

  muteAll(){
    this.countdownLoop.mute = false;
    this.metronome.mute = true;
    this.countdownLoop.mute = true;
    this.loop.clear(this.playhead);
  }


  unMuteAll(){
    
    this.countdownLoop.mute = true;
    this.playhead = this.loop.scheduleRepeat((time) => {
         	// use the time argument to schedule a callback with Draw
         	Tone.getDraw().schedule((time) => {
         		// do drawing or DOM manipulation here
                 this.setPlayheadPosition((prev) => (prev + 1) % 16); // Move playhead across 16 steps

         	}, time);
         }, "4n");}


  async countdown(){

    console.log("countdown");
    const metronomeState = this.metronome.mute;
    this.stop();
    this.setIsPlaying(true);
    this.loop.position = 0;
    this.setPlayheadPosition(-1);
    this.muteAll();
    this.countdownLoop.mute = false;
    this.countdownLoop.start();
    this.loop.start();
    this.loop.scheduleOnce((time) => {
        
        
        this.loop.stop();
        this.unMuteAll();
        this.metronome.mute = metronomeState;
        this.countdownLoop.mute = true;this.scheduleRecording();
        this.loop.position = 0;
        
        
        

    }, "1m");
        

 }

  scheduleRecording(){
    this.loop.scheduleOnce((time) => {
        this.setIsCountingDown(false);
        this.setIsRecording(true);
        this.recorder.start();

    }, 0);

    this.loop.scheduleOnce((time) => {
        this.setIsRecording(false);
        this.recorder.stop();

    }, "1m");
    
    this.loop.start();


    
  }

  start() {
    Tone.start(); 
    this.loop.start();
    this.isPlaying = true;
    
  }

  stop() {
    this.loop.pause();
    this.isPlaying = false;
  }

  setBpm(bpm) {
    this.bpm = bpm || 120;
    this.loop.bpm.value = this.bpm;
  }

  setMetronome(isMetronomeOn) {
    this.metronome.mute = !isMetronomeOn;
  }


}

export default Loop;