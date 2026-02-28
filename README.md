# ANOMALY_404 (Beneath the Surface)

**"Find the anomaly before your sanity runs out."**

ANOMALY_404 is a psychological horror descent game built for the "Beneath the Surface" hackathon. You are descending into a recursive simulation where each meter deeper marks a shift in reality. Identify the anomalies to stabilize your descent.

## 🎮 Gameplay
- **Objective**: Identify the single anomaly in the room to reach the next depth.
- **Controls**: 
  - **WASD / Arrow Keys**: Move the player.
  - **Mouse Click**: Interact with objects to report an anomaly.
- **Stability & Sync**: Your synchronization (sync) with the surface is fragile. Instability (wrong clicks or timeout) leads to synchronization failure.
- **Descent**: The further you go, the more the reality "beneath the surface" begins to decay.

## 🛠️ Tech Stack
- **Pure HTML5**
- **Vanilla CSS** (Scanlines, vignettes, and depth-based color shifts)
- **Vanilla JavaScript** (No external libraries)
- **Canvas API** for all rendering
- **Web Audio API** for procedural sound effects

## 🧩 Features
- **Descent System**: Track Depth in meters.
- **Visual Decay**: The room gets darker and more distorted the deeper you go.
- **Thematic Anomalies**: Eyes in the darkness, blood on the rug, and shifting shadows.
- **Dynamic Difficulty**: Stability timer scales down with depth.
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
