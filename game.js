(() => {
"use strict";

// src/config.js
const VIEW = {
  width: 960,
  height: 540,
  gravity: 0.78,
  friction: 0.82,
};

const SPRITE_SRC = "./assets/cara1.png";

const f = (x, y, w = 42, h = 46) => ({ x, y, w, h });

const SPRITE_ANIMS = {
  idle: { speed: 12, loop: true, frames: [f(24, 20), f(75, 20), f(126, 20), f(177, 20)] },
  run: { speed: 4, loop: true, frames: [f(24, 382), f(75, 382), f(126, 382), f(177, 382), f(228, 382), f(279, 382), f(330, 382)] },
  jump: { speed: 7, loop: true, frames: [f(28, 230), f(80, 220), f(132, 220), f(184, 236), f(236, 236)] },
  attack: { speed: 3, loop: false, frames: [f(25, 310, 46, 46), f(76, 310, 48, 46), f(126, 306, 54, 50), f(178, 306, 58, 50), f(232, 306, 62, 50), f(292, 306, 64, 50)] },
  shoot: { speed: 3, loop: false, frames: [f(32, 527, 48, 48), f(82, 527, 48, 48), f(132, 527, 48, 48), f(184, 527, 48, 48), f(234, 527, 50, 48), f(286, 527, 50, 48)] },
  power: { speed: 4, loop: false, frames: [f(438, 306, 48, 58), f(489, 306, 48, 58), f(539, 306, 48, 58), f(589, 306, 48, 58), f(638, 306, 48, 58)] },
  hurt: { speed: 8, loop: true, frames: [f(28, 88), f(77, 88, 48, 46), f(128, 88), f(177, 88)] },
  death: { speed: 8, loop: false, frames: [f(26, 150, 46, 48), f(76, 150, 55, 42), f(128, 152, 70, 42), f(202, 170, 60, 24)] },
  projectile: { speed: 3, loop: true, frames: [f(210, 596, 52, 28), f(276, 596, 56, 28), f(344, 596, 60, 30), f(418, 596, 62, 34), f(492, 594, 70, 38), f(574, 592, 78, 42)] },
};

const ground = (x, w) => ({ x, y: 488, w, h: 52, type: "ground" });
const pad = (x, y, w, type = "platform") => ({ x, y, w, h: 24, type });

const LEVELS = [
  {
    name: "Cidade Cyberpunk",
    shortName: "CITY",
    width: 3650,
    spawn: { x: 90, y: 430 },
    sky: ["#070714", "#15042a", "#07162d"],
    platforms: [
      ground(0, 560),
      ground(650, 540),
      ground(1290, 460),
      ground(1840, 560),
      ground(2510, 1140),
      pad(310, 390, 136, "neon"),
      pad(520, 324, 116, "ad"),
      pad(875, 402, 170, "neon"),
      pad(1350, 354, 140, "ad"),
      pad(1580, 282, 160, "neon"),
      pad(2060, 384, 130, "ad"),
      pad(2280, 318, 172, "neon"),
      pad(2810, 386, 156, "ad"),
      pad(3060, 330, 150, "neon"),
    ],
    pickups: [
      [352, 344], [570, 276], [930, 354], [1002, 354], [1408, 304], [1648, 232],
      [2148, 338], [2360, 268], [2888, 338], [3138, 280], [3380, 430],
    ],
    enemies: [
      { x: 1120, y: 420, min: 820, max: 1180, vx: -1.45, type: "drone", hp: 2 },
      { x: 1730, y: 450, min: 1310, max: 1790, vx: -1.35, type: "crawler", hp: 3 },
      { x: 2490, y: 430, min: 1980, max: 2600, vx: -1.7, type: "drone", hp: 3 },
      { x: 3190, y: 450, min: 2740, max: 3440, vx: -1.55, type: "crawler", hp: 3 },
    ],
    gate: { x: 3520, y: 292, w: 48, h: 196 },
  },
  {
    name: "Laboratório Futurista",
    shortName: "LAB",
    width: 3820,
    spawn: { x: 80, y: 430 },
    sky: ["#030812", "#061a2a", "#13051f"],
    platforms: [
      ground(0, 520),
      ground(610, 500),
      ground(1240, 600),
      ground(1970, 500),
      ground(2600, 1220),
      pad(260, 382, 160, "glass"),
      pad(620, 320, 138, "tube"),
      pad(910, 390, 178, "glass"),
      pad(1360, 340, 156, "tube"),
      pad(1630, 278, 176, "glass"),
      pad(2130, 382, 170, "tube"),
      pad(2400, 320, 156, "glass"),
      pad(2880, 382, 160, "tube"),
      pad(3180, 318, 170, "glass"),
    ],
    pickups: [
      [310, 332], [684, 270], [978, 342], [1428, 292], [1690, 226], [2208, 336],
      [2470, 270], [2950, 332], [3260, 268], [3500, 430],
    ],
    enemies: [
      { x: 650, y: 450, min: 610, max: 1110, vx: -1.4, type: "crawler", hp: 3 },
      { x: 2350, y: 420, min: 2020, max: 2520, vx: -1.9, type: "drone", hp: 3 },
      { x: 3160, y: 450, min: 2760, max: 3540, vx: -1.7, type: "crawler", hp: 4 },
    ],
    gate: { x: 3670, y: 284, w: 52, h: 204 },
  },
  {
    name: "Fase 3",
    shortName: "FASE3",
    width: 4000,
    spawn: { x: 80, y: 430 },
    sky: ["#020205", "#0a0a1a", "#1a1a2e"],
    platforms: [
      ground(0, 480),
      ground(540, 560),
      ground(1180, 480),
      ground(1800, 600),
      ground(2500, 1500),
      pad(320, 370, 140, "neon"),
      pad(680, 310, 120, "glass"),
      pad(1020, 380, 160, "ad"),
      pad(1480, 330, 140, "tube"),
      pad(1720, 260, 180, "neon"),
      pad(2200, 390, 150, "glass"),
      pad(2600, 310, 160, "ad"),
      pad(3000, 380, 140, "tube"),
      pad(3300, 320, 180, "neon"),
    ],
    pickups: [
      [360, 310], [710, 250], [1080, 320], [1520, 270], [1780, 200], [2250, 330],
      [2650, 250], [3050, 320], [3380, 260], [3700, 430],
    ],
    enemies: [
      { x: 560, y: 450, min: 540, max: 1000, vx: -1.6, type: "crawler", hp: 4 },
      { x: 1200, y: 420, min: 1180, max: 1600, vx: -2.0, type: "drone", hp: 3 },
      { x: 1900, y: 450, min: 1800, max: 2300, vx: -1.8, type: "turret", hp: 5 },
      { x: 2700, y: 420, min: 2500, max: 3000, vx: -2.2, type: "drone", hp: 4 },
      { x: 3300, y: 450, min: 3100, max: 3800, vx: -1.9, type: "crawler", hp: 5 },
      { x: 3600, y: 420, min: 3500, max: 3900, vx: -2.1, type: "drone", hp: 4 },
    ],
    gate: { x: 3850, y: 284, w: 52, h: 204 },
  },
  {
    name: "Fase 4",
    shortName: "FASE4",
    width: 4200,
    spawn: { x: 80, y: 430 },
    sky: ["#120101", "#2a0505", "#3a0505"],
    platforms: [
      ground(0, 400),
      ground(480, 500),
      ground(1080, 500),
      ground(1680, 400),
      ground(2200, 500),
      ground(2800, 1400),
      pad(280, 360, 120, "glass"),
      pad(580, 280, 140, "tube"),
      pad(940, 360, 130, "neon"),
      pad(1380, 320, 150, "glass"),
      pad(1600, 240, 160, "tube"),
      pad(2000, 360, 140, "neon"),
      pad(2400, 280, 150, "glass"),
      pad(2800, 360, 130, "tube"),
      pad(3100, 280, 140, "neon"),
      pad(3400, 360, 150, "glass"),
    ],
    pickups: [
      [320, 300], [620, 220], [1000, 300], [1440, 260], [1680, 180], [2060, 300],
      [2460, 220], [2860, 300], [3160, 220], [3460, 300], [3900, 430],
    ],
    enemies: [
      { x: 500, y: 450, min: 480, max: 900, vx: -1.8, type: "crawler", hp: 5 },
      { x: 1100, y: 420, min: 1080, max: 1500, vx: -2.3, type: "drone", hp: 4 },
      { x: 1700, y: 450, min: 1680, max: 2100, vx: -2.0, type: "turret", hp: 6 },
      { x: 2300, y: 420, min: 2200, max: 2700, vx: -2.5, type: "drone", hp: 4 },
      { x: 2900, y: 450, min: 2800, max: 3300, vx: -2.2, type: "turret", hp: 6 },
      { x: 3300, y: 420, min: 3200, max: 3700, vx: -2.4, type: "drone", hp: 5 },
      { x: 3700, y: 450, min: 3600, max: 4100, vx: -2.1, type: "crawler", hp: 6 },
    ],
    gate: { x: 4050, y: 284, w: 52, h: 204 },
  },
  {
    name: "Arena Final",
    shortName: "BOSS",
    width: 1200,
    spawn: { x: 80, y: 400 },
    sky: ["#1a0005", "#350005", "#000000"],
    platforms: [
      ground(0, 1200),
      pad(200, 320, 250, "ground"),
      pad(750, 320, 250, "ground"),
    ],
    decorations: [
      { typeId: 9, x: 50, y: 180, w: 250, h: 320 }, // Tree
      { typeId: 9, x: 1000, y: 180, w: 250, h: 320 }, // Tree
      { typeId: 7, x: 400, y: 440, w: 40, h: 60 }, // TombStone
      { typeId: 8, x: 800, y: 440, w: 45, h: 60 }, // TombStone
      { typeId: 6, x: 550, y: 470, w: 50, h: 30 }, // Skeleton
      { typeId: 4, x: 250, y: 280, w: 60, h: 40 }, // DeadBush on pad
      { typeId: 4, x: 800, y: 280, w: 60, h: 40 }, // DeadBush on pad
    ],
    pickups: [
      [200, 250], [1000, 250],
      [600, 430]
    ],
    enemies: [
      { x: 900, y: 390, type: "boss", hp: 45 }
    ],
    gate: { x: -1000, y: -1000, w: 0, h: 0 }
  }
];


// src/audio.js
class AudioSystem {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.music = null;
    this.musicGain = null;
    this.currentTrack = "bgMusic";
  }

  unlock() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.18;
    this.master.connect(this.ctx.destination);
    
    if (this.currentTrack === "bossMusic") {
      this.playBossMusic();
    } else {
      this.playBgMusic();
    }
  }

  playBgMusic() {
    this.currentTrack = "bgMusic";
    if (!this.ctx) return;
    this.stopSynthMusic(); // Garante que o sintetizador abafado não toque
    const bossMusic = document.getElementById("bossMusic");
    const bgMusic = document.getElementById("bgMusic");
    if (bossMusic) {
       bossMusic.pause();
       bossMusic.currentTime = 0;
    }
    if (bgMusic && bgMusic.paused) {
      bgMusic.volume = 0.5;
      bgMusic.play().catch(e => console.log("Audio play blocked:", e));
    }
  }

  playBossMusic() {
    this.currentTrack = "bossMusic";
    if (!this.ctx) return;
    this.stopSynthMusic(); // Para o synth bass
    const bgMusic = document.getElementById("bgMusic");
    const bossMusic = document.getElementById("bossMusic");
    if (bgMusic) {
       bgMusic.pause();
       bgMusic.currentTime = 0;
    }
    if (bossMusic && bossMusic.paused) {
      bossMusic.volume = 0.6;
      bossMusic.play().catch(e => console.log("Audio play blocked:", e));
    }
  }

  stopAllMusic() {
    this.stopSynthMusic();
    const bgMusic = document.getElementById("bgMusic");
    const bossMusic = document.getElementById("bossMusic");
    const endingMusic = document.getElementById("endingMusic");
    if (bgMusic) {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    }
    if (bossMusic) {
      bossMusic.pause();
      bossMusic.currentTime = 0;
    }
    if (endingMusic) {
      endingMusic.pause();
      endingMusic.currentTime = 0;
    }
  }

  playEndingTheme() {
    this.stopAllMusic();
    const endingMusic = document.getElementById("endingMusic");
    if (endingMusic) {
      endingMusic.volume = 0;
      endingMusic.play().catch(e => console.error("Error playing ending music:", e));
      
      // Fade-in suave do áudio
      let vol = 0;
      const fadeInterval = setInterval(() => {
        vol += 0.05;
        if (vol >= 0.7) {
          endingMusic.volume = 0.7; // Volume emocional e melancólico
          clearInterval(fadeInterval);
        } else {
          endingMusic.volume = vol;
        }
      }, 200);
    }
  }

  stopSynthMusic() {
    if (!this.music) return;
    try {
      this.music.bass.stop();
      this.music.pulse.stop();
    } catch(e) {}
    this.music = null;
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


// src/input.js
const keyMap = new Map([
  ["arrowleft", "left"],
  ["a", "left"],
  ["arrowright", "right"],
  ["d", "right"],
  ["arrowup", "jump"],
  ["w", "jump"],
  [" ", "jump"],
  ["j", "shoot"],
  ["x", "shoot"],
  ["control", "shoot"],
  ["f", "attack"],
  ["k", "dash"],
  ["shift", "dash"],
  ["l", "power"],
  ["e", "power"],
  ["r", "restart"],
]);

class Input {
  constructor(audio, shell) {
    this.audio = audio;
    this.shell = shell;
    this.down = new Set();
    this.pressed = new Set();
    this.bindKeys();
    this.bindButtons();
  }

  bindKeys() {
    window.addEventListener("keydown", (event) => {
      const action = keyMap.get(event.key.toLowerCase());
      if (!action) return;
      event.preventDefault();
      this.audio.unlock();
      this.tryFullscreen();
      if (!this.down.has(action)) this.pressed.add(action);
      this.down.add(action);
    });

    window.addEventListener("keyup", (event) => {
      const action = keyMap.get(event.key.toLowerCase());
      if (action) this.down.delete(action);
    });
  }

  bindButtons() {
    const buttons = [
      ["#leftBtn", "left", true],
      ["#rightBtn", "right", true],
      ["#jumpBtn", "jump", true],
      ["#attackBtn", "attack", false],
      ["#shootBtn", "shoot", false],
      ["#dashBtn", "dash", false],
      ["#powerBtn", "power", false],
      ["#restartBtn", "restart", false],
    ];

    for (const [selector, action, hold] of buttons) {
      const button = document.querySelector(selector);
      if (!button) continue;
      button.setAttribute("tabindex", "-1");
      const press = (event) => {
        event.preventDefault();
        this.audio.unlock();
        this.tryFullscreen();
        this.pressed.add(action);
        this.down.add(action);
        button.classList.add("is-down");
      };
      const release = (event) => {
        event.preventDefault();
        if (hold) this.down.delete(action);
        button.classList.remove("is-down");
      };
      button.addEventListener("pointerdown", press);
      button.addEventListener("pointerup", release);
      button.addEventListener("pointercancel", release);
      button.addEventListener("pointerleave", release);
    }
  }

  held(action) {
    return this.down.has(action);
  }

  consume(action) {
    const active = this.pressed.has(action);
    this.pressed.delete(action);
    return active;
  }

  clearFrame() {
    this.pressed.clear();
  }

  clearAll() {
    this.down.clear();
    this.pressed.clear();
    const activeBtns = document.querySelectorAll(".is-down");
    if (activeBtns) activeBtns.forEach(b => b.classList.remove("is-down"));
  }

  tryFullscreen() {
    if (document.fullscreenElement || !this.shell?.requestFullscreen) return;
    this.shell.requestFullscreen({ navigationUI: "hide" }).catch(() => {});
  }
}


// src/entities.js

const rectsOverlap = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

class Player {
  constructor() {
    this.w = 38;
    this.h = 58;
    this.maxHp = 5;
    this.reset({ x: 90, y: 380 });
  }

  reset(spawn) {
    this.x = spawn.x;
    this.y = spawn.y;
    this.vx = 0;
    this.vy = 0;
    this.hp = this.maxHp;
    this.energy = 100;
    this.facing = 1;
    this.grounded = false;
    this.hasDoubleJump = true;
    this.invulnerable = 90;
    this.shootCooldown = 0;
    this.attackCooldown = 0;
    this.dashCooldown = 0;
    this.blastCooldown = 0;
    this.dashTime = 0;
    this.attackTime = 0;
    this.shootTime = 0;
    this.hurtTime = 0;
    this.deadTime = 0;
    this.animTime = 0;
    this.firstMoveDone = false;
    this.firstMoveTime = 0;
  }

  get anim() {
    if (this.deadTime > 0) return "Dead";
    if (this.hurtTime > 0) return "Idle";
    if (this.dashTime > 0) return "Slide";
    if (this.blastCooldown > 74) return "Jump_Attack";
    if (this.attackTime > 0) return "Attack";
    if (this.shootTime > 0) return "Throw";
    if (!this.grounded) return "Jump";
    if (Math.abs(this.vx) > 0.5) return "Run";
    return "Idle";
  }

  update(game, dt) {
    const { input, level, audio } = game;
    this.animTime += dt;
    this.energy = Math.min(100, this.energy + 0.24 * dt);
    this.invulnerable = Math.max(0, this.invulnerable - dt);
    this.shootCooldown = Math.max(0, this.shootCooldown - dt);
    this.attackCooldown = Math.max(0, this.attackCooldown - dt);
    this.dashCooldown = Math.max(0, this.dashCooldown - dt);
    this.blastCooldown = Math.max(0, this.blastCooldown - dt);
    this.dashTime = Math.max(0, this.dashTime - dt);
    this.attackTime = Math.max(0, this.attackTime - dt);
    this.shootTime = Math.max(0, this.shootTime - dt);
    this.hurtTime = Math.max(0, this.hurtTime - dt);

    if (this.deadTime > 0) {
      this.deadTime += dt;
      this.vy += VIEW.gravity * dt;
      this.y += this.vy * dt;
      return;
    }

    // Hack para corrigir stuck input ao iniciar o jogo
    if (!this.firstMoveDone && game.levelIndex === 0 && input.pressed.size > 0) {
      this.firstMoveDone = true;
      this.firstMoveTime = 8; // Passo pequeno (duração)
    } else if (!this.firstMoveDone && game.levelIndex !== 0) {
      this.firstMoveDone = true;
    }

    if (this.firstMoveTime > 0) {
      this.firstMoveTime -= dt;
      this.vx = -6; // Passo pequeno para trás (bem fraco)
      this.facing = 1; 
      this.vy += VIEW.gravity * dt;
      this.collide(level.platforms, dt);
      this.x = Math.max(0, Math.min(level.width - this.w, this.x));
      return;
    }

    if (input.held("left")) {
      this.vx -= 0.72 * dt;
      this.facing = -1;
    }
    if (input.held("right")) {
      this.vx += 0.72 * dt;
      this.facing = 1;
    }
    if (input.consume("jump")) {
      if (this.grounded) {
        this.vy = -14.6;
        this.grounded = false;
        this.hasDoubleJump = true;
      } else if (this.hasDoubleJump) {
        this.vy = -12.5;
        this.hasDoubleJump = false;
        game.burst(this.x + this.w / 2, this.y + this.h, "rgba(50, 0, 80, 0.8)", 15, this.facing);
        if (game.audio.jump) game.audio.jump();
      }
    }
    if (input.consume("attack")) this.attack(game);
    if (input.consume("shoot")) this.shoot(game);
    if (input.consume("dash")) this.dash(game);
    if (input.consume("power")) this.blast(game);

    if (this.dashTime <= 0) {
      this.vx *= VIEW.friction ** dt;
      this.vx = Math.max(-6.5, Math.min(6.5, this.vx));
      this.vy += VIEW.gravity * dt;
      this.vy = Math.min(this.vy, 17);
    } else {
      this.vx = this.facing * 17.5;
      this.vy *= 0.35;
      game.trail(this.x + this.w / 2, this.y + this.h / 2, this.facing);
    }

    this.collide(level.platforms, dt);
    this.x = Math.max(0, Math.min(level.width - this.w, this.x));
    if (this.y > VIEW.height + 120) this.takeDamage(game, 99);
  }

  collide(platforms, dt) {
    this.grounded = false;
    this.x += this.vx * dt;
    for (const platform of platforms) {
      if (!rectsOverlap(this, platform)) continue;
      if (this.vx > 0) this.x = platform.x - this.w;
      if (this.vx < 0) this.x = platform.x + platform.w;
      this.vx = 0;
    }

    this.y += this.vy * dt;
    for (const platform of platforms) {
      if (!rectsOverlap(this, platform)) continue;
      if (this.vy > 0) {
        this.y = platform.y - this.h;
        this.vy = 0;
        this.grounded = true;
        this.hasDoubleJump = true;
      } else if (this.vy < 0) {
        this.y = platform.y + platform.h;
        this.vy = 1.8;
      }
    }
  }

  attack(game) {
    if (this.attackCooldown > 0) return;
    this.attackCooldown = 22;
    this.attackTime = 18;
    this.animTime = 0;
    game.shake = Math.max(game.shake, 4);
    game.audio.tone(300, 0.08, "triangle", 0.18, 360);
    const hitbox = {
      x: this.facing > 0 ? this.x + this.w - 4 : this.x - 44,
      y: this.y + 10,
      w: 48,
      h: 38,
    };
    const dmg = Math.floor(2 * (this.damageMultiplier || 1));
    for (const enemy of game.enemies) {
      if (enemy.alive && rectsOverlap(hitbox, enemy)) {
        game.damageEnemy(enemy, dmg, this.facing);
        game.shake = Math.max(game.shake, 8); // Hit-Stop feel
      }
    }
    game.slashes.push({ ...hitbox, facing: this.facing, life: 12 });
  }

  shoot(game) {
    if (this.shootCooldown > 0) return;
    this.shootCooldown = 14;
    this.shootTime = 12;
    this.animTime = 0;
    game.projectiles.push(new Projectile(this.x + this.w / 2 + this.facing * 22, this.y + 22, this.facing));
    game.burst(this.x + this.w / 2 + this.facing * 26, this.y + 25, "#4df8ff", 8, this.facing);
    game.audio.laser();
  }

  dash(game) {
    if (this.dashCooldown > 0 || this.energy < 24) return;
    this.energy -= 24;
    this.dashCooldown = 54;
    this.dashTime = 13;
    this.animTime = 0;
    this.invulnerable = Math.max(this.invulnerable, 20); // Ghost dash gives more invuln
    game.shake = Math.max(game.shake, 5);
    game.burst(this.x + this.w/2, this.y + this.h/2, "rgba(80, 0, 150, 0.7)", 12, this.facing);
    game.audio.dash();
  }

  blast(game) {
    if (this.blastCooldown > 0 || this.energy < 55) return;
    this.energy -= 55;
    this.blastCooldown = 92;
    this.animTime = 0;
    this.invulnerable = Math.max(this.invulnerable, 22);
    game.blasts.push({ x: this.x + this.w / 2, y: this.y + this.h / 2, radius: 18, max: 156, life: 24 });
    for (const enemy of game.enemies) {
      const dx = enemy.x + enemy.w / 2 - (this.x + this.w / 2);
      const dy = enemy.y + enemy.h / 2 - (this.y + this.h / 2);
      const dmg = Math.floor(4 * (this.damageMultiplier || 1));
      if (enemy.alive && Math.hypot(dx, dy) < 170) {
        game.damageEnemy(enemy, dmg, Math.sign(dx) || this.facing);
      }
    }
    game.shake = Math.max(game.shake, 12);
    game.radial(this.x + this.w / 2, this.y + this.h / 2);
    game.audio.blast();
  }

  takeDamage(game, amount = 1) {
    if (this.invulnerable > 0 || this.deadTime > 0 || game.state !== "playing") return;
    this.hp -= amount;
    this.hurtTime = 34;
    this.animTime = 0;
    this.invulnerable = 72;
    this.vx = -this.facing * 7;
    this.vy = -6;
    game.shake = Math.max(game.shake, 9);
    game.burst(this.x + this.w / 2, this.y + 24, "#ff3df2", 16, -this.facing);
    game.audio.hit();
    if (this.hp <= 0) {
      this.deadTime = 1;
      this.animTime = 0;
      this.vy = -8;
      game.lose();
    }
  }
}

class Enemy {
  constructor(data) {
    this.start = { ...data };
    this.reset();
  }

  reset() {
    Object.assign(this, this.start);
    this.w = 46;
    this.h = 54;
    this.alive = true;
    this.hit = 0;
    this.state = 'Run';
    this.animTime = 0;
    this.stateTimer = 0;
    this.cooldown = 0;
    this.facing = this.vx > 0 ? 1 : -1;
    this.vy = 0;
    this.vx = this.vx || (Math.random() > 0.5 ? 1.5 : -1.5);
    this.y = this.start.y - 16;
  }

  update(game, dt) {
    if (!this.alive) {
       if (this.state !== 'Dead') {
          this.state = 'Dead';
          this.animTime = 0;
       }
       this.animTime += dt;
       return;
    }

    this.hit = Math.max(0, this.hit - dt);
    this.animTime += dt;
    this.cooldown = Math.max(0, this.cooldown - dt);
    this.stateTimer = Math.max(0, this.stateTimer - dt);

    this.vy += VIEW.gravity * dt;
    this.y += this.vy * dt;
    let onGround = false;
    let currentPlatform = null;
    
    for (const platform of game.level.platforms) {
      if (rectsOverlap(this, platform) && this.vy > 0) {
        this.y = platform.y - this.h;
        this.vy = 0;
        onGround = true;
        currentPlatform = platform;
      }
    }

    const distToPlayerX = game.player.x - (this.x + this.w/2);
    const distToPlayerY = game.player.y - (this.y + this.h/2);
    const distToPlayer = Math.hypot(distToPlayerX, distToPlayerY);
    
    if (this.state === 'Run' || this.state === 'Idle') {
        if (distToPlayer < 70 && Math.abs(distToPlayerY) < 50 && this.cooldown === 0) {
            this.state = 'Melee';
            this.stateTimer = 30;
            this.animTime = 0;
            this.facing = distToPlayerX > 0 ? 1 : -1;
            this.cooldown = 80;
        } else if (distToPlayer < 350 && Math.abs(distToPlayerY) < 60 && this.cooldown === 0) {
            this.state = 'Shoot';
            this.stateTimer = 40;
            this.animTime = 0;
            this.facing = distToPlayerX > 0 ? 1 : -1;
            this.cooldown = 120;
        } else {
            this.state = 'Run';
            
            let nextX = this.x + this.vx * dt;
            let hitWallOrLedge = false;
            
            if (nextX < this.min || nextX + this.w > this.max) {
                hitWallOrLedge = true;
            }

            if (onGround && currentPlatform) {
                const footX = this.vx > 0 ? nextX + this.w : nextX;
                if (footX < currentPlatform.x || footX > currentPlatform.x + currentPlatform.w) {
                    hitWallOrLedge = true;
                }
            }

            if (hitWallOrLedge) {
                this.vx *= -1;
                this.facing = this.vx > 0 ? 1 : -1;
            } else {
                this.x = nextX;
            }
        }
    } else if (this.state === 'Melee') {
        if (this.stateTimer <= 16 && this.stateTimer >= 14) {
            if (distToPlayer < 75 && Math.sign(distToPlayerX) === this.facing) {
                game.player.takeDamage(game, 1);
            }
        } else if (this.stateTimer <= 0) {
            this.state = 'Run';
        }
    } else if (this.state === 'Shoot') {
        if (this.stateTimer <= 21 && this.stateTimer >= 19 && !this.shot) {
            game.enemyBullets.push(new EnemyBullet(this.x + this.w/2 + this.facing * 10, this.y + this.h/2 - 12, this.facing));
            this.shot = true;
        } else if (this.stateTimer <= 0) {
            this.state = 'Run';
            this.shot = false;
        }
    }

    if (rectsOverlap(game.player, this) && game.player.invulnerable <= 0) {
      const stomp = game.player.vy > 0 && game.player.y + game.player.h - this.y < 20;
      if (stomp) {
        game.damageEnemy(this, 2, Math.sign(game.player.vx) || game.player.facing);
        game.player.vy = -9;
      } else {
        if (this.state !== 'Dead') {
           game.player.takeDamage(game, 1);
        }
      }
    }
  }
}

class EnemyBullet {
  constructor(x, y, facing) {
    this.x = x;
    this.y = y;
    this.w = 16;
    this.h = 10;
    this.vx = facing * 9;
    this.facing = facing;
    this.life = 100;
    this.animTime = 0;
  }
  update(game, dt) {
    this.x += this.vx * dt;
    this.life -= dt;
    this.animTime += dt;
    if (rectsOverlap(this, game.player)) {
       game.player.takeDamage(game, 1);
       this.life = 0;
       game.burst(this.x, this.y, "#ffaa00", 5, this.facing);
    }
  }
}

class Boss {
  constructor(data) {
    this.start = { ...data };
    this.reset();
  }

  reset() {
    Object.assign(this, this.start);
    this.w = 80;
    this.h = 90;
    this.maxHp = this.hp;
    this.alive = true;
    this.hit = 0;
    this.facing = -1;
    this.state = 'Idle';
    this.stateTimer = 0;
    this.animTime = 0;
    this.vy = 0;
    this.vx = 0;
    this.grounded = false;
    this.cooldown = 110;
    this.phase = 1;
  }

  update(game, dt) {
    if (!this.alive) {
      if (this.state !== 'Dead') {
        this.state = 'Dead';
        this.animTime = 0;
        this.vx = 0;
      }
      if (this.animTime < 9 * 6) this.animTime += dt;
      else {
        game.playEndingSequence();
      }
      return;
    }

    this.animTime += dt;
    this.hit = Math.max(0, this.hit - dt);
    this.cooldown = Math.max(0, this.cooldown - dt);
    this.stateTimer = Math.max(0, this.stateTimer - dt);
    this.vy += VIEW.gravity * dt;
    
    this.y += this.vy * dt;
    let onGround = false;
    for (const platform of game.level.platforms) {
      if (rectsOverlap(this, platform) && this.vy > 0) {
        this.y = platform.y - this.h;
        this.vy = 0;
        onGround = true;
      }
    }
    this.grounded = onGround;

    const distToPlayerX = game.player.x - (this.x + this.w/2);
    if (this.state === 'Idle' || this.state === 'Run') {
      this.facing = distToPlayerX > 0 ? 1 : -1;
    }

    const hpPct = this.hp / this.maxHp;
    if (hpPct <= 0.5 && this.phase === 1) this.phase = 2;
    if (hpPct <= 0.25 && this.phase === 2) {
       this.phase = 3;
       game.burst(this.x + this.w/2, this.y + this.h/2, "#ff0000", 30, 0);
    }

    if (this.phase === 3) {
       game.shake = Math.max(game.shake, 2); // Camera Shake contínuo
       // Rastro elemental do Boss
       if (Math.random() > 0.6) {
         game.burst(this.x + this.w/2, this.y + this.h, "rgba(255, 0, 0, 0.4)", 2, 0);
       }
    }

    if (this.state === 'Idle' || this.state === 'Run') {
        if (this.cooldown === 0) {
          const rand = Math.random();
          if (rand < 0.35) {
             this.state = 'Jump_Attack';
             this.stateTimer = this.phase >= 2 ? 35 : 45;
             this.animTime = 0;
             this.vy = -12.5;
             this.vx = this.facing * (this.phase >= 2 ? 10 : 8);
          } else if (rand < 0.7) {
             this.state = 'Throw';
             this.stateTimer = this.phase >= 2 ? 30 : 45;
             this.animTime = 0;
             this.vx = 0;
          } else {
             this.state = 'Attack';
             this.stateTimer = this.phase >= 2 ? 25 : 35;
             this.animTime = 0;
             this.vx = this.facing * (this.phase >= 2 ? 5.5 : 3.8);
          }
          this.cooldown = this.phase === 3 ? 60 : (this.phase === 2 ? 90 : 140);
        } else {
          if (Math.abs(distToPlayerX) > 130) {
             this.state = 'Run';
             this.vx = this.facing * (this.phase >= 2 ? 2.5 : 1.8);
          } else {
             this.state = 'Idle';
             this.vx = 0;
          }
        }
    }

    if (this.state === 'Jump_Attack') {
       if (this.grounded && this.vy >= 0 && this.stateTimer < 35) {
           this.state = 'Idle';
           this.vx = 0;
           game.shake = Math.max(game.shake, 12);
       }
    } else if (this.state === 'Throw') {
       if (this.stateTimer <= 17 && this.stateTimer >= 15) {
           if (!this.threw) {
               game.kunais.push(new KunaiProjectile(this.x + this.w/2, this.y + this.h/2 - 10, this.facing));
               this.threw = true;
           }
       } else if (this.stateTimer <= 0) {
           this.state = 'Idle';
           this.threw = false;
       }
    } else if (this.state === 'Attack') {
       if (this.stateTimer <= 0) {
           this.state = 'Idle';
           this.vx = 0;
       }
    }

    if (this.state !== 'Idle' && this.state !== 'Throw') {
       this.x += this.vx * dt;
    }

    this.x = Math.max(0, Math.min(game.level.width - this.w, this.x));

    if (rectsOverlap(game.player, this) && this.hit === 0) {
       game.player.takeDamage(game, 1);
    }
  }
}

class KunaiProjectile {
  constructor(x, y, facing) {
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 6;
    this.vx = facing * 7.5;
    this.facing = facing;
    this.life = 120;
  }
  update(game, dt) {
    this.x += this.vx * dt;
    this.life -= dt;
    if (rectsOverlap(this, game.player)) {
       game.player.takeDamage(game, 1);
       this.life = 0;
       game.burst(this.x, this.y, "#ffffff", 6, this.facing);
    }
  }
}

class Projectile {
  constructor(x, y, facing) {
    this.x = x;
    this.y = y;
    this.w = 32;
    this.h = 12;
    this.vx = facing * 14;
    this.facing = facing;
    this.life = 72;
  }

  update(game, dt) {
    this.x += this.vx * dt;
    this.life -= dt;
    game.burst(this.x, this.y + 4, "#4df8ff", 2, -this.facing);
    for (const enemy of game.enemies) {
      if (!enemy.alive || !rectsOverlap(this, enemy)) continue;
      this.life = 0;
      game.damageEnemy(enemy, 1, this.facing);
      game.shake = Math.max(game.shake, 4);
      game.burst(this.x, this.y, "#ff3df2", 10, this.facing);
      break;
    }
  }
}


// src/renderer.js

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.sprite = new Image();
    this.sprite.src = SPRITE_SRC;
    this.cleaned = null;
    this.ready = false;
    this.sprite.addEventListener("load", () => this.prepareSprite());

    this.playerAnims = {};
    const playerAnimNames = [
      { name: 'Attack', type: '__' }, { name: 'Climb', type: '_' },
      { name: 'Dead', type: '__' }, { name: 'Glide', type: '_' },
      { name: 'Idle', type: '__' }, { name: 'Jump_Attack', type: '__' },
      { name: 'Jump_Throw', type: '__' }, { name: 'Jump', type: '__' },
      { name: 'Run', type: '__' }, { name: 'Slide', type: '__' },
      { name: 'Throw', type: '__' }
    ];
    playerAnimNames.forEach(anim => {
      this.playerAnims[anim.name] = [];
      for (let i = 0; i < 10; i++) {
        const img = new Image();
        img.src = `./assets/personagem_principal/${anim.name}${anim.type}00${i}.png`;
        this.playerAnims[anim.name].push(img);
      }
    });
    this.playerKunaiImg = new Image();
    this.playerKunaiImg.src = './assets/personagem_principal/Kunai.png';

    this.bossAnims = {};
    const animNames = [
      { name: 'Attack', type: '__' }, { name: 'Climb', type: '_' },
      { name: 'Dead', type: '__' }, { name: 'Glide', type: '_' },
      { name: 'Idle', type: '__' }, { name: 'Jump_Attack', type: '__' },
      { name: 'Jump_Throw', type: '__' }, { name: 'Jump', type: '__' },
      { name: 'Run', type: '__' }, { name: 'Slide', type: '__' },
      { name: 'Throw', type: '__' }
    ];
    animNames.forEach(anim => {
      this.bossAnims[anim.name] = [];
      for (let i = 0; i < 10; i++) {
        const img = new Image();
        img.src = `./assets/boss final/${anim.name}${anim.type}00${i}.png`;
        this.bossAnims[anim.name].push(img);
      }
    });
    this.kunaiImg = new Image();
    this.kunaiImg.src = './assets/boss final/Kunai.png';

    this.inimigoAnims = {};
    const inimigoAnimNames = [
      { name: 'Dead', frames: 10 },
      { name: 'Idle', frames: 10 },
      { name: 'Jump', frames: 10 },
      { name: 'JumpMelee', frames: 8 },
      { name: 'JumpShoot', frames: 5 },
      { name: 'Melee', frames: 8 },
      { name: 'Run', frames: 8 },
      { name: 'RunShoot', frames: 9 },
      { name: 'Shoot', frames: 4 },
      { name: 'Slide', frames: 10 }
    ];
    inimigoAnimNames.forEach(anim => {
      this.inimigoAnims[anim.name] = [];
      for (let i = 1; i <= anim.frames; i++) {
        const img = new Image();
        img.src = `./assets/inimigos/${anim.name} (${i}).png`;
        this.inimigoAnims[anim.name].push(img);
      }
    });

    this.inimigoBullets = [];
    for (let i = 0; i <= 4; i++) {
      const img = new Image();
      img.src = `./assets/inimigos/Objects/Bullet_00${i}.png`;
      this.inimigoBullets.push(img);
    }

    this.graveyard = { bg: new Image(), tiles: [], objects: [] };
    this.graveyard.bg.src = './assets/graveyardtilesetnew/png/BG.png';
    for (let i = 1; i <= 16; i++) {
      const img = new Image();
      img.src = `./assets/graveyardtilesetnew/png/Tiles/Tile (${i}).png`;
      this.graveyard.tiles.push(img);
    }
    const graveyardObjs = ['ArrowSign', 'Bush (1)', 'Bush (2)', 'Crate', 'DeadBush', 'Sign', 'Skeleton', 'TombStone (1)', 'TombStone (2)', 'Tree'];
    graveyardObjs.forEach(name => {
      const img = new Image();
      img.src = `./assets/graveyardtilesetnew/png/Objects/${name}.png`;
      this.graveyard.objects.push(img);
    });
  }

  prepareSprite() {
    const buffer = document.createElement("canvas");
    buffer.width = this.sprite.width;
    buffer.height = this.sprite.height;
    const bctx = buffer.getContext("2d");
    bctx.imageSmoothingEnabled = false;
    try {
      bctx.drawImage(this.sprite, 0, 0);
      const image = bctx.getImageData(0, 0, buffer.width, buffer.height);
      for (let i = 0; i < image.data.length; i += 4) {
        const r = image.data[i];
        const g = image.data[i + 1];
        const b = image.data[i + 2];
        if (r > 246 && g > 246 && b > 246) image.data[i + 3] = 0;
      }
      bctx.putImageData(image, 0, 0);
      this.cleaned = buffer;
    } catch {
      this.cleaned = this.sprite;
    }
    this.ready = true;
  }

  render(game) {
    const ctx = this.ctx;
    ctx.imageSmoothingEnabled = false;
    ctx.save();
    ctx.clearRect(0, 0, VIEW.width, VIEW.height);
    const shakeX = (Math.random() - 0.5) * game.shake;
    const shakeY = (Math.random() - 0.5) * game.shake;
    ctx.translate(shakeX, shakeY);

    this.background(game);
    ctx.save();
    ctx.translate(-Math.round(game.camera.x), 0);
    this.level(game);
    try {
      game.pickups.forEach((pickup) => this.pickup(pickup, game.frame));
      game.enemies.forEach((enemy) => this.enemy(enemy, game.frame));
      game.projectiles.forEach((projectile) => this.projectile(projectile, game.frame));
      game.kunais.forEach((kunai) => this.kunai(kunai));
      game.enemyBullets.forEach((eb) => this.enemyBullet(eb, game.frame));
      game.slashes.forEach((slash) => this.slash(slash));
      game.blasts.forEach((blast) => this.blast(blast));
      this.player(game.player, game.frame);
      game.particles.forEach((particle) => this.particle(particle));
    } catch (e) {
      console.error("Render error:", e);
    }
    ctx.restore();
    this.scanlines(game.frame);
    this.overlay(game);
    ctx.restore();
  }

  background(game) {
    const { ctx } = this;
    const gradient = ctx.createLinearGradient(0, 0, 0, VIEW.height);
    game.level.sky.forEach((stop, i) => gradient.addColorStop(i / (game.level.sky.length - 1), stop));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, VIEW.width, VIEW.height);

    if (game.level.shortName === "BOSS") {
      this.graveyardBg(game);
    } else if (game.levelIndex === 0) {
      this.city(game);
    } else {
      this.lab(game);
    }
  }

  graveyardBg(game) {
    const { ctx } = this;
    const camera = game.camera.x;
    ctx.save();
    if (this.graveyard.bg.complete) {
      // Parallax do BG do cemitério
      for (let x = -((camera * 0.15) % VIEW.width); x < VIEW.width; x += VIEW.width) {
        ctx.drawImage(this.graveyard.bg, x, 0, VIEW.width, VIEW.height);
      }
    }
    // Fase 2 e 3 do boss (escurecimento e tremor)
    const boss = game.enemies[0];
    if (boss && boss.type === "boss") {
      const hpPct = boss.hp / boss.maxHp;
      if (hpPct <= 0.5) {
        ctx.fillStyle = `rgba(15, 5, 20, ${0.4 + (0.5 - hpPct)})`; // Fica mais escuro quanto menos vida
        ctx.fillRect(0, 0, VIEW.width, VIEW.height);
      }
      if (hpPct <= 0.25) {
        ctx.fillStyle = `rgba(255, 0, 0, ${Math.random() * 0.05})`; // Flashes vermelhos
        ctx.fillRect(0, 0, VIEW.width, VIEW.height);
      }
    }
    // Neblina / Névoa base
    ctx.fillStyle = `rgba(20, 25, 30, 0.3)`;
    ctx.fillRect(0, 0, VIEW.width, VIEW.height);
    ctx.restore();
  }

  city(game) {
    const { ctx } = this;
    const camera = game.camera.x;
    for (let layer = 0; layer < 3; layer += 1) {
      const speed = 0.1 + layer * 0.08;
      const base = 456 - layer * 48;
      const width = 90 + layer * 26;
      ctx.save();
      ctx.translate(-(camera * speed) % (width + 36), 0);
      for (let x = -120; x < VIEW.width + width + 180; x += width + 36) {
        const h = 120 + ((x * 13 + layer * 80) % 170);
        ctx.fillStyle = `rgba(${20 + layer * 18}, ${28 + layer * 20}, ${58 + layer * 34}, ${0.8 - layer * 0.13})`;
        ctx.fillRect(x, base - h, width, h);
        for (let yy = base - h + 18; yy < base - 10; yy += 28) {
          ctx.fillStyle = (Math.floor((x + yy + game.frame) / 35) % 3 === 0) ? "rgba(255,61,242,.72)" : "rgba(77,248,255,.42)";
          ctx.fillRect(x + 12, yy, width - 24, 4);
        }
      }
      ctx.restore();
    }
    ctx.strokeStyle = "rgba(77,248,255,.28)";
    ctx.lineWidth = 1;
    for (let x = -80; x < VIEW.width + 120; x += 42) {
      ctx.beginPath();
      ctx.moveTo(x - (game.frame * 2) % 42, 0);
      ctx.lineTo(x - 170 - (game.frame * 2) % 42, VIEW.height);
      ctx.stroke();
    }
  }

  lab(game) {
    const { ctx } = this;
    const camera = game.camera.x;
    ctx.save();
    ctx.translate(-(camera * 0.18) % 220, 0);
    for (let x = -220; x < VIEW.width + 260; x += 220) {
      ctx.strokeStyle = "rgba(77,248,255,.28)";
      ctx.lineWidth = 4;
      ctx.strokeRect(x + 24, 58, 62, 360);
      ctx.strokeRect(x + 122, 96, 48, 260);
      const pulse = 0.45 + Math.sin(game.frame * 0.04 + x) * 0.2;
      ctx.fillStyle = `rgba(77,248,255,${pulse})`;
      ctx.fillRect(x + 38, 82, 34, 312);
      ctx.fillStyle = `rgba(255,61,242,${pulse * 0.55})`;
      ctx.fillRect(x + 134, 118, 24, 216);
    }
    ctx.restore();
    ctx.strokeStyle = "rgba(141,92,255,.25)";
    for (let y = 48; y < VIEW.height; y += 42) {
      ctx.beginPath();
      ctx.moveTo(0, y + Math.sin(game.frame * 0.03 + y) * 8);
      ctx.lineTo(VIEW.width, y + Math.cos(game.frame * 0.03 + y) * 8);
      ctx.stroke();
    }
  }

  level(game) {
    game.level.platforms.forEach((platform) => this.platform(platform, game.frame, game));
    
    if (game.level.shortName === "BOSS" && game.level.decorations) {
      game.level.decorations.forEach(dec => {
        const objImg = this.graveyard.objects[dec.typeId];
        if (objImg && objImg.complete) {
          this.ctx.drawImage(objImg, dec.x, dec.y, dec.w, dec.h);
        }
      });
    }

    this.gate(game.level.gate, game.frame);
  }

  platform(platform, frame, game) {
    const { ctx } = this;
    if (game && game.level.shortName === "BOSS" && this.graveyard.tiles.length > 0) {
      const tileWidth = 128;
      const tileHeight = 128;
      ctx.save();
      for (let x = platform.x; x < platform.x + platform.w; x += tileWidth) {
        const t = this.graveyard.tiles[1]; // Tile(2) is top grass
        if (t && t.complete) {
          const drawW = Math.min(tileWidth, (platform.x + platform.w) - x);
          ctx.drawImage(t, 0, 0, drawW * (t.width/tileWidth), t.height, x, platform.y, drawW, tileHeight);
        }
        ctx.fillStyle = "#161b22";
        ctx.fillRect(x, platform.y + tileHeight, Math.min(tileWidth, (platform.x + platform.w) - x), platform.h - tileHeight);
      }
      ctx.restore();
      return;
    }

    const glow = platform.type === "ground" ? "#4df8ff" : platform.type === "ad" || platform.type === "tube" ? "#ff3df2" : "#8d5cff";
    ctx.fillStyle = platform.type === "ground" ? "#11152a" : "rgba(13,20,48,.92)";
    ctx.strokeStyle = glow;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 15;
    ctx.shadowColor = glow;
    ctx.fillRect(platform.x, platform.y, platform.w, platform.h);
    ctx.strokeRect(platform.x, platform.y, platform.w, platform.h);
    ctx.shadowBlur = 0;
    ctx.fillStyle = glow;
    const step = platform.type === "ground" ? 46 : 34;
    for (let x = platform.x + 8; x < platform.x + platform.w - 8; x += step) {
      ctx.globalAlpha = 0.26 + Math.sin(frame * 0.05 + x) * 0.12;
      ctx.fillRect(x, platform.y + 7, step * 0.55, 3);
    }
    ctx.globalAlpha = 1;
  }

  gate(gate, frame) {
    const { ctx } = this;
    const pulse = 0.55 + Math.sin(frame * 0.08) * 0.2;
    ctx.fillStyle = "rgba(5,7,17,.86)";
    ctx.strokeStyle = "#4df8ff";
    ctx.lineWidth = 3;
    ctx.shadowBlur = 24;
    ctx.shadowColor = "#ff3df2";
    ctx.fillRect(gate.x, gate.y, gate.w, gate.h);
    ctx.strokeRect(gate.x, gate.y, gate.w, gate.h);
    ctx.fillStyle = `rgba(255,61,242,${pulse})`;
    ctx.fillRect(gate.x + 10, gate.y + 16, gate.w - 20, gate.h - 32);
    ctx.shadowBlur = 0;
  }

  pickup(pickup, frame) {
    if (pickup.taken) return;
    const { ctx } = this;
    const y = pickup.y + Math.sin(frame * 0.07 + pickup.x) * 5;
    ctx.save();
    ctx.translate(Math.round(pickup.x), Math.round(y));
    ctx.rotate(Math.PI / 4 + frame * 0.02);
    ctx.fillStyle = "#4df8ff";
    ctx.shadowBlur = 16;
    ctx.shadowColor = "#4df8ff";
    ctx.fillRect(-8, -8, 16, 16);
    ctx.strokeStyle = "#ff3df2";
    ctx.strokeRect(-12, -12, 24, 24);
    ctx.restore();
  }

  enemy(enemy, frame) {
    if (!enemy.alive && enemy.type !== "boss") return;
    if (enemy.type === "boss") {
      this.renderBoss(enemy, frame);
      return;
    }
    const { ctx } = this;
    
    ctx.save();
    ctx.translate(Math.round(enemy.x + enemy.w / 2), Math.round(enemy.y + enemy.h / 2 + 5));
    ctx.scale(enemy.facing, 1);
    
    let frames = this.inimigoAnims[enemy.state];
    if (!frames || frames.length === 0) frames = this.inimigoAnims['Idle'];
    
    if (frames && frames.length > 0) {
      const speed = enemy.state === 'Dead' ? 5 : (enemy.state === 'Run' ? 4 : 5);
      let index = Math.floor(enemy.animTime / speed);
      if (enemy.state === 'Dead' || enemy.state === 'Shoot' || enemy.state === 'Melee') {
          index = Math.min(index, frames.length - 1);
          if (enemy.state === 'Dead' && index === frames.length - 1 && enemy.animTime > frames.length * speed + 30) {
             ctx.restore();
             return;
          }
      } else {
          index = index % frames.length;
      }
      const img = frames[index];
      if (img && img.complete) {
          ctx.shadowBlur = enemy.hit > 0 ? 20 : 0;
          ctx.shadowColor = "#ff3df2";
          if (enemy.hit > 0) ctx.globalAlpha = 0.7 + Math.sin(frame) * 0.3;
          const scale = 0.22;
          ctx.drawImage(img, -img.width * scale / 2, -img.height * scale / 2, img.width * scale, img.height * scale);
      }
    }
    ctx.restore();
  }

  renderBoss(boss, frameNo) {
    const { ctx } = this;
    ctx.save();
    ctx.translate(Math.round(boss.x + boss.w / 2), Math.round(boss.y + boss.h / 2 + 10));
    ctx.scale(boss.facing, 1);
    
    let frames = this.bossAnims[boss.state];
    if (!frames) frames = this.bossAnims['Idle'];
    
    const speed = boss.state === 'Dead' ? 6 : (boss.state === 'Run' ? 4 : 5);
    let index = Math.floor(boss.animTime / speed);
    if (boss.state === 'Dead' || boss.state === 'Throw' || boss.state === 'Attack' || boss.state === 'Jump_Attack') {
        index = Math.min(index, frames.length - 1);
    } else {
        index = index % frames.length;
    }
    
    const img = frames[index];
    if (img && img.complete) {
        ctx.shadowBlur = boss.hit > 0 ? 20 : 0;
        ctx.shadowColor = "#ff3df2";
        if (boss.hit > 0) ctx.globalAlpha = 0.7 + Math.sin(frameNo) * 0.3;
        
        const scale = 0.32; 
        ctx.drawImage(img, -img.width * scale / 2, -img.height * scale / 2, img.width * scale, img.height * scale);
    }
    ctx.restore();
    
    if (boss.alive) {
        ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
        ctx.fillRect(boss.x, boss.y - 15, boss.w * (boss.hp / boss.maxHp), 6);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
        ctx.strokeRect(boss.x, boss.y - 15, boss.w, 6);
    }
  }

  kunai(kunai) {
    const { ctx } = this;
    ctx.save();
    ctx.translate(Math.round(kunai.x), Math.round(kunai.y));
    ctx.scale(kunai.facing, 1);
    if (this.kunaiImg && this.kunaiImg.complete) {
        ctx.drawImage(this.kunaiImg, -15, -6, 30, 12);
    } else {
        ctx.fillStyle = "white";
        ctx.fillRect(-10, -2, 20, 4);
    }
    ctx.restore();
  }

  enemyBullet(eb, frameNo) {
    const { ctx } = this;
    ctx.save();
    ctx.translate(Math.round(eb.x), Math.round(eb.y));
    ctx.scale(eb.facing, 1);
    
    if (this.inimigoBullets && this.inimigoBullets.length > 0) {
        const index = Math.floor(eb.animTime / 4) % this.inimigoBullets.length;
        const img = this.inimigoBullets[index];
        if (img && img.complete) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#ffaa00";
            ctx.drawImage(img, -10, -10, 20, 20);
        }
    } else {
        ctx.fillStyle = "#ffaa00";
        ctx.fillRect(-8, -5, 16, 10);
    }
    ctx.restore();
  }

  player(player, frameNo) {
    const { ctx } = this;
    const blink = player.invulnerable > 0 && Math.floor(frameNo / 5) % 2 === 0 && player.hurtTime > 0;
    if (blink) return;

    let frames = this.playerAnims[player.anim];
    if (!frames || frames.length === 0) frames = this.playerAnims['Idle'];
    
    const animConfig = {
      'Idle': { speed: 6, loop: true },
      'Run': { speed: 3, loop: true },
      'Jump': { speed: 4, loop: true },
      'Attack': { speed: 3, loop: false },
      'Throw': { speed: 3, loop: false },
      'Slide': { speed: 4, loop: true },
      'Jump_Attack': { speed: 3, loop: false },
      'Dead': { speed: 6, loop: false },
    };
    
    const config = animConfig[player.anim] || { speed: 8, loop: true };
    const index = config.loop
      ? Math.floor(player.animTime / config.speed) % frames.length
      : Math.min(frames.length - 1, Math.floor(player.animTime / config.speed));
      
    const img = frames[index];
    if (!img || !img.complete) return;

    ctx.save();
    // Offset da y para que os pés encostem no chão
    ctx.translate(Math.round(player.x + player.w / 2), Math.round(player.y + player.h + 5));
    ctx.scale(player.facing, 1);
    ctx.shadowBlur = player.dashTime > 0 ? 24 : 10;
    ctx.shadowColor = player.dashTime > 0 ? "#4df8ff" : "rgba(255,61,242,.6)";
    
    const scale = 0.22;
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    // Desenha centralizado horizontalmente e ancorado pela base (pés)
    ctx.drawImage(img, -drawW / 2, -drawH, drawW, drawH);
    ctx.restore();
  }

  projectile(projectile, frameNo) {
    const { ctx } = this;
    ctx.save();
    ctx.translate(Math.round(projectile.x), Math.round(projectile.y));
    ctx.scale(projectile.facing, 1);
    ctx.shadowBlur = 18;
    ctx.shadowColor = "#4df8ff";
    if (this.playerKunaiImg && this.playerKunaiImg.complete) {
      ctx.drawImage(this.playerKunaiImg, -16, -6, 32, 12);
    } else {
      ctx.fillStyle = "rgba(77,248,255,.7)";
      ctx.fillRect(-14, -2, 38, 4);
    }
    ctx.restore();
  }

  slash(slash) {
    const { ctx } = this;
    ctx.save();
    ctx.globalAlpha = slash.life / 12;
    ctx.strokeStyle = "#ff3df2";
    ctx.lineWidth = 5;
    ctx.shadowBlur = 24;
    ctx.shadowColor = "#ff3df2";
    ctx.beginPath();
    const startX = slash.facing > 0 ? slash.x : slash.x + slash.w;
    ctx.arc(startX, slash.y + slash.h / 2, 42, -0.8, 0.8, slash.facing < 0);
    ctx.stroke();
    ctx.restore();
  }

  blast(blast) {
    const { ctx } = this;
    ctx.save();
    ctx.globalAlpha = blast.life / 24;
    ctx.strokeStyle = "#4df8ff";
    ctx.lineWidth = 4;
    ctx.shadowBlur = 30;
    ctx.shadowColor = "#ff3df2";
    ctx.beginPath();
    ctx.arc(blast.x, blast.y, blast.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "#ff3df2";
    ctx.beginPath();
    ctx.arc(blast.x, blast.y, blast.radius * 0.68, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  particle(particle) {
    const { ctx } = this;
    ctx.save();
    ctx.globalAlpha = Math.max(0, particle.life / particle.maxLife);
    ctx.fillStyle = particle.color;
    ctx.shadowBlur = 16;
    ctx.shadowColor = particle.color;
    ctx.fillRect(Math.round(particle.x), Math.round(particle.y), particle.size, particle.size);
    ctx.restore();
  }

  scanlines(frame) {
    const { ctx } = this;
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = "#ecfbff";
    for (let y = frame % 4; y < VIEW.height; y += 4) ctx.fillRect(0, y, VIEW.width, 1);
    ctx.globalAlpha = 0.14;
    ctx.fillStyle = "rgba(255,61,242,.25)";
    ctx.fillRect(0, 0, VIEW.width, 2);
    ctx.restore();
  }

  overlay(game) {
    if (game.state === "playing" || game.state === "transition") return;
    const { ctx } = this;
    let text = game.state === "won" ? "GG" : "Vacilou";
    if (game.state === "lost" && game.levelIndex === 2) text = "se fudeu doidin";
    const wobble = Math.sin(game.frame * 0.12) * 6;
    ctx.fillStyle = "rgba(5,7,17,.58)";
    ctx.fillRect(0, 0, VIEW.width, VIEW.height);
    ctx.textAlign = "center";
    ctx.font = "900 86px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    ctx.shadowBlur = 32;
    ctx.shadowColor = game.state === "won" ? "#4df8ff" : "#ff3df2";
    ctx.fillStyle = game.state === "won" ? "#ecfbff" : "#ffd1ff";
    ctx.fillText(text, VIEW.width / 2 + wobble, VIEW.height / 2 - 8);
    ctx.globalAlpha = 0.45;
    ctx.fillStyle = "#ff3df2";
    ctx.fillText(text, VIEW.width / 2 - wobble * 0.7, VIEW.height / 2 - 8);
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }
}


// src/game.js

class Game {
  constructor() {
    this.canvas = document.querySelector("#game");
    this.shell = document.querySelector(".game-shell");
    this.renderer = new Renderer(this.canvas);
    this.audio = new AudioSystem();
    this.input = new Input(this.audio, this.shell);
    this.player = new Player();
    this.camera = { x: 0 };
    this.frame = 0;
    this.last = 0;
    this.levelIndex = 0;
    this.state = "playing";
    this.score = 0;
    this.shake = 0;
    this.projectiles = [];
    this.kunais = [];
    this.enemyBullets = [];
    this.particles = [];
    this.blasts = [];
    this.slashes = [];
    this.hud = {
      health: document.querySelector("#healthMeter"),
      energy: document.querySelector("#energyMeter"),
      stage: document.querySelector("#stageName"),
      score: document.querySelector("#score"),
    };
    this.loadLevel(0);
    this.bindWindow();
    this.tryAutoFullscreen();
    requestAnimationFrame((time) => this.loop(time));
  }

  bindWindow() {
    window.addEventListener("blur", () => this.input.clearAll());
    window.addEventListener("contextmenu", () => this.input.clearAll());
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) this.input.clearAll();
    });
  }

  tryAutoFullscreen() {
    if (!this.shell.requestFullscreen || document.fullscreenElement) return;
    this.shell.requestFullscreen({ navigationUI: "hide" }).catch(() => {});
  }

  loadLevel(index) {
    this.levelIndex = index;
    this.level = LEVELS[index];
    this.state = "playing";
    this.camera.x = 0;
    this.projectiles = [];
    this.kunais = [];
    this.enemyBullets = [];
    this.particles = [];
    this.blasts = [];
    this.slashes = [];
    this.pickups = this.level.pickups.map(([x, y]) => ({ x, y, w: 28, h: 28, taken: false }));
    this.enemies = this.level.enemies.map((enemy) => enemy.type === "boss" ? new Boss(enemy) : new Enemy(enemy));
    this.player.reset(this.level.spawn);
    this.input.clearAll();
    this.stageFlash = 40;
    
    if (this.level.shortName === "BOSS") {
      this.audio.playBossMusic();
      this.player.maxHp = 8;
      this.player.hp = 8;
      this.player.energy = 100;
      this.player.damageMultiplier = 1.5;
    } else {
      this.audio.playBgMusic();
      this.player.maxHp = 5;
      this.player.hp = 5;
      this.player.damageMultiplier = 1;
    }
  }

  restart() {
    this.score = 0;
    this.frame = 0;
    this.loadLevel(0);
    this.audio.unlock();
  }

  loop(time) {
    try {
      const dt = Math.min(2, (time - (this.last || time)) / 16.67 || 1);
      this.last = time;
      this.frame += dt;
      this.update(dt);
      this.renderer.render(this);
    } catch (e) {
      console.error("Game loop error:", e);
    }
    requestAnimationFrame((next) => this.loop(next));
  }

  update(dt) {
    if (this.input.consume("restart") && this.state !== "cinematic") this.restart();

    if (this.state === "playing") {
      this.player.update(this, dt);
      this.enemies.forEach((enemy) => enemy.update(this, dt));
      this.projectiles.forEach((projectile) => projectile.update(this, dt));
      this.kunais.forEach((kunai) => kunai.update(this, dt));
      this.enemyBullets.forEach((eb) => eb.update(this, dt));
      this.updatePickups();
      this.updateGate();
      this.updateCamera(dt);
    }

    if (this.state !== "cinematic") {
      this.updateEffects(dt);
      this.updateHud();
    }
    this.input.clearFrame();
  }

  updateCamera(dt) {
    const target = this.player.x - VIEW.width * 0.42;
    this.camera.x += (target - this.camera.x) * 0.11 * dt;
    this.camera.x = Math.max(0, Math.min(this.level.width - VIEW.width, this.camera.x));
  }

  updatePickups() {
    for (const pickup of this.pickups) {
      if (pickup.taken || !rectsOverlap(this.player, pickup)) continue;
      pickup.taken = true;
      this.score += 25;
      this.player.energy = Math.min(100, this.player.energy + 14);
      this.burst(pickup.x, pickup.y, "#4df8ff", 18, 0);
      this.audio.pickup();
    }
  }

  updateGate() {
    if (!rectsOverlap(this.player, this.level.gate)) return;
    if (this.levelIndex < LEVELS.length - 1) {
      this.score += 150;
      this.loadLevel(this.levelIndex + 1);
      this.audio.tone(580, 0.18, "triangle", 0.26, 360);
      return;
    }
    this.win();
  }

  updateEffects(dt) {
    this.shake = Math.max(0, this.shake - 0.6 * dt);
    this.stageFlash = Math.max(0, (this.stageFlash || 0) - dt);
    this.projectiles = this.projectiles.filter((projectile) => projectile.life > 0 && projectile.x > this.camera.x - 120 && projectile.x < this.camera.x + VIEW.width + 160);
    this.kunais = this.kunais.filter((kunai) => kunai.life > 0 && kunai.x > this.camera.x - 120 && kunai.x < this.camera.x + VIEW.width + 160);
    this.enemyBullets = this.enemyBullets.filter((eb) => eb.life > 0 && eb.x > this.camera.x - 120 && eb.x < this.camera.x + VIEW.width + 160);
    this.particles = this.particles.filter((particle) => {
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vy += 0.02 * dt;
      particle.life -= dt;
      return particle.life > 0;
    });
    this.blasts = this.blasts.filter((blast) => {
      blast.radius += (blast.max - blast.radius) * 0.22 * dt;
      blast.life -= dt;
      return blast.life > 0;
    });
    this.slashes = this.slashes.filter((slash) => {
      slash.life -= dt;
      return slash.life > 0;
    });
  }

  updateHud() {
    this.hud.health.style.width = `${Math.max(0, this.player.hp / this.player.maxHp) * 100}%`;
    this.hud.energy.style.width = `${Math.max(0, this.player.energy)}%`;
    this.hud.stage.textContent = this.level.shortName;
    this.hud.score.textContent = String(this.score);
  }

  damageEnemy(enemy, amount, direction = 1) {
    enemy.hp -= amount;
    enemy.hit = 12;
    if (enemy.type !== "boss") enemy.x += direction * 7;
    this.burst(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2, "#ff3df2", 14, direction);
    this.audio.hit();
    if (enemy.hp <= 0 && enemy.alive) {
      enemy.alive = false;
      this.score += enemy.type === "boss" ? 500 : (enemy.type === "turret" ? 100 : 60);
      this.radial(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2, 42);
    }
  }

  win() {
    if (this.state !== "playing") return;
    this.state = "won";
    this.score += 500;
    this.shake = 8;
    this.audio.win();
  }

  playEndingSequence() {
    if (this.state === "cinematic") return;
    this.state = "cinematic";
    
    // Interrompe imediatamente qualquer controle
    this.input.clearAll();
    
    // Parar a música da boss fight imediatamente para o silêncio dramático
    this.audio.stopAllMusic();

    // Ocultar a interface do jogo (HUD, canvas, controles)
    document.querySelector(".game-shell").style.display = "none";
    
    // Exibir e tocar o vídeo final
    const endingScreen = document.getElementById("endingScreen");
    const finalVideo = document.getElementById("finalVideo");
    const creditsScreen = document.getElementById("creditsScreen");
    
    endingScreen.style.display = "block";
    finalVideo.play().catch(e => console.error("Erro ao tocar vídeo final:", e));

    finalVideo.addEventListener("ended", () => {
      // Transição suave para a tela preta com a mensagem
      creditsScreen.style.opacity = "1";
      this.audio.playEndingTheme();
    });
  }

  lose() {
    if (this.state !== "playing") return;
    this.state = "lost";
    this.shake = 12;
    this.audio.lose();
  }

  burst(x, y, color, amount, push = 0) {
    for (let i = 0; i < amount; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.8 + Math.random() * 3.2;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed + push * (0.8 + Math.random()),
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 4,
        color,
        life: 18 + Math.random() * 24,
        maxLife: 42,
      });
    }
  }

  trail(x, y, facing) {
    this.particles.push({
      x: x - facing * 20 + Math.random() * 8 - 4,
      y: y + Math.random() * 42 - 21,
      vx: -facing * (1.5 + Math.random() * 2),
      vy: Math.random() * 1.4 - 0.7,
      size: 4 + Math.random() * 9,
      color: Math.random() > 0.5 ? "#4df8ff" : "#ff3df2",
      life: 14 + Math.random() * 12,
      maxLife: 26,
    });
  }

  radial(x, y, radius = 92) {
    for (let i = 0; i < 54; i += 1) {
      const angle = (i / 54) * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: radius > 60 ? 3 + Math.random() * 5 : 2 + Math.random() * 3,
        color: i % 2 ? "#4df8ff" : "#ff3df2",
        life: 24 + Math.random() * 20,
        maxLife: 44,
      });
    }
  }
}


