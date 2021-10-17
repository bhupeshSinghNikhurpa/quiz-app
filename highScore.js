const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const highScoreList = document.querySelector("#highScoreList");

highScoreList.innerHTML = highScores.map(
  (score) => `<li class="high-score"> ${score.name} - ${score.score}<li/>`
);
