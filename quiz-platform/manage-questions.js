let questions = JSON.parse(localStorage.getItem("questions")) || [];

const defaultQuestions = [
    // Programming
    { question:"What does HTML stand for?", option1:"Hyper Text Markup Language", option2:"High Text Machine Language", option3:"Home Tool Markup Language", option4:"Hyperlink Text Language", correctAnswer:"option1", category:"Programming" },
    { question:"Which language is used to style web pages?", option1:"HTML", option2:"CSS", option3:"Python", option4:"PHP", correctAnswer:"option2", category:"Programming" },
    { question:"Which keyword is used to declare a variable in JavaScript?", option1:"var", option2:"int", option3:"string", option4:"define", correctAnswer:"option1", category:"Programming" },
    { question:"Which symbol is used for comments in JavaScript?", option1:"//", option2:"##", option3:"<!-- -->", option4:"**", correctAnswer:"option1", category:"Programming" },
    { question:"Which tag is used to create a hyperlink in HTML?", option1:"<p>", option2:"<a>", option3:"<h1>", option4:"<link>", correctAnswer:"option2", category:"Programming" },

    // Aptitude
    { question:"What is 20% of 200?", option1:"20", option2:"30", option3:"40", option4:"50", correctAnswer:"option3", category:"Aptitude" },
    { question:"Find the next number: 2, 4, 8, 16, ?", option1:"20", option2:"24", option3:"30", option4:"32", correctAnswer:"option4", category:"Aptitude" },
    { question:"If 5 pens cost ₹50, what is the cost of 1 pen?", option1:"₹5", option2:"₹10", option3:"₹15", option4:"₹20", correctAnswer:"option2", category:"Aptitude" },
    { question:"A train covers 120 km in 2 hours. What is its speed?", option1:"40 km/h", option2:"50 km/h", option3:"60 km/h", option4:"80 km/h", correctAnswer:"option3", category:"Aptitude" },
    { question:"If A = 1, B = 2, then Z = ?", option1:"24", option2:"25", option3:"26", option4:"27", correctAnswer:"option3", category:"Aptitude" },

    // General Knowledge
    { question:"What is the capital of India?", option1:"Mumbai", option2:"New Delhi", option3:"Kolkata", option4:"Chennai", correctAnswer:"option2", category:"General Knowledge" },
    { question:"Who is known as the Father of the Nation in India?", option1:"Subhash Chandra Bose", option2:"Mahatma Gandhi", option3:"Bhagat Singh", option4:"Sardar Patel", correctAnswer:"option2", category:"General Knowledge" },
    { question:"Which is the largest planet in our solar system?", option1:"Earth", option2:"Mars", option3:"Jupiter", option4:"Venus", correctAnswer:"option3", category:"General Knowledge" },
    { question:"Which is the national animal of India?", option1:"Lion", option2:"Elephant", option3:"Tiger", option4:"Leopard", correctAnswer:"option3", category:"General Knowledge" },
    { question:"How many states are there in India?", option1:"26", option2:"27", option3:"28", option4:"29", correctAnswer:"option3", category:"General Knowledge" },

    // Current Affairs
    { question:"Which country hosted the G20 Summit 2023?", option1:"India", option2:"USA", option3:"Japan", option4:"France", correctAnswer:"option1", category:"Current Affairs" },
    { question:"Which Indian mission landed on the Moon in 2023?", option1:"Chandrayaan-1", option2:"Chandrayaan-2", option3:"Chandrayaan-3", option4:"Mangalyaan", correctAnswer:"option3", category:"Current Affairs" },
    { question:"Which city is known as the Silicon Valley of India?", option1:"Mumbai", option2:"Bengaluru", option3:"Delhi", option4:"Pune", correctAnswer:"option2", category:"Current Affairs" },
    { question:"Which organization conducts IPL in India?", option1:"ICC", option2:"BCCI", option3:"FIFA", option4:"IOA", correctAnswer:"option2", category:"Current Affairs" },
    { question:"Who is the current Prime Minister of India?", option1:"Amit Shah", option2:"Narendra Modi", option3:"Rahul Gandhi", option4:"Yogi Adityanath", correctAnswer:"option2", category:"Current Affairs" }
];

