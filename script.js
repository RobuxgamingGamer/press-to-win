const button = document.getElementById("button");
const scoreEl = document.getElementById("score");
const cpsEl = document.getElementById("cps");
const upgrades = document.querySelectorAll(".upgrade");

let score = 0;
let perClick = 1;
let clicks = 0;

button.addEventListener("click", () => {
  score += perClick;
  clicks++;
  scoreEl.textContent = score;
});

setInterval(() => {
  cpsEl.textContent = `CPS: ${clicks}`;
  clicks = 0;
}, 1000);

upgrades.forEach(btn => {
  btn.addEventListener("click", () => {
    const cost = Number(btn.dataset.cost);
    const add = Number(btn.dataset.add);

    if (score >= cost) {
      score -= cost;
      perClick += add;
      scoreEl.textContent = score;
    }
  });
});