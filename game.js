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
      { x: 610, y: 450, min: 520, max: 690, vx: -1.1, type: "crawler", hp: 2 },
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
      { x: 590, y: 450, min: 440, max: 720, vx: -1.4, type: "crawler", hp: 3 },
      { x: 1030, y: 410, min: 820, max: 1130, vx: -1.8, type: "drone", hp: 3 },
      { x: 1810, y: 450, min: 1300, max: 1840, vx: -1.55, type: "turret", hp: 4 },
      { x: 2350, y: 420, min: 2020, max: 2520, vx: -1.9, type: "drone", hp: 3 },
      { x: 3160, y: 450, min: 2760, max: 3540, vx: -1.7, type: "crawler", hp: 4 },
    ],
    gate: { x: 3670, y: 284, w: 52, h: 204 },
  },
];


// src/audio.js
class AudioSystem {
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
  }

  get anim() {
    if (this.deadTime > 0) return "death";
    if (this.hurtTime > 0) return "hurt";
    if (this.dashTime > 0 || this.blastCooldown > 74) return "power";
    if (this.attackTime > 0) return "attack";
    if (this.shootTime > 0) return "shoot";
    if (!this.grounded) return "jump";
    if (Math.abs(this.vx) > 0.5) return "run";
    return "idle";
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

    if (input.held("left")) {
      this.vx -= 0.72 * dt;
      this.facing = -1;
    }
    if (input.held("right")) {
      this.vx += 0.72 * dt;
      this.facing = 1;
    }
    if (input.consume("jump") && this.grounded) {
      this.vy = -14.6;
      this.grounded = false;
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
    for (const enemy of game.enemies) {
      if (enemy.alive && rectsOverlap(hitbox, enemy)) game.damageEnemy(enemy, 2, this.facing);
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
    this.invulnerable = Math.max(this.invulnerable, 18);
    game.shake = Math.max(game.shake, 5);
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
      if (enemy.alive && Math.hypot(dx, dy) < 170) game.damageEnemy(enemy, 4, Math.sign(dx) || this.facing);
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
    this.w = this.type === "drone" ? 42 : 38;
    this.h = this.type === "drone" ? 32 : 38;
    this.alive = true;
    this.phase = Math.random() * 99;
    this.baseY = this.y;
    this.hit = 0;
  }

  update(game, dt) {
    if (!this.alive) return;
    this.x += this.vx * dt;
    if (this.x < this.min || this.x + this.w > this.max) this.vx *= -1;
    if (this.type === "drone") this.y = this.baseY + Math.sin((game.frame + this.phase) * 0.05) * 10;
    this.hit = Math.max(0, this.hit - dt);
    if (rectsOverlap(game.player, this)) {
      const stomp = game.player.vy > 0 && game.player.y + game.player.h - this.y < 16;
      if (stomp) {
        game.damageEnemy(this, 2, Math.sign(game.player.vx) || game.player.facing);
        game.player.vy = -9;
      } else {
        game.player.takeDamage(game, 1);
      }
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
    this.sprite = new Image();
    this.sprite.src = SPRITE_SRC;
    this.cleaned = null;
    this.ready = false;
    this.sprite.addEventListener("load", () => this.prepareSprite());
  }

  prepareSprite() {
    const buffer = document.createElement("canvas");
    buffer.width = this.sprite.width;
    buffer.height = this.sprite.height;
    const bctx = buffer.getContext("2d");
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
    ctx.save();
    ctx.clearRect(0, 0, VIEW.width, VIEW.height);
    const shakeX = (Math.random() - 0.5) * game.shake;
    const shakeY = (Math.random() - 0.5) * game.shake;
    ctx.translate(shakeX, shakeY);

    this.background(game);
    ctx.save();
    ctx.translate(-Math.round(game.camera.x), 0);
    this.level(game);
    game.pickups.forEach((pickup) => this.pickup(pickup, game.frame));
    game.enemies.forEach((enemy) => this.enemy(enemy, game.frame));
    game.projectiles.forEach((projectile) => this.projectile(projectile, game.frame));
    game.slashes.forEach((slash) => this.slash(slash));
    game.blasts.forEach((blast) => this.blast(blast));
    this.player(game.player, game.frame);
    game.particles.forEach((particle) => this.particle(particle));
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

    if (game.levelIndex === 0) this.city(game);
    else this.lab(game);
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
    game.level.platforms.forEach((platform) => this.platform(platform, game.frame));
    this.gate(game.level.gate, game.frame);
  }

  platform(platform, frame) {
    const { ctx } = this;
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
    ctx.translate(pickup.x, y);
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
    if (!enemy.alive) return;
    const { ctx } = this;
    ctx.save();
    ctx.translate(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2);
    ctx.shadowBlur = enemy.hit > 0 ? 28 : 16;
    ctx.shadowColor = enemy.hit > 0 ? "#ff3df2" : "#4df8ff";
    ctx.strokeStyle = enemy.type === "turret" ? "#ff3df2" : "#4df8ff";
    ctx.fillStyle = enemy.type === "drone" ? "#101b35" : "#151225";
    if (enemy.type === "drone") {
      ctx.beginPath();
      ctx.ellipse(0, 0, enemy.w / 2, enemy.h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#ff3df2";
      ctx.fillRect(-6, -3, 12, 6);
    } else {
      ctx.fillRect(-enemy.w / 2, -enemy.h / 2, enemy.w, enemy.h);
      ctx.strokeRect(-enemy.w / 2, -enemy.h / 2, enemy.w, enemy.h);
      ctx.fillStyle = "#4df8ff";
      ctx.fillRect(-12, -4, 24, 8);
      ctx.fillStyle = "#ff3df2";
      ctx.fillRect(Math.sin(frame * 0.1) * 9 - 3, -10, 6, 20);
    }
    ctx.restore();
  }

  player(player, frameNo) {
    const { ctx } = this;
    const blink = player.invulnerable > 0 && Math.floor(frameNo / 5) % 2 === 0 && player.hurtTime > 0;
    if (blink) return;
    const anim = SPRITE_ANIMS[player.anim] || SPRITE_ANIMS.idle;
    const index = anim.loop
      ? Math.floor(player.animTime / anim.speed) % anim.frames.length
      : Math.min(anim.frames.length - 1, Math.floor(player.animTime / anim.speed));
    const frame = anim.frames[index];
    const scale = 2.25;
    const drawW = frame.w * scale;
    const drawH = frame.h * scale;
    ctx.save();
    ctx.translate(player.x + player.w / 2, player.y + player.h + 7);
    ctx.scale(player.facing, 1);
    ctx.shadowBlur = player.dashTime > 0 ? 24 : 10;
    ctx.shadowColor = player.dashTime > 0 ? "#4df8ff" : "rgba(255,61,242,.6)";
    if (this.ready) {
      ctx.drawImage(this.cleaned, frame.x, frame.y, frame.w, frame.h, -drawW / 2, -drawH, drawW, drawH);
    } else {
      ctx.fillStyle = "#4df8ff";
      ctx.fillRect(-player.w / 2, -player.h, player.w, player.h);
    }
    ctx.restore();
  }

  projectile(projectile, frameNo) {
    const { ctx } = this;
    const anim = SPRITE_ANIMS.projectile;
    const frame = anim.frames[Math.floor(frameNo / anim.speed) % anim.frames.length];
    ctx.save();
    ctx.translate(projectile.x, projectile.y);
    ctx.scale(projectile.facing, 1);
    ctx.shadowBlur = 18;
    ctx.shadowColor = "#4df8ff";
    if (this.ready) ctx.drawImage(this.cleaned, frame.x, frame.y, frame.w, frame.h, -16, -15, 52, 28);
    ctx.fillStyle = "rgba(77,248,255,.7)";
    ctx.fillRect(-14, -2, 38, 4);
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
    ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
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
    const text = game.state === "won" ? "GG" : "Vacilou";
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
    window.addEventListener("blur", () => this.input.down.clear());
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
    this.particles = [];
    this.blasts = [];
    this.slashes = [];
    this.pickups = this.level.pickups.map(([x, y]) => ({ x, y, w: 28, h: 28, taken: false }));
    this.enemies = this.level.enemies.map((enemy) => new Enemy(enemy));
    this.player.reset(this.level.spawn);
    this.stageFlash = 40;
  }

  restart() {
    this.score = 0;
    this.loadLevel(0);
    this.audio.unlock();
  }

  loop(time) {
    const dt = Math.min(2, (time - (this.last || time)) / 16.67 || 1);
    this.last = time;
    this.frame += dt;
    this.update(dt);
    this.renderer.render(this);
    requestAnimationFrame((next) => this.loop(next));
  }

  update(dt) {
    if (this.input.consume("restart")) this.restart();

    if (this.state === "playing") {
      this.player.update(this, dt);
      this.enemies.forEach((enemy) => enemy.update(this, dt));
      this.projectiles.forEach((projectile) => projectile.update(this, dt));
      this.updatePickups();
      this.updateGate();
      this.updateCamera(dt);
    }

    this.updateEffects(dt);
    this.updateHud();
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
    enemy.x += direction * 7;
    this.burst(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2, "#ff3df2", 14, direction);
    this.audio.hit();
    if (enemy.hp <= 0) {
      enemy.alive = false;
      this.score += enemy.type === "turret" ? 100 : 60;
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

new Game();


})();
