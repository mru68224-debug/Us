// --- CONFIG ---
const targetDate = new Date("Feb 18, 2026 00:00:00").getTime();
const targetScore = 5; // Points needed to win
let score = 0;
let gameActive = false;

// --- ELEMENTS ---
const overlay = document.getElementById('start-overlay');
const mainContent = document.getElementById('main-content');
const music = document.getElementById('bg-music');
const startBtn = document.getElementById('start-btn');
const bgContainer = document.getElementById('bg-hearts');

// --- 1. START LOGIC ---
startBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    mainContent.classList.add('active');
    
    // Try playing music
    music.play().catch(e => console.log("Autoplay prevented"));
    
    startBackgroundHearts();
    startCountdown();
    startGame();
});

// --- 2. COUNTDOWN ---
function startCountdown() {
    function update() {
        const now = new Date().getTime();
        const gap = targetDate - now;

        const d = Math.floor(gap / (1000 * 60 * 60 * 24));
        const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((gap % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = d;
        document.getElementById('hours').innerText = h < 10 ? '0'+h : h;
        document.getElementById('mins').innerText = m < 10 ? '0'+m : m;
        document.getElementById('secs').innerText = s < 10 ? '0'+s : s;
    }
    setInterval(update, 1000);
    update();
}

// --- 3. AMBIENT BACKGROUND HEARTS ---
function startBackgroundHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart-bg');
        heart.innerHTML = '❤';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's'; // 5-10s
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px'; // Random sizes
        
        bgContainer.appendChild(heart);

        // Remove after animation to keep DOM clean
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 500); // Create a new heart every 0.5s
}

// --- 4. THE GAME ---
const gameArea = document.getElementById('game-area');

function startGame() {
    gameActive = true;
    spawnGameHeart();
}

function spawnGameHeart() {
    if (!gameActive) return;

    const heart = document.createElement('div');
    heart.classList.add('heart-target');
    heart.innerHTML = '💖';

    // Random horizontal position
    const x = Math.random() * (gameArea.offsetWidth - 50);
    heart.style.left = x + 'px';
    heart.style.bottom = '0px'; // Start from bottom

    // Click Logic
    heart.addEventListener('click', () => {
        if (!gameActive) return;
        score++;
        document.getElementById('score').innerText = score;
        
        // Visual feedback
        heart.style.transform = "scale(1.5)";
        heart.style.opacity = "0";
        
        setTimeout(() => heart.remove(), 100);

        // Win Condition
        if (score >= targetScore) {
            gameActive = false;
            winGame();
        }
    });

    gameArea.appendChild(heart);

    // Auto-remove if missed (after animation ends)
    heart.onanimationend = () => {
        heart.remove();
    };

    // Spawn next heart after random delay
    setTimeout(spawnGameHeart, Math.random() * 1000 + 500); 
}

function winGame() {
    // Fade out content
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'scale(0.9)';
    mainContent.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        window.location.href = "secret.html";
    }, 600);
}