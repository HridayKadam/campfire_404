/**
 * ANOMALY_404
 * A psychological horror looping game.
 */

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = 800;
        this.height = 600;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.state = 'menu'; // menu, playing, gameover
        this.loopCount = 1;
        this.sanity = 3;
        this.timer = 30;
        this.lastTime = 0;
        this.timerCounter = 0;

        this.keys = {};
        this.initEventListeners();

        this.room = new Room(this);
        this.player = new Player(this);
        this.anomalyManager = new AnomalyManager(this);
        this.audio = new AudioManager();

        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);
    }

    initEventListeners() {
        window.addEventListener('keydown', e => this.keys[e.code] = true);
        window.addEventListener('keyup', e => this.keys[e.code] = false);

        document.getElementById('start-btn').onclick = () => this.startGame();
        document.getElementById('restart-btn').onclick = () => this.startGame(true);
        document.getElementById('instr-btn').onclick = () => this.toggleModal(true);
        document.getElementById('close-modal').onclick = () => this.toggleModal(false);

        this.canvas.addEventListener('mousedown', e => this.handleClick(e));
    }

    startGame(isRestart = false) {
        if (isRestart) {
            this.loopCount = 1;
            this.sanity = 3;
        }
        if (this.loopCount === 1) this.audio.playAmbient();

        this.state = 'playing';
        this.timer = 30 - Math.floor(this.loopCount / 3) * 2;
        if (this.timer < 10) this.timer = 10;

        this.anomalyManager.generateAnomaly();
        this.player.reset();

        document.getElementById('menu-overlay').classList.add('hidden');
        document.getElementById('game-over').classList.add('hidden');
        document.getElementById('hud').classList.remove('hidden');
        this.updateHUD();
    }

    toggleModal(show) {
        document.getElementById('modal').classList.toggle('hidden', !show);
    }

    handleClick(e) {
        if (this.state !== 'playing') return;

        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const success = this.anomalyManager.checkClick(mouseX, mouseY);
        if (success) {
            this.audio.playSuccess();
            this.nextLoop();
        } else {
            this.audio.playFail();
            this.loseSanity();
        }
    }

    nextLoop() {
        this.loopCount++;
        this.startGame();
    }

    loseSanity() {
        this.sanity--;
        this.updateHUD();
        this.triggerFlicker();
        if (this.sanity <= 0) {
            this.gameOver();
        }
    }

    gameOver() {
        this.state = 'gameover';
        document.getElementById('final-loops').innerText = this.loopCount - 1;
        document.getElementById('game-over').classList.remove('hidden');
        document.getElementById('hud').classList.add('hidden');
    }

    triggerFlicker() {
        this.canvas.classList.add('flicker');
        setTimeout(() => this.canvas.classList.remove('flicker'), 500);
    }

    updateHUD() {
        document.getElementById('timer-val').innerText = Math.ceil(this.timer);
        document.getElementById('loop-val').innerText = this.loopCount;
        document.getElementById('sanity-vals').innerText = '❤️'.repeat(this.sanity);
    }

    loop(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        if (this.state === 'playing') {
            this.update(deltaTime);
        }
        this.draw();

        requestAnimationFrame(this.loop);
    }

    update(deltaTime) {
        this.player.update(deltaTime);

        // Random flicker
        if (Math.random() > 0.995) {
            this.triggerFlicker();
        }

        // Timer
        this.timer -= deltaTime / 1000;
        if (this.timer <= 0) {
            this.loseSanity();
            this.nextLoop(); // New loop even on fail? Or just reset? Let's say next loop.
        }
        this.updateHUD();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        if (this.state === 'menu') {
            // Draw something subtle in menu?
            this.room.draw();
        } else {
            this.room.draw();
            this.player.draw();
        }
    }
}

class Player {
    constructor(game) {
        this.game = game;
        this.size = 20;
        this.reset();
        this.speed = 0.2;
    }

    reset() {
        this.x = this.game.width / 2;
        this.y = this.game.height / 2;
    }

