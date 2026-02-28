# ANOMALY_404 (Beneath the Surface)

**"Find the anomaly before your sanity runs out."**

ANOMALY_404 is a psychological horror descent game built for the "Beneath the Surface" hackathon. You are descending into a recursive simulation where each meter deeper marks a shift in reality. Identify the anomalies to stabilize your descent.

## 🕹️ How to Play
1. **The Objective**: You are 0 meters deep at the surface. Your goal is to descend as deep as possible.
2. **The First Loop**: The first room (0m) is your "anchor." It is always clean and contains no anomalies. Memorize the placement of:
   - The Clock (Position of hands)
   - The Rug (Color and rotation)
   - The Lamp (Color and stability)
   - The Furniture (Table and Chair placement)
   - The Window and Door
3. **The Descent**: Click the **DESCEND** button. You will move to 10m deep.
4. **Spot the Anomaly**: In every room after 0m, **ONE** thing might be different. It could be a color change, a missing object, or something appearing that wasn't there before.
5. **Report**: If you see an anomaly, **CLICK DIRECTLY ON IT**. 
   - **Correct**: You descend another 10m and your stability is restored.
   - **Incorrect**: You lose a Sync heart.
6. **Time Limit**: The "STABILITY" bar is your timer. If it runs out, your synchronization fails and you lose a heart.
7. **Game Over**: If you lose all 3 hearts, the simulation ends.

## ⌨️ Controls
- **WASD / Arrow Keys**: Move your character around the room.
- **Left Mouse Click**: Click on objects to report anomalies.
- **Space/Enter**: Can be used to interact with menus.

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
