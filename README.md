# 🌌 Neon Rift

<p align="center">
  <img src="https://media.giphy.com/media/fAnEC88LccN7a/giphy.gif" width="100%" alt="Neon Rift Banner">
</p>

<h3 align="center">
  Cyberpunk Platform Game Experience
</h3>

<p align="center">
  Um jogo de plataforma 2D com visual neon futurista, combate dinâmico e efeitos cinematográficos desenvolvidos com tecnologias web nativas.
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/Canvas_API-000000?style=for-the-badge&logo=canvas&logoColor=white" alt="Canvas API">
  <img src="https://img.shields.io/badge/Mobile-Friendly-34A853?style=for-the-badge&logo=android&logoColor=white" alt="Mobile Friendly">
</p>

---

## 📚 Índice

- [🎮 Sobre o Projeto](#-sobre-o-projeto)
- [⚔️ Funcionalidades](#️-funcionalidades)
- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🧠 Arquitetura e Conceitos](#-arquitetura-e-conceitos)
- [🎮 Controles](#-controles)
- [🧩 Estrutura de Pastas](#-estrutura-de-pastas)
- [▶️ Como Executar](#️-como-executar)
- [👨‍💻 Autor](#-autor)

---

# 🎮 Sobre o Projeto

O **Neon Rift** é um jogo de plataforma 2D com estética cyberpunk desenvolvido utilizando apenas tecnologias web nativas.

O projeto foi criado com foco em:

- Gameplay arcade fluido
- Combate rápido e responsivo
- Renderização avançada via Canvas API
- Física customizada
- Efeitos visuais cinematográficos
- Compatibilidade com desktop e mobile

---

# ⚔️ Funcionalidades

## 🔥 Sistema de Combate
- Ataques melee
- Disparos de energia
- Hit-stop para impacto visual
- Feedback visual dinâmico

## ⚡ Movimentação Avançada
- Dash energético
- Rastros de partículas
- Sistema de estamina

## 🎥 Efeitos Cinematográficos
- Screen shake
- Explosões procedurais
- Glow neon
- Iluminação dinâmica

## 🔊 Áudio Dinâmico
- Trilha sonora integrada
- Efeitos sonoros via Web Audio API
- Feedback sonoro em ações e colisões

## 🖥️ HUD em Tempo Real
- Barra de vida
- Energia
- Score
- Indicadores visuais animados

---

# 🚀 Tecnologias Utilizadas

| Camada | Tecnologia | Utilização |
|---|---|---|
| Engine | HTML5 Canvas | Renderização de sprites e partículas |
| Lógica | JavaScript ES6 | Física, colisões e game loop |
| Interface | CSS3 | Menus, HUD e efeitos visuais |
| Áudio | Web Audio API | Processamento de efeitos sonoros |

---

# 🧠 Arquitetura e Conceitos

O projeto foi estruturado utilizando conceitos modernos de organização e desenvolvimento:

### 🎯 Game Loop
Controle de FPS, atualização de física e sincronização de renderização.

### 🧩 Entity Component System (ECS)
Separação modular entre:
- Jogador
- Inimigos
- Projéteis
- Partículas

### 📦 AABB Collision
Sistema otimizado de colisão para plataformas 2D.

### 🎮 Input Manager
Suporte simultâneo para:
- Teclado
- Touchscreen
- Controles mobile

---

# 🎮 Controles

| Ação | Teclado | Mobile |
|---|---|---|
| Mover | A / D | Joystick Virtual |
| Pular | Espaço | Botão A |
| Atacar | J | Botão X |
| Atirar | K | Botão Y |
| Dash | Shift | Swipe / Botão L |
| Especial | L | Botão Ultimate |

---

# 🧩 Estrutura de Pastas

```bash
NeonRift/
│
├── assets/              # Sprites, efeitos e áudio
│
├── src/
│   ├── audio.js         # Sistema de áudio
│   ├── config.js        # Configurações gerais
│   ├── entities.js      # Jogadores e inimigos
│   ├── game.js          # Core engine
│   ├── input.js         # Gerenciamento de inputs
│   └── renderer.js      # Renderização no canvas
│
├── index.html
└── styles.css
```

---

# ▶️ Como Executar

## Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/NeonRift.git
```

## Entre na pasta do projeto

```bash
cd NeonRift
```

## Execute no navegador

Abra o arquivo:

```bash
index.html
```

em qualquer navegador moderno.

---

# 👨‍💻 Autor

## MATHEUS DE OLIVEIRA CARVALHO

Software Developer • Game Enthusiast • Automation Builder

<p align="left">
  <a href="https://www.linkedin.com/in/ovcmatheus" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
  </a>

  <a href="https://github.com/SEU-GITHUB" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-111111?style=for-the-badge&logo=github&logoColor=white">
  </a>
</p>

---

<p align="center">
  <strong>"Code Beyond Limits."</strong>
</p>

<p align="center">
  Desenvolvido com ⚡ por Matheus Oliveira
</p>
