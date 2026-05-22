import { AudioSystem } from "./audio.js";
import { LEVELS, VIEW } from "./config.js";
import { Enemy, Player, rectsOverlap } from "./entities.js";
import { Input } from "./input.js";
import { Renderer } from "./renderer.js";

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
    window.addEventListener("blur", () => this.input.clearAll());
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
    this.input.clearAll();
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
