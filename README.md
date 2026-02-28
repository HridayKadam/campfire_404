# ANOMALY_404

**"Find the anomaly before your sanity runs out."**

ANOMALY_404 is a psychological horror looping game built for a hackathon. You are trapped in a room that resets every time you exit (or time runs out). Each loop looks identical, but one subtle anomaly might appear. Your task is to find it.

## 🎮 Gameplay
- **Objective**: Identify the single anomaly in the room by clicking on it.
- **Controls**: 
  - **WASD / Arrow Keys**: Move the player.
  - **Mouse Click**: Interact with objects to report an anomaly.
- **Sanity**: You start with 3 sanity points. Losing sanity (wrong click or timeout) lead to an eventual game over.
- **Looping**: Surving loops increases the difficulty by reducing the time limit.

## 🛠️ Tech Stack
- **Pure HTML5**
- **Vanilla CSS** (No frameworks, custom dark horror aesthetic)
- **Vanilla JavaScript** (No external libraries)
- **Canvas API** for all rendering
- **Web Audio API** for procedural sound effects

## 🧩 Features
- **Loop-based Anomaly System**: 10+ randomized visual anomalies.
- **Dynamic Difficulty**: Timer scales down every 3 loops.
- **Atmospheric Polish**: Screen flicker effects, low-frequency ambient hum, and glassmorphism UI.
- **Modular Architecture**: Clean class-based structure (`Game`, `Player`, `Room`, `AnomalyManager`).

## 📁 File Structure
- `index.html`: Main game structure and UI overlays.
- `style.css`: Visual styling and animations.
- `game.js`: Core game logic and rendering engine.

## 🚀 Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/HridayKadam/campfire_404.git
   ```
2. Open `index.html` in any modern web browser.
3. Find the anomalies. Stay sane.

---
*Built as a senior game developer project for high-impact performance and polish.*
