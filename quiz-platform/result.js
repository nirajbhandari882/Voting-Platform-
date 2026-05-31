let score = parseInt(localStorage.getItem("score")) || 0;
let total = parseInt(localStorage.getItem("total")) || 0;

let wrong = total - score;
let percentage = total > 0 ? Math.round((score / total) * 100) : 0;

let status = "";

if (percentage >= 80) {
    status = "Excellent";
} else if (percentage >= 60) {
    status = "Good";
} else {
    status = "Average";
}

document.getElementById("scoreText").innerText = `${score}/${total}`;
document.getElementById("percentageText").innerText = `${percentage}%`;
document.getElementById("correctText").innerText = score;
document.getElementById("wrongText").innerText = wrong;
document.getElementById("totalText").innerText = total;

let statusText = document.getElementById("statusText");
statusText.innerText = status;
statusText.classList.add(status.toLowerCase());