import { VIEW } from "./config.js";

export const rectsOverlap = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

export class Player {
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

export class Enemy {
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

export class Projectile {
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
