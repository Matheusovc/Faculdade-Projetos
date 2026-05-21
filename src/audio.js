export class AudioSystem {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.music = null;
    this.musicGain = null;
  }

  unlock() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.18;
    this.master.connect(this.ctx.destination);
    this.startMusic();
    const bgMusic = document.getElementById("bgMusic");
    if (bgMusic && bgMusic.paused) {
      bgMusic.volume = 0.5;
      bgMusic.play().catch(e => console.log("Audio play blocked:", e));
    }
  }

  tone(freq, duration = 0.08, type = "sine", volume = 0.4, bend = 0) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (bend) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + bend), now + duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  noise(duration = 0.12, volume = 0.2) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * duration, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    const src = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 900;
    gain.gain.value = volume;
    src.buffer = buffer;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    src.start(now);
  }

  laser() {
    this.tone(720, 0.09, "sawtooth", 0.32, -420);
    this.tone(1400, 0.04, "square", 0.12, -600);
  }

  dash() {
    this.tone(180, 0.16, "sawtooth", 0.32, 760);
    this.noise(0.08, 0.08);
  }

  blast() {
    this.tone(90, 0.38, "sawtooth", 0.42, 260);
    this.tone(460, 0.18, "triangle", 0.24, -180);
    this.noise(0.22, 0.24);
  }

  hit() {
    this.tone(130, 0.14, "square", 0.28, -80);
    this.noise(0.07, 0.12);
  }

  pickup() {
    this.tone(880, 0.08, "triangle", 0.2, 260);
  }

  win() {
    [420, 630, 840, 1260].forEach((freq, i) => window.setTimeout(() => this.tone(freq, 0.16, "triangle", 0.28, 80), i * 70));
  }

  lose() {
    [260, 180, 110].forEach((freq, i) => window.setTimeout(() => this.tone(freq, 0.18, "sawtooth", 0.32, -40), i * 95));
  }

  startMusic() {
    if (!this.ctx || this.music) return;
    const now = this.ctx.currentTime;
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 0.055;
    this.musicGain.connect(this.master);

    const bass = this.ctx.createOscillator();
    const pulse = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    bass.type = "sawtooth";
    pulse.type = "square";
    filter.type = "lowpass";
    filter.frequency.value = 320;
    bass.frequency.value = 55;
    pulse.frequency.value = 110;
    bass.connect(filter);
    pulse.connect(filter);
    filter.connect(this.musicGain);
    bass.start(now);
    pulse.start(now);

    this.music = { bass, pulse, filter, beat: 0 };
    this.sequence();
  }

  sequence() {
    if (!this.ctx || !this.music) return;
    const notes = [55, 55, 73.42, 55, 82.41, 73.42, 49, 55];
    const step = () => {
      if (!this.music) return;
      const freq = notes[this.music.beat % notes.length];
      const now = this.ctx.currentTime;
      this.music.bass.frequency.setTargetAtTime(freq, now, 0.02);
      this.music.pulse.frequency.setTargetAtTime(freq * 2, now, 0.02);
      this.music.filter.frequency.setTargetAtTime(this.music.beat % 4 === 0 ? 760 : 320, now, 0.03);
      this.music.beat += 1;
      window.setTimeout(step, 240);
    };
    step();
  }
}
