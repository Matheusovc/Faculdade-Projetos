/**
 * NEON RIFT — Cinematic Tutorial Sequence
 * Ultra-premium AAA-quality control presentation
 * Inspired by: UE5 trailers, PlayStation Studios, Apple keynotes
 * Duration: 15 seconds exactly
 */

class NeonRiftTutorial {
  constructor(onComplete) {
    this.onComplete = onComplete;
    this.startTime = null;
    this.DURATION = 15000; // 15 seconds
    this.controls = [
      {
        action: "Mover esquerda",
        keyboard: "← / A",
        touch: "Btn Esq.",
        icon: "←",
        color: "#4df8ff",
        glow: "rgba(77,248,255,0.6)",
      },
      {
        action: "Mover direita",
        keyboard: "→ / D",
        touch: "Btn Dir.",
        icon: "→",
        color: "#4df8ff",
        glow: "rgba(77,248,255,0.6)",
      },
      {
        action: "Pular",
        keyboard: "↑ / W / Space",
        touch: "Btn Jump",
        icon: "↑",
        color: "#8d5cff",
        glow: "rgba(141,92,255,0.6)",
      },
      {
        action: "Ataque corpo a corpo",
        keyboard: "F",
        touch: "Btn Atk",
        icon: "⌁",
        color: "#ff3df2",
        glow: "rgba(255,61,242,0.6)",
      },
      {
        action: "Tiro",
        keyboard: "J / X / Ctrl",
        touch: "Btn Shot",
        icon: "•",
        color: "#4df8ff",
        glow: "rgba(77,248,255,0.6)",
      },
      {
        action: "Dash energético",
        keyboard: "K / Shift",
        touch: "Btn Dash",
        icon: "⇢",
        color: "#ff9d00",
        glow: "rgba(255,157,0,0.6)",
      },
      {
        action: "Power Blast",
        keyboard: "L / E",
        touch: "Btn Pwr",
        icon: "✦",
        color: "#ff3df2",
        glow: "rgba(255,61,242,0.6)",
      },
      {
        action: "Reiniciar",
        keyboard: "R",
        touch: "Btn Restart",
        icon: "↻",
        color: "#aaaaff",
        glow: "rgba(170,170,255,0.6)",
      },
    ];
    this.audioCtx = null;
    this.particles = [];
    this.scanLines = [];
    this.animFrame = null;
    this._build();
    this._initAudio();
    this._spawnParticles();
  }

  // ─── DOM SCAFFOLD ─────────────────────────────────────────────────────────

  _build() {
    this.root = document.createElement("div");
    this.root.id = "nrTutorial";
    Object.assign(this.root.style, {
      position: "fixed",
      inset: "0",
      zIndex: "200",
      background: "transparent",
      opacity: "0",
      transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1)",
      overflow: "hidden",
      fontFamily: "'Orbitron','Rajdhani',ui-monospace,monospace",
    });

