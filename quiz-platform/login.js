const allowedStudents = [
    { id: "20261", name: "Niraj Singh Bhandari" },
    { id: "20262", name: "Nitesh Rawat" },
    { id: "20263", name: "Piyush Bisht" },
    { id: "20264", name: "Pankaj Bhatt" }
];

document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    let studentId =
    document.getElementById("studentId").value.trim();

    let student =
    allowedStudents.find(s => s.id === studentId);

    if(student){

        sessionStorage.setItem(
            "loggedInStudent",
            JSON.stringify(student)
        );

        window.location.href="dashboard.html";

    }else{
        alert("Invalid Student ID");
    }
});