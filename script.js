const playerNames = [
    "Dani", "Hani", "Hamza", "Asad", "AB Brand", "Abdullah", "Bilal", 
    "GS Ghughu", "Uzair", "Mateen", "Asif", "Ali"
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const grid = document.getElementById("grid");
const roundDisplay = document.getElementById("round");
const levelDisplay = document.getElementById("level");

let round = 1;
let level = 1;
let maxLevels = 100;
let nextRoundAt = 16;
let currentWinner = "";
let boxMap = {};  // Map to store key-letter mapping

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function generateBoxes() {
    grid.innerHTML = "";
    let shuffledNames = shuffle([...playerNames]);
    let shuffledLetters = shuffle([...alphabet]).slice(0, shuffledNames.length);

    currentWinner = shuffledNames[Math.floor(Math.random() * shuffledNames.length)];
    boxMap = {};  // Reset map

    shuffledNames.forEach((name, index) => {
        const letter = shuffledLetters[index];
        const box = document.createElement("div");
        box.classList.add("box");
        box.dataset.name = name;
        box.dataset.letter = letter;
        box.innerHTML = `<span>${letter}</span>`;
        box.onclick = () => revealBox(box);
        grid.appendChild(box);
        boxMap[letter] = box;  // Store reference in map
    });
}

function revealBox(box) {
    const name = box.dataset.name;
    if (name === currentWinner) {
        box.innerHTML = `<span>${name}</span><br><span class="small-text">You Win!</span>`;
        box.classList.add("winner");
    } else {
        box.innerHTML = `<span>${name}</span><br><span class="small-text">Bye Bye</span>`;
        box.classList.add("loser");
    }
}

// Keyboard event listener to open box by letter
document.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase();
    if (boxMap[key]) {
        revealBox(boxMap[key]);
    }
});

document.getElementById("resetGame").onclick = () => {
    level++;
    if (level > maxLevels) {
        round++;
        level = 1;
    }
    if (level % nextRoundAt === 0) {
        round++;
    }
    roundDisplay.textContent = round;
    levelDisplay.textContent = level;
    generateBoxes();
};

document.getElementById("resetRound").onclick = () => {
    round++;
    level = 1;
    roundDisplay.textContent = round;
    levelDisplay.textContent = level;
    generateBoxes();
};

generateBoxes();
