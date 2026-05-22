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

export class Input {
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

  clearAll() {
    this.down.clear();
    this.pressed.clear();
  }

  tryFullscreen() {
    if (document.fullscreenElement || !this.shell?.requestFullscreen) return;
    this.shell.requestFullscreen({ navigationUI: "hide" }).catch(() => {});
  }
}
