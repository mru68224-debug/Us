// --- CONFIGURATION ---
const TARGET_DATE = new Date("Feb 18, 2026 00:00:00").getTime();
const WIN_REDIRECT = "secret.html"; // The page to go to after winning

// --- ELEMENTS ---
const overlay = document.getElementById('overlay');
const app = document.getElementById('app');
const audio = document.getElementById('bgMusic');
const grid = document.getElementById('gameGrid');

// --- GAME STATE ---
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let canFlip = true;

// --- 1. INITIALIZATION ---
overlay.addEventListener('click', startExperience);

function startExperience() {
    overlay.classList.add('hidden');
    app.classList.add('active');
    
    // Start Music
    audio.play().catch(e => console.log("Audio play failed (user interaction required)"));
    
    // Start Logic
    initCountdown();
    initGame();
}

// --- 2. COUNTDOWN TIMER ---
function initCountdown() {
    function update() {
        const now = new Date().getTime();
        const dist = TARGET_DATE - now;

        const d = Math.floor(dist / (1000 * 60 * 60 * 24));
        const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((dist % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = d;
        document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
        document.getElementById('mins').innerText = m < 10 ? '0' + m : m;
        document.getElementById('secs').innerText = s < 10 ? '0' + s : s;
    }
    setInterval(update, 1000);
    update();
}

// --- 3. MEMORY GAME LOGIC ---
const emojis = ['💖', '🌸', '🎁']; // The 3 pairs she needs to match

function initGame() {
    // Create pairs [A, A, B, B, C, C]
    let cardValues = [...emojis, ...emojis];
    
    // Shuffle Array
    cardValues.sort(() => Math.random() - 0.5);

    // Generate HTML
    grid.innerHTML = '';
    cardValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.value = value;
        card.dataset.index = index;
        
        card.innerHTML = `
            <div class="card-face card-back">❓</div>
            <div class="card-face card-front">${value}</div>
        `;
        
        card.addEventListener('click', () => flipCard(card));
        grid.appendChild(card);
        cards.push(card);
    });
}

function flipCard(card) {
    // Logic checks
    if (!canFlip) return;
    if (card.classList.contains('flipped')) return;
    if (flippedCards.length >= 2) return;

    // Flip it
    card.classList.add('flipped');
    flippedCards.push(card);

    // Check for match
    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    canFlip = false; // Prevent spam clicking
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        // MATCH!
        matchedPairs++;
        flippedCards = [];
        canFlip = true;

        // Check Win
        if (matchedPairs === emojis.length) {
            setTimeout(winGame, 500);
        }
    } else {
        // NO MATCH - Flip back
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

// --- 4. WIN STATE & CONFETTI ---
function winGame() {
    // 1. Explosion of Confetti
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }

    // 2. Redirect after a nice pause
    setTimeout(() => {
        window.location.href = WIN_REDIRECT;
    }, 3000);
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    
    // Random properties
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    
    document.body.appendChild(confetti);

    // Clean up after animation
    setTimeout(() => confetti.remove(), 5000);
}
