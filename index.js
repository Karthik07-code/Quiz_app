const quizdata = [
  {
    question: "Which HTML5 element is used to define navigation links?",
    options: ["<nav>", "<menu>", "<header>", "<links>"],
    answer: "<nav>",
  },
  {
    question: "What is the default position value in CSS?",
    options: ["absolute", "fixed", "relative", "static"],
    answer: "static",
  },
  {
    question: "Which JavaScript method is used to filter an array?",
    options: ["map()", "filter()", "reduce()", "sort()"],
    answer: "filter()",
  },
  {
    question: "Which tag is used to embed JavaScript code in an HTML file?",
    options: ["<style>", "<script>", "<code>", "<js>"],
    answer: "<script>",
  },
  {
    question: "In React, what hook is used to manage component state?",
    options: ["useRef", "useEffect", "useState", "useMemo"],
    answer: "useState",
  },
  {
    question: "What is the purpose of the `z-index` property in CSS?",
    options: [
      "To zoom in on an element",
      "To set the transparency",
      "To control stacking order",
      "To change font size",
    ],
    answer: "To control stacking order",
  },
  {
    question: "Which JavaScript keyword is used to create a constant variable?",
    options: ["let", "var", "const", "define"],
    answer: "const",
  },
  {
    question: "What will `typeof NaN` return in JavaScript?",
    options: ["undefined", "object", "number", "NaN"],
    answer: "number",
  },
  {
    question: "What does the 'this' keyword refer to in a JavaScript method?",
    options: [
      "The global object",
      "The DOM element",
      "The object that owns the method",
      "The window object",
    ],
    answer: "The object that owns the method",
  },
  {
    question: "Which CSS unit is relative to the root element?",
    options: ["em", "px", "rem", "%"],
    answer: "rem",
  },
];

const opt1 = document.getElementById("btn-1");
const opt2 = document.getElementById("btn-2");
const opt3 = document.getElementById("btn-3");
const opt4 = document.getElementById("btn-4");
const que = document.getElementById("question");
const result = document.getElementById("res");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const optionsContainer = document.getElementById("options-container");
const feedback = document.getElementById("feedback");
const timeDisplay = document.getElementById("time");
const crtSound = document.getElementById("correct-sound");

let currentQuestionIndex = 0;
let score = 0;
let time = 30;
let timerInterval;

function handleclick(event) {
  clearInterval(timerInterval);

  const selected = event.target.textContent
    .trim()
    .split(")")
    .slice(1)
    .join(")")
    .trim();
  const correct = quizdata[currentQuestionIndex].answer;
  opt1.disabled = true;
  opt2.disabled = true;
  opt3.disabled = true;
  opt4.disabled = true;

  if (selected === correct) {
    event.target.style.backgroundColor = "#17ff02ff";
    score++;
    crtSound.currentTime = 0;
    crtSound.play();
  } else {
    event.target.style.backgroundColor = "#ff0000ff";
  }
  nextBtn.style.display = "inline-block";
}

opt1.addEventListener("click", handleclick);
opt2.addEventListener("click", handleclick);
opt3.addEventListener("click", handleclick);
opt4.addEventListener("click", handleclick);

function loadQuestion() {
  const currentData = quizdata[currentQuestionIndex];
  que.textContent = `${currentQuestionIndex + 1}. ${currentData.question}`;
  opt1.textContent = `A) ${currentData.options[0]}`;
  opt2.textContent = `B) ${currentData.options[1]}`;
  opt3.textContent = `C) ${currentData.options[2]}`;
  opt4.textContent = `D) ${currentData.options[3]}`;

  opt1.disabled = false;
  opt2.disabled = false;
  opt3.disabled = false;
  opt4.disabled = false;

  opt1.style.backgroundColor = "";
  opt2.style.backgroundColor = "";
  opt3.style.backgroundColor = "";
  opt4.style.backgroundColor = "";

  result.textContent = "";
  result.style.color = "";
  nextBtn.style.display = "none";

  clearInterval(timerInterval);
  time = 30;
  timeDisplay.textContent = time;
  timerInterval = setInterval(() => {
    time--;
    timeDisplay.textContent = time;
    if (time === 0) {
      clearInterval(timerInterval);
      disableOptions();
      result.textContent = "⏰ Time's up!";
      result.style.color = "white";
      result.style.marginBottom = "15px";
      nextBtn.style.display = "inline-block";
    }
  }, 1000);
}

function disableOptions() {
  opt1.disabled = true;
  opt2.disabled = true;
  opt3.disabled = true;
  opt4.disabled = true;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

if (currentQuestionIndex < quizdata.length) {
  shuffleArray(quizdata);
  loadQuestion();
}

nextBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  currentQuestionIndex++;

  if (currentQuestionIndex < quizdata.length) {
    loadQuestion();
  } else {
    que.textContent = "Quiz Completed!";
    result.textContent = `Total score : ${score}/${quizdata.length}`;
    document.getElementById("timer").style.display = "none";

    clearInterval(timerInterval);
    const percentage = (score / quizdata.length) * 100;
    if (percentage >= 80) {
      launchConfetti(2500, 80, 6);
      feedback.textContent = "🔥 Excellent work! You're a pro!";
      feedback.className = "feedback success";
    } else if (percentage >= 60) {
      launchConfetti(1500, 50, 3);
      feedback.textContent = "👍 Good job! Keep practicing.";
      feedback.className = "feedback average";
    } else {
      feedback.textContent = "📘 Keep learning! You'll improve!";
      feedback.className = "feedback low";
    }

    feedback.style.display = "block";

    nextBtn.style.display = "none";
    opt1.style.display = "none";
    opt2.style.display = "none";
    opt3.style.display = "none";
    opt4.style.display = "none";
    restartBtn.style.display = "inline-block";
  }
});

restartBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  currentQuestionIndex = 0;
  score = 0;
  shuffleArray(quizdata);

  opt1.style.display = "inline-block";
  opt2.style.display = "inline-block";
  opt3.style.display = "inline-block";
  opt4.style.display = "inline-block";

  restartBtn.style.display = "none";
  feedback.style.display = "none";
  loadQuestion();
});

const toggleBtn = document.getElementById("dark-mode-toggle");
const toggleSound = document.getElementById("toggle-sound");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  toggleSound.currentTime = 0;
  toggleSound.play();

  const isDark = document.body.classList.contains("dark-mode");
  if (window.innerWidth <= 500) {
    toggleBtn.innerHTML = isDark ? "☀️" : "🌙";
  } else {
    toggleBtn.innerHTML = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  }
});

function launchConfetti(duration = 2000, spread = 60, particleCount = 5) {
  const end = Date.now() + duration;
  (function frame() {
    confetti({ particleCount, angle: 60, spread, origin: { x: 0 } });
    confetti({ particleCount, angle: 120, spread, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
