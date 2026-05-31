let historyData = JSON.parse(localStorage.getItem("quizHistory")) || [];
let table = document.getElementById("historyTable");

if (historyData.length === 0) {
    table.innerHTML = `
        <tr>
            <td colspan="5" class="empty">
                No quiz attempted yet.
            </td>
        </tr>
    `;
} else {
    historyData.reverse().forEach(item => {
        let statusClass = item.status.toLowerCase();

        table.innerHTML += `
            <tr>
                <td>${item.quizName}</td>
                <td>${item.date}</td>
                <td>${item.score}</td>
                <td>${item.percentage}</td>
                <td><span class="${statusClass}">${item.status}</span></td>
            </tr>
        `;
    });
}