// 🔽 QUIZ DATA – Our questions, options, and answers (can be extended)
const quizdata = [

  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: "font-size",
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Management",
      "Digital Ordinance Model",
      "Desktop Oriented Mode",
    ],
    answer: "Document Object Model",
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<link>", "<a>", "<href>", "<hyper>"],
    answer: "<a>",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Computer Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which JavaScript method is used to select an element by ID?",
    options: [
      "getElementById()",
      "querySelectorAll()",
      "getElementsByClass()",
      "selectById()",
    ],
    answer: "getElementById()",
  },
  {
    question: "Which HTML tag is used for inserting an image?",
    options: ["<img>", "<image>", "<pic>", "<src>"],
    answer: "<img>",
  },
  {
    question: "In JavaScript, which keyword is used to declare a variable?",
    options: ["v", "let", "varies", "int"],
    answer: "let",
  },
  {
    question: "Which CSS property is used to change the background color?",
    options: ["color", "bgcolor", "background-color", "background"],
    answer: "background-color",
  },
  {
    question: "What does React use to manage UI rendering efficiently?",
    options: ["Shadow DOM", "Virtual DOM", "Inline DOM", "JSON DOM"],
    answer: "Virtual DOM",
  },
];

// 🔽 DOM ELEMENTS – Getting HTML elements to interact with them in JS
const opt1 = document.getElementById("btn-1");
const opt2 = document.getElementById("btn-2");
const opt3 = document.getElementById("btn-3");
const opt4 = document.getElementById("btn-4");
const que = document.getElementById("question");
const result = document.getElementById("res");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const optionsContainer = document.getElementById("options-container");

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
  opt3.disabled = true;
  opt4.disabled = true;

  // Show result
  if (selected === correct) {
    result.textContent = "Correct ✅";
    result.style.color = "#111;";
    event.target.style.backgroundColor = "#17ff02ff";
    score++;
  } else {
    result.textContent = "Wrong ❌";
    result.style.color = "#111;";
    event.target.style.backgroundColor = "#ff0000ff";
  }

  // Show the next button
  nextBtn.style.display = "inline-block";
}

// 🔽 ADD CLICK EVENTS TO BOTH OPTION BUTTONS
opt1.addEventListener("click", handleclick);
opt2.addEventListener("click", handleclick);
opt3.addEventListener("click", handleclick);
opt4.addEventListener("click", handleclick);

// 🔽 LOADS A QUESTION AND PREPARES THE UI
function loadQuestion() {
  const currentData = quizdata[currentQuestionIndex];
  que.textContent = currentData.question;
  opt1.textContent = currentData.options[0];
  opt2.textContent = currentData.options[1];
  opt3.textContent = currentData.options[2];
  opt4.textContent = currentData.options[3];

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
}

// 🔽 NEXT BUTTON CLICK – Loads next question or finishes quiz
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizdata.length) {
    loadQuestion(); // Load next question
  } else {
    que.textContent = "Quiz Completed! 🎉";
    result.textContent = `Total score ${score}/${quizdata.length}`;
    result.style.color = "black";
    nextBtn.style.display = "none";
    opt1.style.display = "none";
    opt2.style.display = "none";
    opt3.style.display = "none";
    opt4.style.display = "none";
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
  opt3.style.display = "inline-block";
  opt4.style.display = "inline-block";

  restartBtn.style.display = "none";
  loadQuestion();
});

// Dark Mode
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
