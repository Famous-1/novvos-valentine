const scoreValue = document.getElementById("scoreValue");
const questions = Array.from(document.querySelectorAll(".question-block"));

// Configuration for each question
const questionConfig = {
  q1: {
    correct: "B",
    handle(choice, feedbackEl) {
      if (choice === this.correct) {
        feedbackEl.textContent = "❤️ Correct!";
        feedbackEl.className =
          "feedback mt-4 text-center text-base font-semibold text-pink-600";
        return true;
      } else {
        feedbackEl.textContent = "Wrong answer.";
        feedbackEl.className =
          "feedback mt-4 text-center text-base font-semibold text-red-500";
        return false;
      }
    },
  },
  q2: {
    correct: "D",
    handle(choice, feedbackEl) {
      if (choice === this.correct) {
        feedbackEl.textContent = "❤️ Correct!";
        feedbackEl.className =
          "feedback mt-4 text-center text-base font-semibold text-pink-600";
        return true;
      } else {
        feedbackEl.textContent = "Wrong answer.";
        feedbackEl.className =
          "feedback mt-4 text-center text-base font-semibold text-red-500";
        return false;
      }
    },
  },
  q3: {
    // Any answer is accepted and gives a playful message
    handle(choice, feedbackEl) {
      const greetings = {
        A: "Ia orana from Bora Bora – gotcha.",
        B: "Konnichiwa from Japan – gotcha.",
        C: "Hello from London (Osapa) – gotcha.",
        D: "Hello from Singapore – gotcha.",
      };
      feedbackEl.textContent = greetings[choice] || "Gotcha.";
      feedbackEl.className =
        "feedback mt-4 text-center text-base font-semibold text-indigo-600";
      return true;
    },
  },
  q4: {
    correct: "B",
    handle(choice, feedbackEl) {
      if (choice === this.correct) {
        feedbackEl.textContent = "❤️ Correct!";
        feedbackEl.className =
          "feedback mt-4 text-center text-base font-semibold text-pink-600";
        return true;
      } else {
        showOverlay("😡 Kill you after the test.");
        feedbackEl.textContent = "";
        return false;
      }
    },
  },
};

let currentIndex = 0;
let score = 0;
const answeredQuestions = new Set();

function updateScore() {
  scoreValue.textContent = score;
}

function goToNextQuestion() {
  const current = questions[currentIndex];
  current.classList.add("hidden");
  currentIndex += 1;
  const next = questions[currentIndex];
  if (next) {
    next.classList.remove("hidden");
  }
}

function showOverlay(message) {
  const overlay = document.getElementById("overlay");
  const overlayContent = document.getElementById("overlayContent");
  overlayContent.textContent = message;
  overlay.classList.remove("pointer-events-none");
  overlay.style.opacity = "1";
  setTimeout(() => {
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.classList.add("pointer-events-none");
    }, 250);
  }, 2000);
}

// Answer buttons
document.querySelectorAll(".answer-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const button = e.currentTarget; // always the button, not inner span
    const section = button.closest("[data-question]");
    const qId = section.getAttribute("data-question");
    const choice = button.dataset.choice;
    const feedbackEl = section.querySelector(".feedback");
    const config = questionConfig[qId];

    if (!config || answeredQuestions.has(qId)) return;

    const isCorrect = config.handle(choice, feedbackEl);

    if (isCorrect) {
      score += 1;
      updateScore();
    }

    answeredQuestions.add(qId);

    setTimeout(() => {
      if (section.getAttribute("data-question") !== "final") {
        goToNextQuestion();
      }
    }, 800);
  });
});

// Final Valentine buttons
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    showOverlay("❤️ Of course you are my Valentine.");
  });
}

if (noBtn) {
  noBtn.addEventListener("click", () => {
    showOverlay(
      "❌ Invalid choice. System has detected you are already my Valentine."
    );
  });
}

