const allowedStudents = [
    { id: "20261", name: "Niraj Singh Bhandari" },
    { id: "20262", name: "Nitesh Rawat" },
    { id: "20263", name: "Piyush Bisht" },
    { id: "20264", name: "Pankaj Bhatt" }
];

let historyData = JSON.parse(localStorage.getItem("quizHistory")) || [];

let leaderboard = allowedStudents.map(student => {
    let attempts = historyData.filter(item => item.studentId === student.id);

    let bestScore = 0;
    let totalScore = 0;

    attempts.forEach(item => {
        let percent = parseInt(item.percentage);
        totalScore += percent;

        if (percent > bestScore) {
            bestScore = percent;
        }
    });

    let averageScore = attempts.length > 0
        ? Math.round(totalScore / attempts.length)
        : 0;

    return {
        id: student.id,
        name: student.name,
        attempts: attempts.length,
        bestScore,
        averageScore
    };
});

leaderboard.sort((a, b) => {
    if (b.bestScore !== a.bestScore) {
        return b.bestScore - a.bestScore;
    }

    return b.averageScore - a.averageScore;
});

let topThree = document.getElementById("topThree");
let table = document.getElementById("leaderboardTable");

topThree.innerHTML = "";
table.innerHTML = "";

let medals = ["🥇", "🥈", "🥉"];
let classes = ["first", "second", "third"];

leaderboard.slice(0, 3).forEach((student, index) => {
    topThree.innerHTML += `
        <div class="winner ${classes[index]}">
            <div class="rank">${medals[index]}</div>
            <h2>${student.name.split(" ")[0]}</h2>
            <p>${student.bestScore}%</p>
        </div>
    `;
});

leaderboard.forEach((student, index) => {
    let status = "Not Attempted";
    let statusClass = "average";

    if (student.bestScore >= 80) {
        status = "Excellent";
        statusClass = "excellent";
    } else if (student.bestScore >= 60) {
        status = "Good";
        statusClass = "good";
    } else if (student.bestScore > 0) {
        status = "Average";
        statusClass = "average";
    }

    table.innerHTML += `
        <tr>
            <td>#${index + 1}</td>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.attempts}</td>
            <td>${student.bestScore}%</td>
            <td><span class="${statusClass}">${status}</span></td>
        </tr>
    `;
});