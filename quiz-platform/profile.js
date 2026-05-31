let student = JSON.parse(localStorage.getItem("loggedInStudent"));

if (!student) {
    window.location.href = "login.html";
} else {
    document.getElementById("profileName").innerText = student.name;
    document.getElementById("studentName").innerText = student.name;
    document.getElementById("studentEmail").innerText = student.email;
    document.getElementById("profileAvatar").innerText = student.name.charAt(0).toUpperCase();
}