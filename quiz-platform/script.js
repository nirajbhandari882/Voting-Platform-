let questions = JSON.parse(localStorage.getItem("questions")) || [];

let programming = questions.filter(q => q.category === "Programming").length;
let aptitude = questions.filter(q => q.category === "Aptitude").length;
let gk = questions.filter(q => q.category === "General Knowledge").length;
let current = questions.filter(q => q.category === "Current Affairs").length;

if (document.getElementById("homeProgrammingCount")) {
    document.getElementById("homeProgrammingCount").innerText = programming;
}

if (document.getElementById("homeAptitudeCount")) {
    document.getElementById("homeAptitudeCount").innerText = aptitude;
}

if (document.getElementById("homeGKCount")) {
    document.getElementById("homeGKCount").innerText = gk;
}

if (document.getElementById("homeCurrentCount")) {
    document.getElementById("homeCurrentCount").innerText = current;
}