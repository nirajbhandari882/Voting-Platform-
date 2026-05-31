let allQuestions = JSON.parse(localStorage.getItem("questions")) || [];
let selectedCategory = localStorage.getItem("selectedCategory");

let questions = [];

if (selectedCategory) {
    questions = allQuestions.filter(q => q.category === selectedCategory);
} else {
    questions = allQuestions;
}

if (questions.length === 0) {
    alert("No questions available in this category. Please ask admin to add questions.");
}

let currentQuestion = 0;
let selectedAnswers = new Array(questions.length).fill(null);

let quizMinutes = parseInt(localStorage.getItem("quizTime")) || 10;
let timeLeft = quizMinutes * 60;

let timerInterval;

function loadQuestion() {
    if (questions.length === 0) {
        document.getElementById("question-number").innerText = "No Questions";
        document.getElementById("question-text").innerText = "Admin has not added questions in this category.";
        document.getElementById("options-box").innerHTML = "";
        document.getElementById("question-nav").innerHTML = "";
        document.getElementById("timer").innerText = "0:00";
        return;
    }

    document.getElementById("question-number").innerText =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    document.getElementById("question-text").innerText =
        questions[currentQuestion].question;

    const optionsBox = document.getElementById("options-box");
    optionsBox.innerHTML = "";

    const options = [
        questions[currentQuestion].option1,
        questions[currentQuestion].option2,
        questions[currentQuestion].option3,
        questions[currentQuestion].option4
    ];

    options.forEach(option => {
        const optionDiv = document.createElement("div");
        optionDiv.className = "option";
        optionDiv.innerText = option;

        if (selectedAnswers[currentQuestion] === option) {
            optionDiv.classList.add("selected");
        }

        optionDiv.addEventListener("click", function () {
            selectedAnswers[currentQuestion] = option;
            loadQuestion();
        });

        optionsBox.appendChild(optionDiv);
    });

    createNavigator();
}

function createNavigator() {
    const nav = document.getElementById("question-nav");
    nav.innerHTML = "";

    questions.forEach((q, index) => {
        const btn = document.createElement("button");
        btn.className = "nav-btn";
        btn.innerText = index + 1;

        if (index === currentQuestion) {
            btn.classList.add("active");
        }

        if (selectedAnswers[index]) {
            btn.classList.add("answered");
        }

        btn.addEventListener("click", function () {
            currentQuestion = index;
            loadQuestion();
        });

        nav.appendChild(btn);
    });
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function submitQuiz() {
    if (questions.length === 0) {
        alert("No quiz available.");
        return;
    }

    let student = JSON.parse(sessionStorage.getItem("loggedInStudent"));

    if (!student) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    let score = 0;

    questions.forEach((q, index) => {
        if (selectedAnswers[index] === q[q.correctAnswer]) {
            score++;
        }
    });

    let total = questions.length;
    let percentage = Math.round((score / total) * 100);

    localStorage.setItem("score", score);
    localStorage.setItem("total", total);

    let history = JSON.parse(localStorage.getItem("quizHistory")) || [];

    history.push({
        studentId: student.id,
        studentName: student.name,
        quizName: selectedCategory ? selectedCategory + " Quiz" : "Quiz",
        category: selectedCategory || "All",
        date: new Date().toLocaleDateString(),
        score: `${score}/${total}`,
        percentage: `${percentage}%`,
        status: percentage >= 80 ? "Excellent" : percentage >= 60 ? "Good" : "Average"
    });

    localStorage.setItem("quizHistory", JSON.stringify(history));

    clearInterval(timerInterval);
    window.location.href = "result.html";
}

function startTimer() {
    if (questions.length === 0) {
        return;
    }

    const timer = document.getElementById("timer");

    timerInterval = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        timer.innerText = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

        if (timeLeft <= 0) {
            submitQuiz();
        }

        timeLeft--;
    }, 1000);
}

loadQuestion();
startTimer();