    update(deltaTime) {
        let dx = 0;
        let dy = 0;

        if (this.game.keys['KeyW'] || this.game.keys['ArrowUp']) dy -= 1;
        if (this.game.keys['KeyS'] || this.game.keys['ArrowDown']) dy += 1;
        if (this.game.keys['KeyA'] || this.game.keys['ArrowLeft']) dx -= 1;
        if (this.game.keys['KeyD'] || this.game.keys['ArrowRight']) dx += 1;

        if (dx !== 0 && dy !== 0) {
            const mag = Math.sqrt(dx * dx + dy * dy);
            dx /= mag;
            dy /= mag;
        }

        const nextX = this.x + dx * this.speed * deltaTime;
        const nextY = this.y + dy * this.speed * deltaTime;

        // Collision with room boundaries (simple)
        const margin = 50;
        if (nextX > margin && nextX < this.game.width - margin) this.x = nextX;
        if (nextY > margin && nextY < this.game.height - margin) this.y = nextY;
    }

    draw() {
        const ctx = this.game.ctx;
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#fff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

class Room {
    constructor(game) {
        this.game = game;
        this.baseObjects = [
            { id: 'door', x: 350, y: 10, w: 100, h: 20, color: '#4a3728', type: 'rect' },
            { id: 'window', x: 100, y: 10, w: 80, h: 10, color: '#87ceeb', type: 'rect' },
            { id: 'table', x: 300, y: 250, w: 200, h: 120, color: '#5d4037', type: 'rect' },
            { id: 'chair', x: 370, y: 380, w: 60, h: 60, color: '#795548', type: 'rect' },
            { id: 'lamp', x: 650, y: 100, r: 25, color: '#ffd54f', type: 'circle' },
            { id: 'rug', x: 250, y: 450, w: 300, h: 100, color: '#b71c1c', type: 'rect' },
            { id: 'clock', x: 740, y: 300, r: 30, color: '#fff', type: 'circle' }
        ];
        this.objects = JSON.parse(JSON.stringify(this.baseObjects));
    }

    draw() {
        const ctx = this.game.ctx;
        // Background
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, this.game.width, this.game.height);

        // Floor texture
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 1;
        for (let i = 0; i < this.game.width; i += 40) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, this.game.height); ctx.stroke();
        }
        for (let i = 0; i < this.game.height; i += 40) {
            ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(this.game.width, i); ctx.stroke();
        }

        // Walls
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 20;
        ctx.strokeRect(10, 10, this.game.width - 20, this.game.height - 20);

        // Draw Objects
        this.objects.forEach(obj => {
            if (obj.hidden) return;

            ctx.save();
            ctx.fillStyle = obj.color;
            ctx.shadowBlur = obj.id === 'lamp' && !obj.flicker ? 20 : 0;
            ctx.shadowColor = obj.color;

            if (obj.id === 'lamp' && obj.flicker && Math.random() > 0.8) {
                ctx.globalAlpha = 0.3;
            }

            if (obj.type === 'rect') {
                if (obj.rotation) {
                    ctx.translate(obj.x + obj.w / 2, obj.y + obj.h / 2);
                    ctx.rotate(obj.rotation);
                    ctx.fillRect(-obj.w / 2, -obj.h / 2, obj.w, obj.h);
                } else {
                    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
                }
            } else if (obj.type === 'circle') {
                ctx.beginPath();
                ctx.arc(obj.x, obj.y, obj.r, 0, Math.PI * 2);
                ctx.fill();

                // Clock details
                if (obj.id === 'clock') {
                    ctx.strokeStyle = '#000';
                    ctx.lineWidth = 2;
                    // Hour hand
                    const hourAngle = obj.anomaly_time ? Math.PI : -Math.PI / 2;
                    ctx.beginPath();
                    ctx.moveTo(obj.x, obj.y);
                    ctx.lineTo(obj.x + Math.cos(hourAngle) * (obj.r - 10), obj.y + Math.sin(hourAngle) * (obj.r - 10));
                    ctx.stroke();
                    // Minute hand
                    ctx.beginPath();
                    ctx.moveTo(obj.x, obj.y);
                    ctx.lineTo(obj.x, obj.y - (obj.r - 5));
                    ctx.stroke();
                }
            }
            ctx.restore();
        });
    }

    reset() {
        this.objects = JSON.parse(JSON.stringify(this.baseObjects));
    }
}