// ─── NEON RIFT — CINEMATIC TUTORIAL SEQUENCE ────────────────────────────────
// Ultra-premium AAA-quality control presentation (15 seconds)
// Inspired by: UE5 trailers, PlayStation Studios, Apple keynotes

class NeonRiftTutorial {
  constructor(onComplete) {
    this.onComplete = onComplete;
    this.startTime = null;
    this.DURATION = 15000;
    this.controls = [
      { action: "Mover esquerda",       keyboard: "← / A",        touch: "Btn Esq.",     icon: "←", color: "#4df8ff", glow: "rgba(77,248,255,0.6)" },
      { action: "Mover direita",        keyboard: "→ / D",        touch: "Btn Dir.",     icon: "→", color: "#4df8ff", glow: "rgba(77,248,255,0.6)" },
      { action: "Pular",                keyboard: "↑ / W / Space",touch: "Btn Jump",     icon: "↑", color: "#8d5cff", glow: "rgba(141,92,255,0.6)" },
      { action: "Ataque corpo a corpo", keyboard: "F",             touch: "Btn Atk",      icon: "⌁", color: "#ff3df2", glow: "rgba(255,61,242,0.6)" },
      { action: "Tiro",                 keyboard: "J / X / Ctrl", touch: "Btn Shot",     icon: "•", color: "#4df8ff", glow: "rgba(77,248,255,0.6)" },
      { action: "Dash energético",      keyboard: "K / Shift",    touch: "Btn Dash",     icon: "⇢", color: "#ff9d00", glow: "rgba(255,157,0,0.6)" },
      { action: "Power Blast",          keyboard: "L / E",        touch: "Btn Pwr",      icon: "✦", color: "#ff3df2", glow: "rgba(255,61,242,0.6)" },
      { action: "Reiniciar",            keyboard: "R",            touch: "Btn Restart",  icon: "↻", color: "#aaaaff", glow: "rgba(170,170,255,0.6)" },
    ];
    this.audioCtx = null;
    this.particles = [];
    this.animFrame = null;
    this._transitioning = false;
    this._build();
    this._initAudio();
    this._spawnParticles();
  }

