const allowedStudents = [
    { id: "20261", name: "Niraj Singh Bhandari" },
    { id: "20262", name: "Nitesh Rawat" },
    { id: "20263", name: "Piyush Bisht" },
    { id: "20264", name: "Pankaj Bhatt" }
];

let questions = JSON.parse(localStorage.getItem("questions")) || [];
let history = JSON.parse(localStorage.getItem("quizHistory")) || [];

document.getElementById("totalQuestions").innerText = questions.length;
document.getElementById("totalStudents").innerText = allowedStudents.length;
document.getElementById("totalAttempts").innerText = history.length;

let average = 0;

if (history.length > 0) {
    let totalPercentage = history.reduce((sum, item) => {
        return sum + parseInt(item.percentage);
    }, 0);

    average = Math.round(totalPercentage / history.length);
}

document.getElementById("averageScore").innerText = average + "%";

let recentTable = document.getElementById("recentResults");

if (history.length === 0) {
    recentTable.innerHTML = `
        <tr>
            <td colspan="4" class="empty">No quiz results yet.</td>
        </tr>
    `;
} else {
    history.slice(-5).reverse().forEach(item => {
        let statusClass =
            item.status === "Excellent" ? "success" :
            item.status === "Good" ? "good" :
            "average";

        recentTable.innerHTML += `
            <tr>
                <td>${item.studentName}</td>
                <td>${item.quizName}</td>
                <td>${item.percentage}</td>
                <td><span class="${statusClass}">${item.status}</span></td>
            </tr>
        `;
    });
}

function resetResults() {
    let confirmReset = confirm("Are you sure you want to delete all quiz results?");

    if (confirmReset) {
        localStorage.removeItem("quizHistory");
        alert("All quiz results have been deleted.");
        location.reload();
    }
}

function resetLeaderboard() {
    let confirmReset = confirm("Are you sure you want to reset the leaderboard?");

    if (confirmReset) {
        localStorage.removeItem("quizHistory");
        alert("Leaderboard has been reset.");
        location.reload();
    }
}

function resetAllData() {
    let confirmReset = confirm("WARNING: This will delete all questions, results, quiz time and category data. Continue?");

    if (confirmReset) {
        localStorage.removeItem("quizHistory");
        localStorage.removeItem("questions");
        localStorage.removeItem("quizTime");
        localStorage.removeItem("selectedCategory");
        alert("Entire system data has been reset.");
        location.reload();
    }
}