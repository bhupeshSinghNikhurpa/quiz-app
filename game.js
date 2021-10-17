const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const loader = document.querySelector("#loader");
const game = document.querySelector("#game");

// constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

// fetch("questions.json")
//   .then((response) => {
//     return response.json();
//   })
//   .then((loadedQuestions) => {
//     questions = loadedQuestions;
//     startGame();
//   })
//   .catch((error) => {
//     console.error(error);
//   });

fetch(
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
  .then((response) => {
    return response.json();
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formatedQuestion = {
        question: loadedQuestion.question,
      };

      const answerChoics = [...loadedQuestion.incorrect_answers];
      formatedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoics.splice(
        formatedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoics.forEach((choice, index) => {
        formatedQuestion[`choice${index + 1}`] = choice;
      });

      return formatedQuestion;
    });

    startGame();
  });

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    // to to end page
    return window.location.assign("./end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  // update progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  let questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];

  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion[`choice${number}`];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (event) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedAnswer = event.target.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") incrementScore(CORRECT_BONUS);

    event.target.parentElement.classList.add(classToApply);

    setTimeout(() => {
      event.target.parentElement.classList.remove(classToApply);
    }, 800);

    getNewQuestion();
  });
});

const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