  _build() {
    this.root = document.createElement("div");
    this.root.id = "nrTutorial";
    Object.assign(this.root.style, {
      position: "fixed", inset: "0", zIndex: "200",
      background: "transparent", opacity: "0",
      transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1)",
      overflow: "hidden",
      fontFamily: "'Orbitron','Rajdhani',ui-monospace,monospace",
    });

    // Canvas for particle system
    this.bgCanvas = document.createElement("canvas");
    Object.assign(this.bgCanvas.style, { position: "absolute", inset: "0", width: "100%", height: "100%" });
    this.root.appendChild(this.bgCanvas);

    // Deep cinematic background
    const bgLayer = document.createElement("div");
    Object.assign(bgLayer.style, {
      position: "absolute", inset: "0",
      background: "radial-gradient(ellipse 120% 80% at 50% 110%, #0d0020 0%, #000510 40%, #000000 100%)",
    });
    this.root.appendChild(bgLayer);

    // Volumetric light shafts
    [
      { left: "20%", skew: "-18deg", color: "rgba(77,248,255,0.04)" },
      { left: "50%", skew:   "0deg", color: "rgba(141,92,255,0.05)" },
      { left: "80%", skew:  "14deg", color: "rgba(255,61,242,0.04)" },
    ].forEach(({ left, skew, color }) => {
      const s = document.createElement("div");
      Object.assign(s.style, {
        position: "absolute", bottom: "0", left,
        width: "clamp(120px,18vw,260px)", height: "100%",
        background: `linear-gradient(0deg,${color} 0%,transparent 70%)`,
        transform: `translateX(-50%) skewX(${skew})`,
        transformOrigin: "bottom center", pointerEvents: "none",
        animation: "nrShaftPulse 6s ease-in-out infinite alternate",
      });
      this.root.appendChild(s);
    });

