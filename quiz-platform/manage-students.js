const allowedStudents = [
    { id: "20261", name: "Niraj Singh Bhandari" },
    { id: "20262", name: "Nitesh Rawat" },
    { id: "20263", name: "Piyush Bisht" },
    { id: "20264", name: "Pankaj Bhatt" }
];

let history = JSON.parse(localStorage.getItem("quizHistory")) || [];

function loadStudents(data = allowedStudents) {
    let table = document.getElementById("studentTable");
    let count = document.getElementById("studentCount");

    count.innerText = allowedStudents.length;
    table.innerHTML = "";

    data.forEach(student => {
        let attempts = history.filter(item => item.studentId === student.id);
        let bestScore = 0;

        attempts.forEach(item => {
            let percentage = parseInt(item.percentage);

            if (percentage > bestScore) {
                bestScore = percentage;
            }
        });

        table.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.id}@gehuquiz.local</td>
                <td>BCA</td>
                <td><span class="active-status">Active</span></td>
                <td>${attempts.length} Attempts | Best: ${bestScore}%</td>
            </tr>
        `;
    });
}

function searchStudents() {
    let searchText = document.getElementById("searchStudent").value.toLowerCase();

    let filtered = allowedStudents.filter(student =>
        student.name.toLowerCase().includes(searchText) ||
        student.id.includes(searchText)
    );

    loadStudents(filtered);
}

loadStudents();