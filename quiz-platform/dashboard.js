let student = JSON.parse(sessionStorage.getItem("loggedInStudent"));

if (!student) {
    window.location.href = "login.html";
}

let questions = JSON.parse(localStorage.getItem("questions")) || [];
let history = JSON.parse(localStorage.getItem("quizHistory")) || [];

let firstName = student.name.split(" ")[0];

document.getElementById("welcomeText").innerText = `Welcome Back, ${firstName} 👋`;
document.getElementById("profileLetter").innerText = student.name.charAt(0).toUpperCase();

let studentHistory = history.filter(item => item.studentId === student.id);

document.getElementById("attemptedCount").innerText = studentHistory.length;

let bestScore = 0;

studentHistory.forEach(item => {
    let percentage = parseInt(item.percentage);
    if (percentage > bestScore) {
        bestScore = percentage;
    }
});

document.getElementById("bestScore").innerText = bestScore + "%";
document.getElementById("rankText").innerText = studentHistory.length > 0 ? "#1" : "--";
document.getElementById("streakText").innerText = studentHistory.length > 0 ? "1 Day" : "0 Days";

document.getElementById("programmingCount").innerText =
questions.filter(q => q.category === "Programming").length;

document.getElementById("aptitudeCount").innerText =
questions.filter(q => q.category === "Aptitude").length;

document.getElementById("gkCount").innerText =
questions.filter(q => q.category === "General Knowledge").length;

document.getElementById("currentCount").innerText =
questions.filter(q => q.category === "Current Affairs").length;

function startCategory(category) {
    localStorage.setItem("selectedCategory", category);
}

let recentBox = document.getElementById("recentActivityBox");

if (studentHistory.length === 0) {
    recentBox.innerHTML = `<p>No quiz attempted yet.</p>`;
} else {
    studentHistory.slice(-3).reverse().forEach(item => {
        recentBox.innerHTML += `
            <p>✅ ${item.quizName} <b>${item.percentage}</b></p>
        `;
    });
}