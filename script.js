const students = [
  { id: "202601", name: "Niraj Singh Bhandari" },
  { id: "202602", name: "Nitesh Singh Rawat" },
  { id: "202603", name: "Rahul Joshi" },
  { id: "202604", name: "Ananya Bisht" },
  { id: "202605", name: "Aman Verma" },
  { id: "202606", name: "Priya Pandey" },
  { id: "202607", name: "Deepak Kumar" },
  { id: "202608", name: "Sakshi Mehra" },
  { id: "202609", name: "Mohit Negi" },
  { id: "202610", name: "Riya Sharma" }
];

let candidates = JSON.parse(localStorage.getItem("candidates")) || [
  { id: 1, name: "Piyush Gupta", position: "Class Representative", votes: 0 },
  { id: 2, name: "Shruti Gumber", position: "Class Representative", votes: 0 },
  { id: 3, name: "Urmila Fulara", position: "Class Representative", votes: 0 },
  { id: 4, name: "Divyanshu Morya", position: "Class Representative", votes: 0 }
];

let electionStatus = localStorage.getItem("electionStatus") || "LIVE";
let notifications = JSON.parse(localStorage.getItem("notifications")) || [];

function saveData() {
  localStorage.setItem("candidates", JSON.stringify(candidates));
  localStorage.setItem("electionStatus", electionStatus);
  localStorage.setItem("notifications", JSON.stringify(notifications));
}

function getElectionStatus() {
  return localStorage.getItem("electionStatus") || "LIVE";
}

function studentLogin() {
  const name = document.getElementById("studentName").value.trim();
  const id = document.getElementById("studentId").value.trim();

  const student = students.find(
    s => s.id === id && s.name.toLowerCase() === name.toLowerCase()
  );

  if (!student) {
    alert("Invalid student name or unique ID.");
    return;
  }

  localStorage.setItem("currentStudent", JSON.stringify(student));

  const btn = document.querySelector(".login-card .primary-btn");
  btn.innerText = "Verifying...";
  btn.disabled = true;

  setTimeout(() => {
    window.location.href = "student.html";
  }, 900);
}

function adminLogin() {
  const username = document.getElementById("adminUsername").value.trim();
  const password = document.getElementById("adminPassword").value.trim();

  if (username === "admin" && password === "gehu2026") {
    window.location.href = "admin.html";
  } else {
    alert("Invalid admin credentials.");
  }
}

function loadStudentPage() {
  const student = JSON.parse(localStorage.getItem("currentStudent"));

  if (!student) {
    window.location.href = "index.html";
    return;
  }

  electionStatus = getElectionStatus();

  document.getElementById("loggedStudentName").innerText = student.name;
  document.querySelector(".profile-circle").innerText = student.name.charAt(0);
  document.getElementById("studentElectionStatus").innerText = electionStatus;

  renderCandidates();
  renderStudentResults();
  showElectionNotice();
}

function showElectionNotice() {
  const oldNotice = document.getElementById("electionNotice");
  if (oldNotice) oldNotice.remove();

  const candidateList = document.getElementById("candidateList");
  if (!candidateList) return;

  electionStatus = getElectionStatus();

  let message = "";

  if (electionStatus === "PAUSED") {
    message = "🟡 Election is temporarily paused. Please wait until admin resumes voting.";
  }

  if (electionStatus === "ENDED") {
    message = "🔴 Election has ended. Voting is now closed.";
  }

  if (message !== "") {
    const notice = document.createElement("div");
    notice.id = "electionNotice";
    notice.className = "note";
    notice.innerText = message;
    candidateList.parentNode.insertBefore(notice, candidateList);
  }
}

function renderCandidates() {
  const list = document.getElementById("candidateList");
  if (!list) return;

  electionStatus = getElectionStatus();

  const student = JSON.parse(localStorage.getItem("currentStudent"));
  const votedIds = JSON.parse(localStorage.getItem("votedIds")) || [];
  const alreadyVoted = votedIds.includes(student.id);

  list.innerHTML = "";

  candidates.forEach((candidate, index) => {
    const disabled = alreadyVoted || electionStatus !== "LIVE";

    list.innerHTML += `
      <div class="candidate-card">
        <div class="podium-icon">🎙️</div>
        <span class="candidate-no">${index + 1}</span>
        <h3>${candidate.name}</h3>
        <p>${candidate.position}</p>
        <button 
          class="primary-btn full"
          onclick="castVote(${candidate.id})"
          ${disabled ? "disabled" : ""}
        >
          ${
            alreadyVoted
              ? "Vote Submitted"
              : electionStatus === "PAUSED"
              ? "Voting Paused"
              : electionStatus === "ENDED"
              ? "Voting Closed"
              : "Cast Vote"
          }
        </button>
      </div>
    `;
  });
}

function castVote(candidateId) {
  electionStatus = getElectionStatus();

  const student = JSON.parse(localStorage.getItem("currentStudent"));
  const votedIds = JSON.parse(localStorage.getItem("votedIds")) || [];

  if (electionStatus !== "LIVE") {
    alert("Voting is currently " + electionStatus);
    renderCandidates();
    showElectionNotice();
    return;
  }

  if (votedIds.includes(student.id)) {
    alert("Repeated voting is not allowed.");
    return;
  }

  candidates = candidates.map(c =>
    c.id === candidateId ? { ...c, votes: c.votes + 1 } : c
  );

  votedIds.push(student.id);
  localStorage.setItem("votedIds", JSON.stringify(votedIds));

  const ref = "GEHU-VOTE-" + Math.floor(100000 + Math.random() * 900000);

  document.getElementById("voteConfirmation").classList.remove("hidden");
  document.getElementById("voteConfirmation").innerHTML =
    `Vote Successfully Submitted<br>Reference ID: ${ref}`;

  notifications.unshift(`${student.name} voted successfully.`);
  saveData();

  renderCandidates();
  renderStudentResults();
  showElectionNotice();
}

