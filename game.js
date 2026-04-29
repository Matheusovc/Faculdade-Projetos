const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const coinsEl = document.querySelector("#coins");
const livesEl = document.querySelector("#lives");
const timerEl = document.querySelector("#timer");
const restartBtn = document.querySelector("#restartBtn");

const keys = {
  left: false,
  right: false,
  jump: false,
};

const world = {
  width: 3600,
  height: 540,
  gravity: 0.68,
  friction: 0.82,
  cameraX: 0,
  timeLimit: 180,
  state: "playing",
  message: "",
  messageSmall: "",
};

const startPosition = { x: 90, y: 380 };
let timerId = 0;
let coins = 0;
let lives = 3;

const player = {
  x: startPosition.x,
  y: startPosition.y,
  w: 34,
  h: 46,
  vx: 0,
  vy: 0,
  speed: 0.62,
  jumpPower: 13.8,
  maxSpeed: 5.6,
  grounded: false,
  invincible: 0,
  facing: 1,
};

const platforms = [
  { x: 0, y: 488, w: 690, h: 52, type: "ground" },
  { x: 760, y: 488, w: 450, h: 52, type: "ground" },
  { x: 1290, y: 488, w: 520, h: 52, type: "ground" },
  { x: 1900, y: 488, w: 710, h: 52, type: "ground" },
  { x: 2700, y: 488, w: 900, h: 52, type: "ground" },
  { x: 310, y: 382, w: 136, h: 28, type: "brick" },
  { x: 548, y: 322, w: 72, h: 28, type: "mystery" },
  { x: 900, y: 390, w: 174, h: 28, type: "brick" },
  { x: 1370, y: 354, w: 104, h: 28, type: "mystery" },
  { x: 1550, y: 278, w: 140, h: 28, type: "brick" },
  { x: 2140, y: 382, w: 106, h: 28, type: "brick" },
  { x: 2300, y: 322, w: 164, h: 28, type: "mystery" },
  { x: 2850, y: 388, w: 132, h: 28, type: "brick" },
  { x: 3050, y: 328, w: 132, h: 28, type: "brick" },
];

const coinsList = [
  { x: 350, y: 336, taken: false },
  { x: 570, y: 274, taken: false },
  { x: 950, y: 342, taken: false },
  { x: 1006, y: 342, taken: false },
  { x: 1416, y: 304, taken: false },
  { x: 1608, y: 230, taken: false },
  { x: 2200, y: 334, taken: false },
  { x: 2365, y: 274, taken: false },
  { x: 2915, y: 340, taken: false },
  { x: 3115, y: 280, taken: false },
  { x: 3310, y: 430, taken: false },
];

const enemies = [
  { x: 620, y: 456, w: 34, h: 32, vx: -1.1, min: 500, max: 680, alive: true },
  { x: 1160, y: 456, w: 34, h: 32, vx: -1.2, min: 790, max: 1190, alive: true },
  { x: 1760, y: 456, w: 34, h: 32, vx: -1.35, min: 1300, max: 1800, alive: true },
  { x: 2520, y: 456, w: 34, h: 32, vx: -1.45, min: 1950, max: 2600, alive: true },
  { x: 3160, y: 456, w: 34, h: 32, vx: -1.55, min: 2740, max: 3430, alive: true },
];

const flag = { x: 3480, y: 286, w: 22, h: 202 };

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function resetPlayer() {
  player.x = startPosition.x;
  player.y = startPosition.y;
  player.vx = 0;
  player.vy = 0;
  player.grounded = false;
  player.invincible = 90;
  world.cameraX = 0;
}

function restartGame() {
  coins = 0;
  lives = 3;
  world.state = "playing";
  world.message = "";
  world.messageSmall = "";
  world.cameraX = 0;
  coinsList.forEach((coin) => {
    coin.taken = false;
  });
  enemies.forEach((enemy) => {
    enemy.alive = true;
  });
  resetPlayer();
  startTimer();
}