defaultQuestions.forEach(defaultQ => {
    let alreadyExists = questions.some(q => q.question === defaultQ.question);
    if (!alreadyExists) {
        questions.push(defaultQ);
    }
});

localStorage.setItem("questions", JSON.stringify(questions));

function saveQuizTime() {
    let time = document.getElementById("quizTime").value;

    if (!time || time <= 0) {
        alert("Please enter valid quiz time.");
        return;
    }

    localStorage.setItem("quizTime", time);
    document.getElementById("currentTime").innerText = time;
    document.getElementById("quizTime").value = "";

    alert("Quiz time updated successfully!");
}

function loadQuizTime() {
    let savedTime = localStorage.getItem("quizTime") || 10;
    document.getElementById("currentTime").innerText = savedTime;
}

function saveQuestion() {
    let editIndex = document.getElementById("editIndex").value;

    let question = document.getElementById("question").value.trim();
    let option1 = document.getElementById("option1").value.trim();
    let option2 = document.getElementById("option2").value.trim();
    let option3 = document.getElementById("option3").value.trim();
    let option4 = document.getElementById("option4").value.trim();
    let correctAnswer = document.getElementById("correctAnswer").value;
    let category = document.getElementById("category").value;

    if (!question || !option1 || !option2 || !option3 || !option4 || !correctAnswer || !category) {
        alert("Please fill all fields.");
        return;
    }

    let questionData = {
        question,
        option1,
        option2,
        option3,
        option4,
        correctAnswer,
        category
    };

    if (editIndex === "") {
        questions.push(questionData);
        alert("Question added successfully!");
    } else {
        questions[editIndex] = questionData;
        alert("Question updated successfully!");
    }

    localStorage.setItem("questions", JSON.stringify(questions));
    clearForm();
    loadQuestions();
}

function loadQuestions(data = questions) {
    let table = document.getElementById("questionTable");
    let count = document.getElementById("questionCount");

    count.innerText = questions.length;
    table.innerHTML = "";

    if (data.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="5" class="empty">No questions found.</td>
            </tr>
        `;
        return;
    }

    data.forEach((q, index) => {
        let realIndex = questions.indexOf(q);

        table.innerHTML += `
            <tr>
                <td>${realIndex + 1}</td>
                <td>${q.question}</td>
                <td>${q.category}</td>
                <td>${q[q.correctAnswer]}</td>
                <td>
                    <button class="edit" onclick="editQuestion(${realIndex})">Edit</button>
                    <button class="delete" onclick="deleteQuestion(${realIndex})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function editQuestion(index) {
    let q = questions[index];

    document.getElementById("editIndex").value = index;
    document.getElementById("question").value = q.question;
    document.getElementById("option1").value = q.option1;
    document.getElementById("option2").value = q.option2;
    document.getElementById("option3").value = q.option3;
    document.getElementById("option4").value = q.option4;
    document.getElementById("correctAnswer").value = q.correctAnswer;
    document.getElementById("category").value = q.category;

    document.getElementById("formTitle").innerText = "Edit Question";
    document.getElementById("saveBtn").innerText = "Update Question";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteQuestion(index) {
    if (confirm("Are you sure you want to delete this question?")) {
        questions.splice(index, 1);
        localStorage.setItem("questions", JSON.stringify(questions));
        loadQuestions();
        clearForm();
    }
}

function clearForm() {
    document.getElementById("editIndex").value = "";
    document.getElementById("question").value = "";
    document.getElementById("option1").value = "";
    document.getElementById("option2").value = "";
    document.getElementById("option3").value = "";
    document.getElementById("option4").value = "";
    document.getElementById("correctAnswer").value = "";
    document.getElementById("category").value = "";

    document.getElementById("formTitle").innerText = "Add New Question";
    document.getElementById("saveBtn").innerText = "Add Question";
}

function searchQuestions() {
    let searchText = document.getElementById("searchInput").value.toLowerCase();

    let filtered = questions.filter(q =>
        q.question.toLowerCase().includes(searchText) ||
        q.category.toLowerCase().includes(searchText)
    );

    loadQuestions(filtered);
}

loadQuizTime();
loadQuestions();