const button = document.getElementById("button");
const scoreEl = document.getElementById("score");
const cpsEl = document.getElementById("cps");
const upgrades = document.querySelectorAll(".upgrade");
const resetBtn = document.getElementById("reset");

let score = 0;
let perClick = 1;
let clicks = 0;

// LOAD SAVE
const save = JSON.parse(localStorage.getItem("press-to-win"));
if (save) {
  score = save.score;
  perClick = save.perClick;
}

scoreEl.textContent = score;

// CLICK
button.addEventListener("click", () => {
  score += perClick;
  clicks++;
  scoreEl.textContent = score;
  updateGlow();
  saveGame();
});

// CPS
setInterval(() => {
  cpsEl.textContent = `CPS: ${clicks}`;
  clicks = 0;
}, 1000);

// UPGRADES
upgrades.forEach(btn => {
  btn.addEventListener("click", () => {
    const cost = Number(btn.dataset.cost);
    const add = Number(btn.dataset.add);

    if (score >= cost) {
      score -= cost;
      perClick += add;

      // price scaling
      btn.dataset.cost = Math.floor(cost * 1.6);
      btn.textContent = `+${add} / click (${btn.dataset.cost})`;

      scoreEl.textContent = score;
      saveGame();
    }
  });
});

// RESET
resetBtn.addEventListener("click", () => {
  if (!confirm("Reset everything?")) return;
  score = 0;
  perClick = 1;
  scoreEl.textContent = 0;
  saveGame();
  location.reload();
});

// SAVE
function saveGame() {
  localStorage.setItem(
    "press-to-win",
    JSON.stringify({ score, perClick })
  );
}

// GLOW INTENSITY
function updateGlow() {
  const glow = Math.min(60, 20 + perClick * 2);
  button.style.boxShadow = `
    0 0 ${glow}px rgba(255,0,0,0.7),
    0 0 ${glow * 1.6}px rgba(255,0,0,0.4)
  `;
}