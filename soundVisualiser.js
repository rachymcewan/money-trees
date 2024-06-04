// SoundVisualizer.js
class SoundVisualizer {
  constructor(p) {
    this.p = p;
    this.numFftBins = 1024;
    this.showLengthInSeconds = 15;
    this.goFullScreen = false;
    this.playSong = true; // Change to false if you only want to use mic input

    this.p.preload = () => {
      this.song = this.p.loadSound('assets/ImogenHeap_HideAndSeek_Edited.mp3');
    };

    this.p.setup = () => {
      let canvasWidth = 900;
      let canvasHeight = 600;

      if (this.goFullScreen) {
        canvasWidth = this.p.windowWidth;
        canvasHeight = this.p.windowHeight;
      }

      this.p.createCanvas(canvasWidth, canvasHeight);
      this.mic = new p5.AudioIn();
      this.mic.start();

      this.fft = new p5.FFT(0, this.numFftBins);
      this.fft.setInput(this.mic);

      if (this.playSong) {
        this.song.play();
        this.fft.setInput(this.song);
      }

      this.backgroundColor = this.p.color(90);
      this.setupVisualizations();
      this.p.noFill();
    };

    this.p.draw = () => {
      let waveform = this.fft.waveform();
      let spectrum = this.fft.analyze();

      for (let vis of this.visualizations) {
        vis.update(waveform, spectrum);
        vis.draw();
      }

      this.p.fill(255);
      this.p.text("fps: " + this.p.nfc(this.p.frameRate(), 1), 6, 15);
    };
  }

  setupVisualizations() {
    this.visualizations = [];
    // Initialize and add your visualization objects here
    // e.g., this.visualizations.push(new ScrollingWaveform(this.p, ...));
  }
}

// index.html or your modal's script setup
let myp5 = new p5((p) => {
  let soundVis = new SoundVisualizer(p);
}, 'container-id');