class AnomalyManager {
    constructor(game) {
        this.game = game;
        this.currentAnomaly = null;
        this.anomalies = [
            { id: 'missing_chair', target: 'chair', effect: (obj) => obj.hidden = true },
            { id: 'extra_box', effect: (objs) => objs.push({ id: 'extra', x: 100, y: 400, w: 40, h: 40, color: '#444', type: 'rect' }) },
            { id: 'wrong_clock', target: 'clock', effect: (obj) => obj.anomaly_time = true },
            { id: 'red_lamp', target: 'lamp', effect: (obj) => obj.color = '#ff0000' },
            { id: 'flipped_table', target: 'table', effect: (obj) => { obj.w = 120; obj.h = 200; obj.x = 340; obj.y = 200; } },
            { id: 'rotated_rug', target: 'rug', effect: (obj) => obj.rotation = Math.PI / 4 },
            { id: 'flicker_lamp', target: 'lamp', effect: (obj) => obj.flicker = true },
            { id: 'blue_window', target: 'window', effect: (obj) => obj.color = '#0000ff' },
            { id: 'shifted_door', target: 'door', effect: (obj) => obj.x += 50 },
            { id: 'invisible_window', target: 'window', effect: (obj) => obj.hidden = true }
        ];
    }

    generateAnomaly() {
        this.game.room.reset();
        this.currentAnomaly = null;

        // 30% chance of NO anomaly in some games, but prompt says "ONE anomaly appears" 
        // to keep it simple, let's always have one except maybe loop 1 (the tutorial anchor)
        if (this.game.loopCount === 1) return;

        const randomIndex = Math.floor(Math.random() * this.anomalies.length);
        const anomaly = this.anomalies[randomIndex];
        this.currentAnomaly = anomaly;

        if (anomaly.target) {
            const obj = this.game.room.objects.find(o => o.id === anomaly.target);
            if (obj) anomaly.effect(obj);
        } else {
            anomaly.effect(this.game.room.objects);
        }
        console.log("Anomaly generated:", anomaly.id);
    }

    checkClick(mx, my) {
        if (!this.currentAnomaly) return false;

        // Check if clicked object is the target of the anomaly
        // Or if it's the extra object
        const clickedObj = this.getClickedObject(mx, my);

        if (this.currentAnomaly.target) {
            return clickedObj && clickedObj.id === this.currentAnomaly.target;
        } else if (this.currentAnomaly.id === 'extra_box') {
            return clickedObj && clickedObj.id === 'extra';
        }

        return false;
    }

    getClickedObject(mx, my) {
        // Reverse order to check top-most objects first
        for (let i = this.game.room.objects.length - 1; i >= 0; i--) {
            const obj = this.game.room.objects[i];
            if (obj.hidden) continue;

            if (obj.type === 'rect') {
                if (mx >= obj.x && mx <= obj.x + obj.w && my >= obj.y && my <= obj.y + obj.h) {
                    return obj;
                }
            } else if (obj.type === 'circle') {
                const dist = Math.sqrt((mx - obj.x) ** 2 + (my - obj.y) ** 2);
                if (dist <= obj.r) return obj;
            }
        }
        return null;
    }
}

class AudioManager {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }

    playTone(freq, type, duration, volume = 0.1) {
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playSuccess() {
        this.playTone(440, 'sine', 0.1);
        setTimeout(() => this.playTone(880, 'sine', 0.2), 100);
    }

    playFail() {
        this.playTone(110, 'sawtooth', 0.5, 0.2);
    }

    playAmbient() {
        // Simple low hum
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(60, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
    }
}

window.onload = () => new Game();
