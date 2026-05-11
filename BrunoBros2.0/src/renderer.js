import { SPRITE_ANIMS, SPRITE_SRC, VIEW } from "./config.js";

export class Renderer {
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