    // CRT scanline texture
    const scanTex = document.createElement("div");
    Object.assign(scanTex.style, {
      position: "absolute", inset: "0", pointerEvents: "none",
      backgroundImage: "repeating-linear-gradient(0deg,rgba(0,0,0,0.06) 0px,rgba(0,0,0,0.06) 1px,transparent 1px,transparent 3px)",
    });
    this.root.appendChild(scanTex);

    // Moving scan-line
    this.scanLine = document.createElement("div");
    Object.assign(this.scanLine.style, {
      position: "absolute", left: "0", right: "0", top: "0", height: "2px",
      background: "linear-gradient(90deg,transparent,rgba(77,248,255,0.15),rgba(77,248,255,0.4),rgba(77,248,255,0.15),transparent)",
      filter: "blur(1px)", pointerEvents: "none",
    });
    this.root.appendChild(this.scanLine);

    // HUD corner brackets
    [
      { top: "16px",    left: "16px",  borderTop: "2px solid",    borderLeft:  "2px solid" },
      { top: "16px",    right: "16px", borderTop: "2px solid",    borderRight: "2px solid" },
      { bottom: "16px", left: "16px",  borderBottom: "2px solid", borderLeft:  "2px solid" },
      { bottom: "16px", right: "16px", borderBottom: "2px solid", borderRight: "2px solid" },
    ].forEach((st) => {
      const c = document.createElement("div");
      Object.assign(c.style, { position: "absolute", width: "32px", height: "32px", borderColor: "rgba(77,248,255,0.5)", pointerEvents: "none", ...st });
      this.root.appendChild(c);
    });

