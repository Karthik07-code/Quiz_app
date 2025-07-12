// 🔽 QUIZ DATA – Our questions, options, and answers (can be extended)
const quizdata = [
  {
    question: "Who created Javascript?",
    options: ["Brendan Eich", "James gosling"],
    answer: "Brendan Eich",
  },
  {
    question: "Who created Python?",
    options: ["James gun", "Guido van Rossum"],
    answer: "Guido van Rossum",
  },
];

// 🔽 DOM ELEMENTS – Getting HTML elements to interact with them in JS
const opt1 = document.getElementById("btn-1");
const opt2 = document.getElementById("btn-2");
const que = document.getElementById("question");
const result = document.getElementById("res");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

// 🔽 TRACKING CURRENT QUESTION – Starts at index 0 (first question)
let currentQuestionIndex = 0;

// To track score for correct answers
let score = 0;

// 🔽  Main Functional Logic – handle answer click
function handleclick(event) {
  const selected = event.target.textContent;
  const correct = quizdata[currentQuestionIndex].answer;

  opt1.disabled = true;
  opt2.disabled = true;

  // Show result
  if (selected === correct) {
    result.textContent = "Correct ✅";
    result.style.color = "green";
    event.target.style.backgroundColor = "green";
    score++;
  } else {
    result.textContent = "Wrong ❌";
    result.style.color = "red";
    event.target.style.backgroundColor = "red";
  }

  // Show the next button
  nextBtn.style.display = "inline-block";
}

// 🔽 ADD CLICK EVENTS TO BOTH OPTION BUTTONS
opt1.addEventListener("click", handleclick);
opt2.addEventListener("click", handleclick);

// 🔽 LOADS A QUESTION AND PREPARES THE UI
function loadQuestion() {
  const currentData = quizdata[currentQuestionIndex];
  que.textContent = currentData.question;
  opt1.textContent = currentData.options[0];
  opt2.textContent = currentData.options[1];

  opt1.disabled = false;
  opt2.disabled = false;
  opt1.style.backgroundColor = "";
  opt2.style.backgroundColor = "";
  result.textContent = "";
  result.style.color = "";
  nextBtn.style.display = "none";
}

// 🔽 NEXT BUTTON CLICK – Loads next question or finishes quiz
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizdata.length) {
    loadQuestion(); // Load next question
  } else {
    // Quiz finished
    que.textContent = "Quiz Completed! 🎉";
    result.textContent = `Total score ${score}/${quizdata.length}`;
    result.style.color = "black";
    nextBtn.style.display = "none";
    opt1.style.display = "none";
    opt2.style.display = "none";
    restartBtn.style.display = "inline-block";
  }
});

// 🔽 INITIAL LOAD – Load the first question when app starts
if (currentQuestionIndex < quizdata.length) {
  loadQuestion();
}

// Restart
restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;

  opt1.style.display = "inline-block";
  opt2.style.display = "inline-block";

  restartBtn.style.display = "none";
  loadQuestion();
});

const toggleBtn = document.getElementById("dark-mode-toggle");
const toggleSound = document.getElementById("toggle-sound");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  toggleSound.currentTime = 0;
  toggleSound.play();

  const isDark = document.body.classList.contains("dark-mode");

  // Change icon/text based on screen size
  if (window.innerWidth <= 500) {
    toggleBtn.innerHTML = isDark ? "☀️" : "🌙";
  } else {
    toggleBtn.innerHTML = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  }
});