function loseLife() {
  if (player.invincible > 0 || world.state !== "playing") return;
  lives -= 1;
  if (lives <= 0) {
    world.state = "lost";
    world.message = "Fim de jogo";
    world.messageSmall = "Aperte Reiniciar para tentar de novo";
    stopTimer();
    return;
  }
  resetPlayer();
}

function winGame() {
  world.state = "won";
  world.message = "Fase completa!";
  world.messageSmall = "Você chegou à bandeira";
  stopTimer();
}

function startTimer() {
  stopTimer();
  let remaining = world.timeLimit;
  timerEl.textContent = remaining;
  timerId = window.setInterval(() => {
    if (world.state !== "playing") return;
    remaining -= 1;
    timerEl.textContent = remaining;
    if (remaining <= 0) {
      loseLife();
      remaining = world.timeLimit;
      timerEl.textContent = remaining;
    }
  }, 1000);
}

function stopTimer() {
  window.clearInterval(timerId);
}

function solidCollision() {
  player.grounded = false;

  player.x += player.vx;
  for (const platform of platforms) {
    if (!rectsOverlap(player, platform)) continue;
    if (player.vx > 0) player.x = platform.x - player.w;
    if (player.vx < 0) player.x = platform.x + platform.w;
    player.vx = 0;
  }

  player.y += player.vy;
  for (const platform of platforms) {
    if (!rectsOverlap(player, platform)) continue;
    if (player.vy > 0) {
      player.y = platform.y - player.h;
      player.vy = 0;
      player.grounded = true;
    } else if (player.vy < 0) {
      player.y = platform.y + platform.h;
      player.vy = 1.8;
      if (platform.type === "mystery" && !platform.used) {
        platform.used = true;
        coins += 1;
      }
    }
  }
}

function updatePlayer() {
  if (keys.left) {
    player.vx -= player.speed;
    player.facing = -1;
  }
  if (keys.right) {
    player.vx += player.speed;
    player.facing = 1;
  }
  if (keys.jump && player.grounded) {
    player.vy = -player.jumpPower;
    player.grounded = false;
  }

  player.vx *= world.friction;
  player.vx = Math.max(-player.maxSpeed, Math.min(player.maxSpeed, player.vx));
  player.vy += world.gravity;
  player.vy = Math.min(player.vy, 16);

  solidCollision();

  if (player.x < 0) player.x = 0;
  if (player.x + player.w > world.width) player.x = world.width - player.w;
  if (player.y > canvas.height + 90) loseLife();
  if (player.invincible > 0) player.invincible -= 1;
}

function updateCoins() {
  const playerCenter = { x: player.x + player.w / 2, y: player.y + player.h / 2, w: 1, h: 1 };
  for (const coin of coinsList) {
    if (coin.taken) continue;
    const pickup = { x: coin.x - 16, y: coin.y - 16, w: 32, h: 32 };
    if (rectsOverlap(playerCenter, pickup) || rectsOverlap(player, pickup)) {
      coin.taken = true;
      coins += 1;
    }
  }
}

function updateEnemies() {
  for (const enemy of enemies) {
    if (!enemy.alive) continue;
    enemy.x += enemy.vx;
    if (enemy.x < enemy.min || enemy.x + enemy.w > enemy.max) enemy.vx *= -1;

    if (!rectsOverlap(player, enemy)) continue;
    const playerWasAbove = player.vy > 0 && player.y + player.h - enemy.y < 18;
    if (playerWasAbove) {
      enemy.alive = false;
      player.vy = -8.5;
      coins += 1;
    } else {
      loseLife();
    }
  }
}

function updateCamera() {
  const target = player.x - canvas.width * 0.42;
  world.cameraX += (target - world.cameraX) * 0.12;
  world.cameraX = Math.max(0, Math.min(world.width - canvas.width, world.cameraX));
}

function updateHud() {
  coinsEl.textContent = coins;
  livesEl.textContent = lives;
}