    // Vertical side lines
    ["left", "right"].forEach((side) => {
      const l = document.createElement("div");
      Object.assign(l.style, {
        position: "absolute", top: "50%", [side]: "16px",
        transform: "translateY(-50%)", width: "1px",
        height: "clamp(60px,12vh,120px)",
        background: "linear-gradient(180deg,transparent,rgba(77,248,255,0.4),transparent)",
        pointerEvents: "none",
      });
      this.root.appendChild(l);
    });

    // Top label
    const topLabel = document.createElement("div");
    Object.assign(topLabel.style, {
      position: "absolute", top: "clamp(24px,5%,52px)",
      left: "50%", transform: "translateX(-50%)",
      textAlign: "center", letterSpacing: "0.28em",
      fontSize: "clamp(10px,1.2vw,14px)",
      color: "rgba(77,248,255,0.6)", textTransform: "uppercase", whiteSpace: "nowrap",
    });
    topLabel.textContent = "NEON RIFT  //  CONTROLES";
    this.root.appendChild(topLabel);

    // Controls grid
    this.controlsWrap = document.createElement("div");
    Object.assign(this.controlsWrap.style, {
      position: "absolute", top: "50%", left: "50%",
      transform: "translate(-50%, -50%)",
      display: "grid", gridTemplateColumns: "1fr 1fr",
      gap: "14px 48px", padding: "0 40px",
      width: "min(900px, 90vw)",
    });
    this.root.appendChild(this.controlsWrap);
    this.controlCards = this.controls.map((ctrl) => this._buildCard(ctrl));

