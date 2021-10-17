const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MSX_HIGH_SCORE = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

const saveHighScore = (event) => {
  event.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  saveScoreBtn.innerText = "Saved";
};
