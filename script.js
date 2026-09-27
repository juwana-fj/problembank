// ProblemBank Interactive Features

// FILTER PROBLEMS
function filterProblems(category) {
    const problems = document.querySelectorAll(".problem-card");

    problems.forEach(problem => {
        if (category === "all" || problem.dataset.category === category) {
            problem.style.display = "block";
        } else {
            problem.style.display = "none";
        }
    });
}


// REPORT A PROBLEM
const form = document.getElementById("problemForm");
const problemList = document.getElementById("problemList");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;
    const people = document.getElementById("people").value;

    // Create a new problem card
    const newProblem = document.createElement("div");

    newProblem.className = "problem-card";
    newProblem.dataset.category = category;

    newProblem.innerHTML = `
        <span>${category.toUpperCase()}</span>
        <h3>${title}</h3>
        <p>${description}</p>
        <small>📍 ${location} · 👥 ${people} people affected</small>
    `;

    problemList.prepend(newProblem);

    // Save the problem in browser storage
    const savedProblems =
        JSON.parse(localStorage.getItem("problemBankProblems")) || [];

    savedProblems.push({
        title: title,
        category: category,
        description: description,
        location: location,
        people: people
    });

    localStorage.setItem(
        "problemBankProblems",
        JSON.stringify(savedProblems)
    );

    // Success message
    successMessage.textContent =
        "✅ Problem submitted successfully! It has been added to ProblemBank.";

    successMessage.style.color = "#2563eb";
    successMessage.style.fontWeight = "700";
    successMessage.style.marginTop = "15px";

    // Clear form
    form.reset();
});


// LOAD PREVIOUSLY SUBMITTED PROBLEMS
window.addEventListener("load", function() {

    const savedProblems =
        JSON.parse(localStorage.getItem("problemBankProblems")) || [];

    savedProblems.forEach(problem => {

        const newProblem = document.createElement("div");

        newProblem.className = "problem-card";
        newProblem.dataset.category = problem.category;

        newProblem.innerHTML = `
            <span>${problem.category.toUpperCase()}</span>
            <h3>${problem.title}</h3>
            <p>${problem.description}</p>
            <small>
                📍 ${problem.location} ·
                👥 ${problem.people} people affected
            </small>
        `;

        problemList.prepend(newProblem);
    });

});