    // Progress bar
    const track = document.createElement("div");
    Object.assign(track.style, {
      position: "absolute", bottom: "clamp(20px,4vh,36px)",
      left: "50%", transform: "translateX(-50%)",
      width: "clamp(200px,40vw,480px)", height: "2px",
      background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden",
    });
    this.progressFill = document.createElement("div");
    Object.assign(this.progressFill.style, {
      height: "100%", width: "0%",
      background: "linear-gradient(90deg,#4df8ff,#8d5cff,#ff3df2)",
      boxShadow: "0 0 8px rgba(77,248,255,0.8)",
      transition: "width 0.1s linear", borderRadius: "2px",
    });
    track.appendChild(this.progressFill);
    this.root.appendChild(track);

    // Skip hint
    const skipHint = document.createElement("div");
    Object.assign(skipHint.style, {
      position: "absolute", bottom: "clamp(12px,2.5vh,24px)",
      right: "clamp(16px,2vw,32px)",
      fontSize: "clamp(8px,0.9vw,11px)", color: "rgba(255,255,255,0.2)",
      letterSpacing: "0.15em", textTransform: "uppercase",
    });
    skipHint.textContent = "ESC para pular";
    this.root.appendChild(skipHint);

    // Cinematic phrase (shown in outro)
    this.phrase = document.createElement("div");
    Object.assign(this.phrase.style, {
      position: "absolute", inset: "0",
      display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
      opacity: "0", transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1)",
      pointerEvents: "none", zIndex: "10",
    });
    this.phrase.innerHTML = `
      <div id="nrPhraseSubtitle" style="
        letter-spacing:0.4em;font-size:clamp(9px,1vw,13px);
        color:rgba(77,248,255,0.5);text-transform:uppercase;
        margin-bottom:18px;opacity:0;transform:translateY(12px);
        transition:all 1s ease 0.3s;">PREPARE-SE PARA ENTRAR EM</div>
      <div id="nrPhraseMain" style="
        font-size:clamp(28px,4.5vw,68px);font-weight:900;
        letter-spacing:0.12em;text-transform:uppercase;
        background:linear-gradient(135deg,#ffffff 0%,#4df8ff 40%,#ff3df2 80%,#ffffff 100%);
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        filter:drop-shadow(0 0 32px rgba(77,248,255,0.6)) drop-shadow(0 0 64px rgba(255,61,242,0.4));
        opacity:0;transform:scale(0.84) translateY(20px);
        transition:all 1.1s cubic-bezier(0.16,1,0.3,1) 0.5s;
        text-align:center;">NEON RIFT</div>
    `;
    this.root.appendChild(this.phrase);
    document.body.appendChild(this.root);
  }

  _buildCard(ctrl) {
    const card = document.createElement("div");
    Object.assign(card.style, {
      display: "flex", alignItems: "center", gap: "14px",
      background: "rgba(5,7,17,0.72)",
      border: `1px solid ${ctrl.color}22`,
      borderRadius: "8px", padding: "12px 16px",
      backdropFilter: "blur(12px)",
      boxShadow: `0 0 24px ${ctrl.glow.replace("0.6","0.08")},inset 0 0 20px rgba(0,0,0,0.4)`,
      opacity: "0", transform: "translateX(-28px) scale(0.95)",
      transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1),transform 0.55s cubic-bezier(0.16,1,0.3,1),box-shadow 0.3s ease",
      position: "relative", overflow: "hidden",
    });

    // Shimmer overlay
    const shimmer = document.createElement("div");
    Object.assign(shimmer.style, {
      position: "absolute", inset: "0",
      background: `linear-gradient(105deg,transparent 30%,${ctrl.color}08 50%,transparent 70%)`,
      transform: "translateX(-100%)", transition: "transform 0s",
    });
    card.appendChild(shimmer);

    // Icon badge
    const badge = document.createElement("div");
    Object.assign(badge.style, {
      width: "42px", height: "42px", minWidth: "42px",
      borderRadius: "8px", border: `1px solid ${ctrl.color}44`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "22px", color: ctrl.color, textShadow: `0 0 12px ${ctrl.color}`,
      background: `radial-gradient(circle,${ctrl.color}18 0%,transparent 70%)`,
      boxShadow: `0 0 16px ${ctrl.glow.replace("0.6","0.2")},inset 0 0 10px ${ctrl.color}10`,
      flexShrink: "0",
    });
    badge.textContent = ctrl.icon;
    card.appendChild(badge);

    // Text area
    const textBlock = document.createElement("div");
    Object.assign(textBlock.style, { flex: "1", minWidth: "0" });

    const actionName = document.createElement("div");
    Object.assign(actionName.style, {
      fontSize: "clamp(9px,1.1vw,13px)", fontWeight: "700",
      letterSpacing: "0.12em", textTransform: "uppercase",
      color: "rgba(255,255,255,0.9)", marginBottom: "5px",
      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
    });
    actionName.textContent = ctrl.action;
    textBlock.appendChild(actionName);

    const keysRow = document.createElement("div");
    Object.assign(keysRow.style, { display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" });

    const mk = (text, style) => {
      const el = document.createElement("span");
      Object.assign(el.style, style);
      el.textContent = text;
      return el;
    };
    keysRow.appendChild(mk("KB:", { fontSize: "clamp(7px,0.8vw,10px)", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }));
    keysRow.appendChild(mk(ctrl.keyboard, { fontSize: "clamp(9px,1vw,12px)", color: ctrl.color, fontWeight: "600", letterSpacing: "0.06em", textShadow: `0 0 8px ${ctrl.color}` }));
    const divider = document.createElement("span");
    Object.assign(divider.style, { width: "1px", height: "12px", background: "rgba(255,255,255,0.12)", flexShrink: "0" });
    keysRow.appendChild(divider);
    keysRow.appendChild(mk("Touch:", { fontSize: "clamp(7px,0.8vw,10px)", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }));
    keysRow.appendChild(mk(ctrl.touch, { fontSize: "clamp(9px,1vw,12px)", color: "rgba(255,255,255,0.5)", fontWeight: "500", letterSpacing: "0.04em" }));

    textBlock.appendChild(keysRow);
    card.appendChild(textBlock);
    this.controlsWrap.appendChild(card);
    return { el: card, shimmer, ctrl };
  }

  _initAudio() {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.audioCtx = new AC();
    } catch (e) {}
  }

  _tone(freq, dur, type, vol, bend) {
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc  = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const mst  = this.audioCtx.createGain();
      mst.gain.value = vol;
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      if (bend) osc.frequency.linearRampToValueAtTime(freq + bend, now + dur);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(1, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
      osc.connect(gain); gain.connect(mst); mst.connect(this.audioCtx.destination);
      osc.start(now); osc.stop(now + dur + 0.02);
    } catch (e) {}
  }

  _playCardReveal(i) {
    const freqs = [660, 720, 780, 840, 900, 780, 720, 660];
    const f = freqs[i % freqs.length];
    this._tone(f, 0.14, "triangle", 0.14, 120);
    setTimeout(() => this._tone(f * 0.5, 0.08, "sine", 0.06, -40), 50);
  }

  _playPhraseReveal() {
    this._tone(220, 0.6, "sine", 0.2, 880);
    setTimeout(() => this._tone(440, 0.4, "triangle", 0.15, 440), 200);
    setTimeout(() => this._tone(880, 0.8, "sine", 0.18, 220), 500);
  }

  _playOutroSweep() {
    this._tone(55,  2.0, "sawtooth", 0.08, 400);
    setTimeout(() => this._tone(110, 1.5, "sine",     0.06, 880), 400);
    setTimeout(() => this._tone(440, 1.0, "triangle", 0.1,  660), 1000);
  }

  _spawnParticles() {
    for (let i = 0; i < 60; i++) {
      this.particles.push({
        x: Math.random(), y: Math.random(),
        vx: (Math.random() - 0.5) * 0.00012,
        vy: -0.00006 - Math.random() * 0.00012,
        size: 0.5 + Math.random() * 2.5,
        alpha: 0.1 + Math.random() * 0.5,
        color: Math.random() > 0.6 ? "77,248,255" : Math.random() > 0.5 ? "141,92,255" : "255,61,242",
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.4 + Math.random() * 1.2,
      });
    }
  }

  _drawParticles(ctx, w, h) {
    ctx.clearRect(0, 0, w, h);
    const t = performance.now() / 1000;
    for (const p of this.particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
      if (p.x < -0.02) p.x = 1.02;
      if (p.x > 1.02)  p.x = -0.02;
      const a = p.alpha * (0.6 + 0.4 * Math.sin(t * p.pulseSpeed + p.pulse));
      ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${a})`; ctx.fill();
      const g = ctx.createRadialGradient(p.x * w, p.y * h, 0, p.x * w, p.y * h, p.size * 3.5);
      g.addColorStop(0, `rgba(${p.color},${a * 0.3})`);
      g.addColorStop(1, `rgba(${p.color},0)`);
      ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.size * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
    }
  }

  start() {
    // Inject CSS keyframes
    if (!document.getElementById("nrTutorialStyles")) {
      const style = document.createElement("style");
      style.id = "nrTutorialStyles";
      style.textContent = `
        @keyframes nrShaftPulse {
          0%   { opacity:0.5; transform:translateX(-50%) skewX(-18deg) scaleY(0.92); }
          100% { opacity:1;   transform:translateX(-50%) skewX(-18deg) scaleY(1.05); }
        }`;
      document.head.appendChild(style);
    }

    // Resize canvas helper
    const resize = () => {
      this.bgCanvas.width  = window.innerWidth;
      this.bgCanvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Fade in
    requestAnimationFrame(() => { this.root.style.opacity = "1"; });

    this.startTime = performance.now();
    const ctx2d = this.bgCanvas.getContext("2d");

    // Schedule card reveals
    const revealDelay    = 1100;
    const revealInterval = 900;
    this.controlCards.forEach(({ el, shimmer, ctrl }, i) => {
      setTimeout(() => {
        el.style.opacity   = "1";
        el.style.transform = "translateX(0) scale(1)";
        el.style.boxShadow = `0 0 32px ${ctrl.glow.replace("0.6","0.15")},inset 0 0 20px rgba(0,0,0,0.4),0 0 0 1px ${ctrl.color}33`;
        this._playCardReveal(i);
        setTimeout(() => { shimmer.style.transition = "transform 0.6s ease"; shimmer.style.transform = "translateX(200%)"; }, 80);
      }, revealDelay + i * revealInterval);
    });

    // Outro at 10.8s, game transition at 14.8s
    setTimeout(() => this._beginOutro(),         10800);
    setTimeout(() => this._transitionToGame(),   14800);

    // ESC skip
    this._escListener = (e) => { if (e.key === "Escape") this._transitionToGame(); };
    window.addEventListener("keydown", this._escListener);

    // Render loop
    let last = performance.now();
    const loop = (now) => {
      if (now - this.startTime >= this.DURATION + 1200) return;
      this._drawParticles(ctx2d, this.bgCanvas.width, this.bgCanvas.height);
      const elapsed = now - this.startTime;
      this.scanLine.style.top = `${(elapsed * 0.06) % 110}%`;
      this.progressFill.style.width = `${Math.min(100, (elapsed / this.DURATION) * 100)}%`;
      this.animFrame = requestAnimationFrame(loop);
    };
    this.animFrame = requestAnimationFrame(loop);
  }

  _beginOutro() {
    this._playOutroSweep();
    this.controlCards.forEach(({ el }, i) => {
      setTimeout(() => { el.style.opacity = "0"; el.style.transform = "translateX(28px) scale(0.95)"; }, i * 120);
    });
    setTimeout(() => {
      this.phrase.style.opacity = "1";
      this._playPhraseReveal();
      requestAnimationFrame(() => {
        const sub  = document.getElementById("nrPhraseSubtitle");
        const main = document.getElementById("nrPhraseMain");
        if (sub)  { sub.style.opacity  = "1"; sub.style.transform  = "translateY(0)"; }
        if (main) { main.style.opacity = "1"; main.style.transform = "scale(1) translateY(0)"; }
      });
    }, 1200);
  }

  _transitionToGame() {
    if (this._transitioning) return;
    this._transitioning = true;
    window.removeEventListener("keydown", this._escListener);
    cancelAnimationFrame(this.animFrame);
    this.root.style.transition = "opacity 0.8s cubic-bezier(0.4,0,1,1)";
    this.root.style.opacity = "0";
    setTimeout(() => { this.root.remove(); if (this.onComplete) this.onComplete(); }, 900);
  }
}

// ─────────────────────────────────────────────────────────────────────────────

const introScreen = document.getElementById("introScreen");

const startIntroBtn = document.getElementById("startIntroBtn");
const introVideo = document.getElementById("introVideo");

if (introScreen && startIntroBtn && introVideo) {
  startIntroBtn.addEventListener("click", () => {
    startIntroBtn.style.display = "none";
    introVideo.style.display = "block";
    introVideo.play().catch(e => console.log(e));
  });

  introVideo.addEventListener("ended", () => {
    // Smooth fade-out of intro screen
    introScreen.style.transition = "opacity 1s ease";
    introScreen.style.opacity = "0";

    setTimeout(() => {
      introScreen.style.display = "none";

      // Launch cinematic tutorial — calls new Game() when done
      const tutorial = new NeonRiftTutorial(() => {
        new Game();
      });
      tutorial.start();
    }, 1050);
  });
} else {
  new Game();
}


})();