function update() {
  if (world.state === "playing") {
    updatePlayer();
    updateCoins();
    updateEnemies();
    updateCamera();
    if (rectsOverlap(player, flag)) winGame();
  }
  updateHud();
}

function drawRoundedRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
  ctx.stroke();
}

function drawSky() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#78ceef");
  gradient.addColorStop(0.58, "#d4f5ff");
  gradient.addColorStop(0.59, "#8bd56f");
  gradient.addColorStop(1, "#4a9c54");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(-world.cameraX * 0.25, 0);
  for (let x = -120; x < world.width; x += 520) {
    drawCloud(x + 80, 86, 1);
    drawHill(x + 290, 488, 88, "#6dbd6d");
  }
  ctx.restore();
}

function drawCloud(x, y, scale) {
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.strokeStyle = "#1d2a44";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(x, y + 16, 34 * scale, 20 * scale, 0, 0, Math.PI * 2);
  ctx.ellipse(x + 34, y + 10, 42 * scale, 26 * scale, 0, 0, Math.PI * 2);
  ctx.ellipse(x + 75, y + 18, 36 * scale, 20 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function drawHill(x, base, radius, color) {
  ctx.fillStyle = color;
  ctx.strokeStyle = "#1d2a44";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, base, radius, Math.PI, 0);
  ctx.lineTo(x + radius, base);
  ctx.lineTo(x - radius, base);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawPlatform(platform) {
  const x = Math.round(platform.x - world.cameraX);
  const { y, w, h } = platform;
  ctx.strokeStyle = "#1d2a44";
  ctx.lineWidth = 3;

  if (platform.type === "ground") {
    ctx.fillStyle = "#9a6235";
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = "#69b84f";
    ctx.fillRect(x, y, w, 14);
    ctx.strokeRect(x, y, w, 14);
    for (let bx = x; bx < x + w; bx += 38) {
      ctx.strokeRect(bx, y + 14, 38, 22);
    }
    return;
  }

  ctx.fillStyle = platform.used ? "#ba8a57" : platform.type === "mystery" ? "#f4b73a" : "#cc6a32";
  ctx.fillRect(x, y, w, h);
  ctx.strokeRect(x, y, w, h);

  if (platform.type === "mystery" && !platform.used) {
    ctx.fillStyle = "#fff5c4";
    ctx.font = "900 20px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("?", x + w / 2, y + 21);
  } else {
    for (let bx = x + 2; bx < x + w; bx += 34) {
      ctx.strokeRect(bx, y + 2, 34, h - 4);
    }
  }
}

function drawCoin(coin, frame) {
  if (coin.taken) return;
  const x = coin.x - world.cameraX;
  const wobble = Math.sin(frame / 10 + coin.x) * 4;
  ctx.fillStyle = "#f8c847";
  ctx.strokeStyle = "#1d2a44";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(x, coin.y, 12 + wobble, 18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#fff0a3";
  ctx.fillRect(x - 3, coin.y - 11, 6, 22);
}

function drawEnemy(enemy) {
  if (!enemy.alive) return;
  const x = enemy.x - world.cameraX;
  ctx.fillStyle = "#7c4b2e";
  ctx.strokeStyle = "#1d2a44";
  ctx.lineWidth = 3;
  drawRoundedRect(x, enemy.y, enemy.w, enemy.h, 8);
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(x + 10, enemy.y + 12, 5, 0, Math.PI * 2);
  ctx.arc(x + 24, enemy.y + 12, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#1d2a44";
  ctx.fillRect(x + 9, enemy.y + 12, 3, 4);
  ctx.fillRect(x + 23, enemy.y + 12, 3, 4);
  ctx.fillRect(x + 5, enemy.y + enemy.h - 2, 8, 8);
  ctx.fillRect(x + 21, enemy.y + enemy.h - 2, 8, 8);
}

function drawPlayer(frame) {
  const x = Math.round(player.x - world.cameraX);
  const y = Math.round(player.y);
  const blink = player.invincible > 0 && Math.floor(frame / 5) % 2 === 0;
  if (blink) return;

  ctx.save();
  ctx.translate(x + player.w / 2, y);
  ctx.scale(player.facing, 1);

  ctx.strokeStyle = "#1d2a44";
  ctx.lineWidth = 3;
  ctx.fillStyle = "#2c6ed5";
  drawRoundedRect(-13, 18, 26, 28, 5);
  ctx.fillStyle = "#e84c3d";
  drawRoundedRect(-16, 2, 32, 20, 8);
  ctx.fillStyle = "#ffd3a3";
  drawRoundedRect(-13, -8, 26, 20, 8);
  ctx.fillStyle = "#e84c3d";
  ctx.fillRect(-18, -14, 34, 9);
  ctx.strokeRect(-18, -14, 34, 9);
  ctx.fillStyle = "#1d2a44";
  ctx.fillRect(4, -1, 4, 4);
  ctx.fillStyle = "#ffd3a3";
  ctx.fillRect(-25, 22, 10, 12);
  ctx.fillRect(15, 22, 10, 12);
  ctx.fillStyle = "#5a3927";
  ctx.fillRect(-15, 44, 13, 7);
  ctx.fillRect(2, 44, 13, 7);

  ctx.restore();
}

function drawFlag() {
  const x = flag.x - world.cameraX;
  ctx.strokeStyle = "#1d2a44";
  ctx.lineWidth = 4;
  ctx.fillStyle = "#efe7ce";
  ctx.fillRect(x, flag.y, flag.w, flag.h);
  ctx.strokeRect(x, flag.y, flag.w, flag.h);
  ctx.fillStyle = "#2d9b67";
  ctx.beginPath();
  ctx.moveTo(x + flag.w, flag.y + 16);
  ctx.lineTo(x + 108, flag.y + 48);
  ctx.lineTo(x + flag.w, flag.y + 80);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawOverlay() {
  if (world.state === "playing") return;
  ctx.fillStyle = "rgba(23, 32, 51, 0.72)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fffaf0";
  ctx.strokeStyle = "#1d2a44";
  ctx.lineWidth = 4;
  drawRoundedRect(260, 180, 440, 168, 8);
  ctx.fillStyle = "#172033";
  ctx.textAlign = "center";
  ctx.font = "900 44px system-ui";
  ctx.fillText(world.message, canvas.width / 2, 250);
  ctx.font = "800 20px system-ui";
  ctx.fillText(world.messageSmall, canvas.width / 2, 292);
}

function draw(frame) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSky();

  platforms.forEach(drawPlatform);
  coinsList.forEach((coin) => drawCoin(coin, frame));
  enemies.forEach(drawEnemy);
  drawFlag();
  drawPlayer(frame);
  drawOverlay();
}

function gameLoop(frame = 0) {
  update();
  draw(frame);
  requestAnimationFrame(gameLoop);
}

function setKey(name, value) {
  keys[name] = value;
}

function bindHoldButton(id, keyName) {
  const button = document.querySelector(id);
  const press = (event) => {
    event.preventDefault();
    setKey(keyName, true);
    button.classList.add("is-down");
  };
  const release = (event) => {
    event.preventDefault();
    setKey(keyName, false);
    button.classList.remove("is-down");
  };

  button.addEventListener("pointerdown", press);
  button.addEventListener("pointerup", release);
  button.addEventListener("pointercancel", release);
  button.addEventListener("pointerleave", release);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") setKey("left", true);
  if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") setKey("right", true);
  if (event.key === "ArrowUp" || event.key === " " || event.key.toLowerCase() === "w") {
    event.preventDefault();
    setKey("jump", true);
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") setKey("left", false);
  if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") setKey("right", false);
  if (event.key === "ArrowUp" || event.key === " " || event.key.toLowerCase() === "w") setKey("jump", false);
});

bindHoldButton("#leftBtn", "left");
bindHoldButton("#rightBtn", "right");
bindHoldButton("#jumpBtn", "jump");
restartBtn.addEventListener("click", restartGame);

restartGame();
requestAnimationFrame(gameLoop);
