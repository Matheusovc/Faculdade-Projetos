export const VIEW = {
  width: 960,
  height: 540,
  gravity: 0.78,
  friction: 0.82,
};

export const SPRITE_SRC = "./assets/cara1.png";

const f = (x, y, w = 42, h = 46) => ({ x, y, w, h });

export const SPRITE_ANIMS = {
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

export const LEVELS = [
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