function renderStudentResults() {
  const box = document.getElementById("studentResults");
  if (!box) return;

  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
  const votedIds = JSON.parse(localStorage.getItem("votedIds")) || [];
  const student = JSON.parse(localStorage.getItem("currentStudent"));

  document.getElementById("studentVotesCast").innerText =
    votedIds.includes(student.id) ? "1" : "0";

  box.innerHTML = "";

  candidates.forEach(candidate => {
    const percentage =
      totalVotes === 0 ? 0 : Math.round((candidate.votes / totalVotes) * 100);

    box.innerHTML += `
      <div class="result-row">
        <strong>${candidate.name}</strong>
        <p>${candidate.votes} votes (${percentage}%)</p>
        <div class="progress">
          <span style="width:${percentage}%"></span>
        </div>
      </div>
    `;
  });
}

function loadAdminPage() {
  renderAdminDashboard();
}

function renderAdminDashboard() {
  electionStatus = getElectionStatus();

  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  document.getElementById("adminVotesCast").innerText = totalVotes;
  document.getElementById("votingPercent").innerText =
    Math.round((totalVotes / students.length) * 100) + "%";
  document.getElementById("adminElectionStatus").innerText = electionStatus;

  renderAdminResults();
  renderAdminCandidates();
  renderNotifications();
}

function setElectionStatus(status) {
  electionStatus = status;
  localStorage.setItem("electionStatus", status);

  notifications.unshift(`Election status changed to ${status}.`);
  localStorage.setItem("notifications", JSON.stringify(notifications));

  renderAdminDashboard();
}

function addCandidate() {
  electionStatus = getElectionStatus();

  if (electionStatus === "LIVE") {
    alert("You cannot add candidates while election is LIVE.");
    return;
  }

  if (electionStatus === "ENDED") {
    alert("Election has ended. Candidate changes are locked.");
    return;
  }

  const name = document.getElementById("newCandidateName").value.trim();
  const position = document.getElementById("newCandidateParty").value.trim();

  if (!name || !position) {
    alert("Please enter candidate name and position.");
    return;
  }

  candidates.push({
    id: Date.now(),
    name,
    position,
    votes: 0
  });

  notifications.unshift(`New candidate added: ${name}.`);

  document.getElementById("newCandidateName").value = "";
  document.getElementById("newCandidateParty").value = "";
  document.getElementById("newCandidateManifesto").value = "";

  saveData();
  renderAdminDashboard();
}

function deleteCandidate(id) {
  electionStatus = getElectionStatus();

  if (electionStatus === "LIVE") {
    alert("You cannot delete candidates while election is LIVE.");
    return;
  }

  if (electionStatus === "ENDED") {
    alert("Election has ended. Candidate changes are locked.");
    return;
  }

  candidates = candidates.filter(c => c.id !== id);
  notifications.unshift("Candidate deleted by admin.");

  saveData();
  renderAdminDashboard();
}

function renderAdminCandidates() {
  const list = document.getElementById("adminCandidateList");
  if (!list) return;

  electionStatus = getElectionStatus();
  list.innerHTML = "";

  candidates.forEach(candidate => {
    list.innerHTML += `
      <div class="result-row">
        <strong>${candidate.name}</strong>
        <p>${candidate.position}</p>
        <p>${candidate.votes} votes</p>
        <button 
          onclick="deleteCandidate(${candidate.id})" 
          class="red-btn"
          ${electionStatus === "LIVE" || electionStatus === "ENDED" ? "disabled" : ""}
        >
          Delete Candidate
        </button>
      </div>
    `;
  });
}

function renderAdminResults() {
  const results = document.getElementById("adminResults");
  if (!results) return;

  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
  results.innerHTML = "";

  candidates.forEach((candidate, index) => {
    const percentage =
      totalVotes === 0 ? 0 : Math.round((candidate.votes / totalVotes) * 100);

    results.innerHTML += `
      <div class="result-row">
        <strong>${index + 1}. ${candidate.name}</strong>
        <p>${candidate.votes} votes (${percentage}%)</p>
        <div class="progress">
          <span style="width:${percentage}%"></span>
        </div>
      </div>
    `;
  });
}

function renderNotifications() {
  const panel = document.getElementById("notificationPanel");
  if (!panel) return;

  panel.innerHTML = notifications.length
    ? notifications.map(n => `<div class="notification">${n}</div>`).join("")
    : "<p>No notifications yet.</p>";
}

function updateCountdown() {
  const countdown = document.getElementById("countdown");
  if (!countdown) return;

  const endDate = new Date("May 26, 2026 23:59:59").getTime();
  const now = new Date().getTime();
  const gap = endDate - now;

  if (gap <= 0) {
    countdown.innerHTML = "Election Ended";
    return;
  }

  const days = Math.floor(gap / (1000 * 60 * 60 * 24));
  const hours = Math.floor((gap / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((gap / (1000 * 60)) % 60);
  const secs = Math.floor((gap / 1000) % 60);

  countdown.innerHTML = `
    <span>${days}<small>Days</small></span>
    <span>${hours}<small>Hours</small></span>
    <span>${mins}<small>Mins</small></span>
    <span>${secs}<small>Secs</small></span>
  `;
}

function logout() {
  localStorage.removeItem("currentStudent");
  window.location.href = "index.html";
}

setInterval(updateCountdown, 1000);
updateCountdown();

if (window.location.pathname.includes("student.html")) {
  loadStudentPage();
}

if (window.location.pathname.includes("admin.html")) {
  loadAdminPage();
}