    // ── Cinematic background canvas (particles / volumetric light) ──────────
    this.bgCanvas = document.createElement("canvas");
    Object.assign(this.bgCanvas.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
    });
    this.root.appendChild(this.bgCanvas);

    // ── Deep background gradient ────────────────────────────────────────────
    const bgLayer = document.createElement("div");
    Object.assign(bgLayer.style, {
      position: "absolute",
      inset: "0",
      background:
        "radial-gradient(ellipse 120% 80% at 50% 110%, #0d0020 0%, #000510 40%, #000000 100%)",
    });
    this.root.appendChild(bgLayer);

    // ── Volumetric light shafts ─────────────────────────────────────────────
    this._buildLightShafts();

    // ── Scan-line overlay ───────────────────────────────────────────────────
    const scanOverlay = document.createElement("div");
    Object.assign(scanOverlay.style, {
      position: "absolute",
      inset: "0",
      backgroundImage:
        "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)",
      pointerEvents: "none",
    });
    this.root.appendChild(scanOverlay);

    // ── Moving horizontal scanline ──────────────────────────────────────────
    this.scanLine = document.createElement("div");
    Object.assign(this.scanLine.style, {
      position: "absolute",
      left: "0",
      right: "0",
      height: "2px",
      background:
        "linear-gradient(90deg, transparent, rgba(77,248,255,0.15), rgba(77,248,255,0.4), rgba(77,248,255,0.15), transparent)",
      top: "0",
      filter: "blur(1px)",
      pointerEvents: "none",
    });
    this.root.appendChild(this.scanLine);

    // ── HUD frame borders ───────────────────────────────────────────────────
    this._buildHudFrame();

    // ── Controls container ──────────────────────────────────────────────────
    this.controlsWrap = document.createElement("div");
    Object.assign(this.controlsWrap.style, {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "14px 48px",
      padding: "0 40px",
      width: "min(900px, 90vw)",
    });
    this.root.appendChild(this.controlsWrap);

    // Build each control card (hidden initially)
    this.controlCards = this.controls.map((ctrl, i) =>
      this._buildCard(ctrl, i)
    );

    // ── Top label ───────────────────────────────────────────────────────────
    const topLabel = document.createElement("div");
    Object.assign(topLabel.style, {
      position: "absolute",
      top: "clamp(24px, 5%, 52px)",
      left: "50%",
      transform: "translateX(-50%)",
      textAlign: "center",
      letterSpacing: "0.28em",
      fontSize: "clamp(10px, 1.2vw, 14px)",
      color: "rgba(77,248,255,0.6)",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
    });
    topLabel.textContent = "NEON RIFT  //  CONTROLES";
    this.root.appendChild(topLabel);

    // ── Progress bar ────────────────────────────────────────────────────────
    this._buildProgressBar();

    // ── Final cinematic phrase ───────────────────────────────────────────────
    this.phrase = document.createElement("div");
    Object.assign(this.phrase.style, {
      position: "absolute",
      inset: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      opacity: "0",
      transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1)",
      pointerEvents: "none",
      zIndex: "10",
    });
    this.phrase.innerHTML = `
      <div id="nrPhraseSubtitle" style="
        letter-spacing:0.4em;
        font-size:clamp(9px,1vw,13px);
        color:rgba(77,248,255,0.5);
        text-transform:uppercase;
        margin-bottom:18px;
        opacity:0;
        transform:translateY(12px);
        transition:all 1s ease 0.3s;
      ">PREPARE-SE PARA ENTRAR EM</div>
      <div id="nrPhraseMain" style="
        font-size:clamp(28px,4.5vw,68px);
        font-weight:900;
        letter-spacing:0.12em;
        text-transform:uppercase;
        background:linear-gradient(135deg,#ffffff 0%,#4df8ff 40%,#ff3df2 80%,#ffffff 100%);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        background-clip:text;
        filter:drop-shadow(0 0 32px rgba(77,248,255,0.6)) drop-shadow(0 0 64px rgba(255,61,242,0.4));
        opacity:0;
        transform:scale(0.84) translateY(20px);
        transition:all 1.1s cubic-bezier(0.16,1,0.3,1) 0.5s;
        text-align:center;
      ">NEON RIFT</div>
    `;
    this.root.appendChild(this.phrase);

    document.body.appendChild(this.root);
  }

  _buildLightShafts() {
    const shafts = [
      { left: "20%", deg: "-18deg", color: "rgba(77,248,255,0.04)" },
      { left: "50%", deg: "0deg", color: "rgba(141,92,255,0.05)" },
      { left: "80%", deg: "14deg", color: "rgba(255,61,242,0.04)" },
    ];
    shafts.forEach(({ left, deg, color }) => {
      const shaft = document.createElement("div");
      Object.assign(shaft.style, {
        position: "absolute",
        bottom: "0",
        left,
        width: "clamp(120px,18vw,260px)",
        height: "100%",
        background: `linear-gradient(0deg, ${color} 0%, transparent 70%)`,
        transform: `translateX(-50%) skewX(${deg})`,
        transformOrigin: "bottom center",
        pointerEvents: "none",
        animation: "nrShaftPulse 6s ease-in-out infinite alternate",
      });
      this.root.appendChild(shaft);
    });
  }

  _buildHudFrame() {
    // Corner brackets
    const corners = [
      { top: "16px", left: "16px", borderTop: "2px solid", borderLeft: "2px solid" },
      { top: "16px", right: "16px", borderTop: "2px solid", borderRight: "2px solid" },
      { bottom: "16px", left: "16px", borderBottom: "2px solid", borderLeft: "2px solid" },
      { bottom: "16px", right: "16px", borderBottom: "2px solid", borderRight: "2px solid" },
    ];
    corners.forEach((styles) => {
      const el = document.createElement("div");
      Object.assign(el.style, {
        position: "absolute",
        width: "32px",
        height: "32px",
        borderColor: "rgba(77,248,255,0.5)",
        pointerEvents: "none",
        ...styles,
      });
      this.root.appendChild(el);
    });

    // Side decorative lines
    ["left", "right"].forEach((side) => {
      const line = document.createElement("div");
      Object.assign(line.style, {
        position: "absolute",
        top: "50%",
        [side]: "16px",
        transform: "translateY(-50%)",
        width: "1px",
        height: "clamp(60px,12vh,120px)",
        background:
          "linear-gradient(180deg, transparent, rgba(77,248,255,0.4), transparent)",
        pointerEvents: "none",
      });
      this.root.appendChild(line);
    });
  }

  _buildProgressBar() {
    const track = document.createElement("div");
    Object.assign(track.style, {
      position: "absolute",
      bottom: "clamp(20px,4vh,36px)",
      left: "50%",
      transform: "translateX(-50%)",
      width: "clamp(200px,40vw,480px)",
      height: "2px",
      background: "rgba(255,255,255,0.08)",
      borderRadius: "2px",
      overflow: "hidden",
    });
    this.progressFill = document.createElement("div");
    Object.assign(this.progressFill.style, {
      height: "100%",
      width: "0%",
      background:
        "linear-gradient(90deg, #4df8ff, #8d5cff, #ff3df2)",
      boxShadow: "0 0 8px rgba(77,248,255,0.8)",
      transition: "width 0.1s linear",
      borderRadius: "2px",
    });
    track.appendChild(this.progressFill);
    this.root.appendChild(track);

    // Skip hint
    const skipHint = document.createElement("div");
    Object.assign(skipHint.style, {
      position: "absolute",
      bottom: "clamp(12px,2.5vh,24px)",
      right: "clamp(16px,2vw,32px)",
      fontSize: "clamp(8px,0.9vw,11px)",
      color: "rgba(255,255,255,0.2)",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
    });
    skipHint.textContent = "ESC para pular";
    this.root.appendChild(skipHint);
  }

  _buildCard(ctrl, index) {
    const card = document.createElement("div");
    Object.assign(card.style, {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      background: "rgba(5,7,17,0.72)",
      border: `1px solid ${ctrl.color}22`,
      borderRadius: "8px",
      padding: "12px 16px",
      backdropFilter: "blur(12px)",
      boxShadow: `0 0 24px ${ctrl.glow.replace("0.6", "0.08")}, inset 0 0 20px rgba(0,0,0,0.4)`,
      opacity: "0",
      transform: "translateX(-28px) scale(0.95)",
      transition:
        "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease",
      position: "relative",
      overflow: "hidden",
    });

    // Holographic shimmer line
    const shimmer = document.createElement("div");
    Object.assign(shimmer.style, {
      position: "absolute",
      inset: "0",
      background: `linear-gradient(105deg, transparent 30%, ${ctrl.color}08 50%, transparent 70%)`,
      transform: "translateX(-100%)",
      transition: "transform 0s",
    });
    card.appendChild(shimmer);

    // Icon badge
    const badge = document.createElement("div");
    Object.assign(badge.style, {
      width: "42px",
      height: "42px",
      minWidth: "42px",
      borderRadius: "8px",
      border: `1px solid ${ctrl.color}44`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "22px",
      color: ctrl.color,
      textShadow: `0 0 12px ${ctrl.color}`,
      background: `radial-gradient(circle, ${ctrl.color}18 0%, transparent 70%)`,
      boxShadow: `0 0 16px ${ctrl.glow.replace("0.6", "0.2")}, inset 0 0 10px ${ctrl.color}10`,
      flexShrink: "0",
      position: "relative",
    });
    badge.textContent = ctrl.icon;
    card.appendChild(badge);

    // Text block
    const textBlock = document.createElement("div");
    Object.assign(textBlock.style, { flex: "1", minWidth: "0" });

    const actionName = document.createElement("div");
    Object.assign(actionName.style, {
      fontSize: "clamp(9px,1.1vw,13px)",
      fontWeight: "700",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.9)",
      marginBottom: "5px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    });
    actionName.textContent = ctrl.action;
    textBlock.appendChild(actionName);

    const keysRow = document.createElement("div");
    Object.assign(keysRow.style, {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      flexWrap: "wrap",
    });

    // Keyboard key chips
    const kbLabel = document.createElement("span");
    Object.assign(kbLabel.style, {
      fontSize: "clamp(7px,0.8vw,10px)",
      color: "rgba(255,255,255,0.3)",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    });
    kbLabel.textContent = "KB:";
    keysRow.appendChild(kbLabel);

    const kbValue = document.createElement("span");
    Object.assign(kbValue.style, {
      fontSize: "clamp(9px,1vw,12px)",
      color: ctrl.color,
      fontWeight: "600",
      letterSpacing: "0.06em",
      textShadow: `0 0 8px ${ctrl.color}`,
    });
    kbValue.textContent = ctrl.keyboard;
    keysRow.appendChild(kbValue);

    // Divider
    const div = document.createElement("span");
    Object.assign(div.style, {
      width: "1px",
      height: "12px",
      background: "rgba(255,255,255,0.12)",
      flexShrink: "0",
    });
    keysRow.appendChild(div);

    const touchLabel = document.createElement("span");
    Object.assign(touchLabel.style, {
      fontSize: "clamp(7px,0.8vw,10px)",
      color: "rgba(255,255,255,0.3)",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    });
    touchLabel.textContent = "Touch:";
    keysRow.appendChild(touchLabel);

    const touchValue = document.createElement("span");
    Object.assign(touchValue.style, {
      fontSize: "clamp(9px,1vw,12px)",
      color: "rgba(255,255,255,0.5)",
      fontWeight: "500",
      letterSpacing: "0.04em",
    });
    touchValue.textContent = ctrl.touch;
    keysRow.appendChild(touchValue);

    textBlock.appendChild(keysRow);
    card.appendChild(textBlock);

    this.controlsWrap.appendChild(card);
    return { el: card, shimmer, ctrl };
  }

  // ─── AUDIO ────────────────────────────────────────────────────────────────

  _initAudio() {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.audioCtx = new AC();
    } catch (e) {}
  }

  _playUITone(freq = 880, dur = 0.18, type = "sine", vol = 0.18, bend = 0) {
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const master = this.audioCtx.createGain();
      master.gain.value = vol;
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      if (bend) osc.frequency.linearRampToValueAtTime(freq + bend, now + dur);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(1, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
      osc.connect(gain);
      gain.connect(master);
      master.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + dur + 0.02);
    } catch (e) {}
  }

  _playCardReveal(index) {
    const freqs = [660, 720, 780, 840, 900, 780, 720, 660];
    const freq = freqs[index % freqs.length];
    this._playUITone(freq, 0.14, "triangle", 0.14, 120);
    // Sub sweep
    setTimeout(() => this._playUITone(freq * 0.5, 0.08, "sine", 0.06, -40), 50);
  }

  _playPhraseReveal() {
    this._playUITone(220, 0.6, "sine", 0.2, 880);
    setTimeout(() => this._playUITone(440, 0.4, "triangle", 0.15, 440), 200);
    setTimeout(() => this._playUITone(880, 0.8, "sine", 0.18, 220), 500);
  }

  _playOutroSweep() {
    // Rising dramatic sweep
    this._playUITone(55, 2.0, "sawtooth", 0.08, 400);
    setTimeout(() => this._playUITone(110, 1.5, "sine", 0.06, 880), 400);
    setTimeout(() => this._playUITone(440, 1.0, "triangle", 0.1, 660), 1000);
  }

  // ─── PARTICLE SYSTEM ──────────────────────────────────────────────────────

  _spawnParticles() {
    for (let i = 0; i < 60; i++) {
      this.particles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.00012,
        vy: -0.00006 - Math.random() * 0.00012,
        size: 0.5 + Math.random() * 2.5,
        alpha: 0.1 + Math.random() * 0.5,
        color:
          Math.random() > 0.6
            ? "77,248,255"
            : Math.random() > 0.5
            ? "141,92,255"
            : "255,61,242",
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.4 + Math.random() * 1.2,
      });
    }
  }

  _drawParticles(ctx, w, h, dt) {
    ctx.clearRect(0, 0, w, h);
    const t = performance.now() / 1000;

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
      if (p.x < -0.02) p.x = 1.02;
      if (p.x > 1.02) p.x = -0.02;

      const alpha = p.alpha * (0.6 + 0.4 * Math.sin(t * p.pulseSpeed + p.pulse));
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${alpha})`;
      ctx.fill();

      // Glow halo
      const grad = ctx.createRadialGradient(p.x * w, p.y * h, 0, p.x * w, p.y * h, p.size * 3.5);
      grad.addColorStop(0, `rgba(${p.color},${alpha * 0.3})`);
      grad.addColorStop(1, `rgba(${p.color},0)`);
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, p.size * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }
  }

  // ─── MAIN SEQUENCE ────────────────────────────────────────────────────────

  start() {
    this._injectStyles();

    // Resize canvas
    const resize = () => {
      this.bgCanvas.width = window.innerWidth;
      this.bgCanvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Fade in from black
    requestAnimationFrame(() => {
      this.root.style.opacity = "1";
    });

    this.startTime = performance.now();
    const ctx = this.bgCanvas.getContext("2d");

    // Card reveal schedule (spread evenly over 0–9.5 seconds)
    const revealDelay = 1100; // start after 1.1s
    const revealInterval = 900; // one card every 900ms
    this.controlCards.forEach(({ el, shimmer, ctrl }, i) => {
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateX(0) scale(1)";
        el.style.boxShadow = `0 0 32px ${ctrl.glow.replace("0.6", "0.15")}, inset 0 0 20px rgba(0,0,0,0.4), 0 0 0 1px ${ctrl.color}33`;
        this._playCardReveal(i);

        // Shimmer sweep
        setTimeout(() => {
          shimmer.style.transition = "transform 0.6s ease";
          shimmer.style.transform = "translateX(200%)";
        }, 80);
      }, revealDelay + i * revealInterval);
    });

    // 11s — start outro: controls fade out + phrase appear
    setTimeout(() => this._beginOutro(), 10800);

    // 15s — transition to game
    setTimeout(() => this._transitionToGame(), 14800);

    // ESC to skip
    this._escListener = (e) => {
      if (e.key === "Escape") this._transitionToGame();
    };
    window.addEventListener("keydown", this._escListener);

    // Render loop
    let last = performance.now();
    const loop = (now) => {
      const elapsed = now - this.startTime;
      if (elapsed >= this.DURATION + 1200) return;

      const dt = now - last;
      last = now;

      // Particle canvas
      this._drawParticles(ctx, this.bgCanvas.width, this.bgCanvas.height, dt);

      // Scan-line drift
      const scanY = ((elapsed * 0.06) % 110);
      this.scanLine.style.top = `${scanY}%`;

      // Progress bar
      const progress = Math.min(100, (elapsed / this.DURATION) * 100);
      this.progressFill.style.width = `${progress}%`;

      this.animFrame = requestAnimationFrame(loop);
    };
    this.animFrame = requestAnimationFrame(loop);
  }

  _beginOutro() {
    this._playOutroSweep();

    // Fade out all cards
    this.controlCards.forEach(({ el }, i) => {
      setTimeout(() => {
        el.style.opacity = "0";
        el.style.transform = "translateX(28px) scale(0.95)";
      }, i * 120);
    });

    // Cinematic zoom-in effect on background
    this.root.style.transition = "all 0.8s ease";

    // Show phrase
    setTimeout(() => {
      this.phrase.style.opacity = "1";
      this._playPhraseReveal();

      requestAnimationFrame(() => {
        const subtitle = document.getElementById("nrPhraseSubtitle");
        const main = document.getElementById("nrPhraseMain");
        if (subtitle) {
          subtitle.style.opacity = "1";
          subtitle.style.transform = "translateY(0)";
        }
        if (main) {
          main.style.opacity = "1";
          main.style.transform = "scale(1) translateY(0)";
        }
      });
    }, 1200);
  }

  _transitionToGame() {
    if (this._transitioning) return;
    this._transitioning = true;

    window.removeEventListener("keydown", this._escListener);
    cancelAnimationFrame(this.animFrame);

    // Dramatic flash then fade to black
    this.root.style.transition = "opacity 0.8s cubic-bezier(0.4,0,1,1)";
    this.root.style.opacity = "0";

    setTimeout(() => {
      this.root.remove();
      if (this.onComplete) this.onComplete();
    }, 900);
  }

  // ─── INJECTED KEYFRAMES ──────────────────────────────────────────────────

  _injectStyles() {
    if (document.getElementById("nrTutorialStyles")) return;
    const style = document.createElement("style");
    style.id = "nrTutorialStyles";
    style.textContent = `
      @keyframes nrShaftPulse {
        0%   { opacity: 0.5; transform: translateX(-50%) skewX(-18deg) scaleY(0.92); }
        100% { opacity: 1;   transform: translateX(-50%) skewX(-18deg) scaleY(1.05); }
      }
      @keyframes nrGlow {
        0%, 100% { filter: brightness(1); }
        50%       { filter: brightness(1.3); }
      }
    `;
    document.head.appendChild(style);
  }
}
