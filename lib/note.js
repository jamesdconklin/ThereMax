const ctx = new (window.AudioContext || window.webkitAudioContext)();

const createOscillator = (freq) => {
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = freq;
  osc.detune.value = 0;
  osc.start(ctx.currentTime);
  return osc;
};

const createGainNode = () => {
  const gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  gainNode.connect(ctx.destination);
  return gainNode;
};

class Note {
  constructor(pFreq, pAmp) {
    let freq = 100*Math.pow(16, pFreq);
    this.volume = pAmp * .2;
    this.oscillatorNode = createOscillator(freq);
    this.gainNode = createGainNode();
    this.oscillatorNode.connect(this.gainNode);

    this.start();
  }

  shift(pFreq, pVol) {
    this.gainNode.gain.value = pVol * .2;
    this.oscillatorNode.frequency.value = 100*Math.pow(16, pFreq);
  }

  start() {
    this.gainNode.gain.value = this.volume;
  }

  stop() {
    this.gainNode.gain.value = 0;
  }
}

export default Note;
