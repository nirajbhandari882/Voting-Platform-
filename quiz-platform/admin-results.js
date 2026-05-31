let results = JSON.parse(localStorage.getItem("quizHistory")) || [];

function loadResults(data = results) {
    let table = document.getElementById("resultsTable");
    let count = document.getElementById("attemptCount");

    count.innerText = results.length;
    table.innerHTML = "";

    if (data.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="7" class="empty">No quiz results found.</td>
            </tr>
        `;
        return;
    }

    data.slice().reverse().forEach((r, index) => {
        let statusClass = r.status.toLowerCase();

        table.innerHTML += `
            <tr>
                <td>R${String(index + 1).padStart(3, "0")}</td>
                <td>${r.studentName}</td>
                <td>${r.quizName}</td>
                <td>${r.date}</td>
                <td>${r.score}</td>
                <td>${r.percentage}</td>
                <td><span class="${statusClass}">${r.status}</span></td>
            </tr>
        `;
    });
}

function searchResults() {
    let searchText = document.getElementById("searchResult").value.toLowerCase();

    let filtered = results.filter(r =>
        r.studentName.toLowerCase().includes(searchText) ||
        r.quizName.toLowerCase().includes(searchText) ||
        r.status.toLowerCase().includes(searchText)
    );

    loadResults(filtered);
}

loadResults();