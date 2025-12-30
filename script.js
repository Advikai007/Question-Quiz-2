const questions = [
    {
        q: "Where was india's first civilization settled?",
        options: [
             "Deccan",
             "Indus Valley",
             "Ganges plain", 
             "kashmir" 
        ],
        correct: 1
    },
    {
        q: "which is the smallest continent in the world?",
        options: [
             "Asia", 
             "Arctic",
             "Australia",  
             "Africa" 
        ],
        correct: 2
    },
    {
        q: "Which is not a programming language?",
        options: [
             "Pyhton",
             "Html",
             "C++", 
             "Java"
        ],
        correct: 1
    },
    {
        q: "CSS stands for",
        options: [
            "Computer Style Sheet",
            "Cascading Style Sheets",
            "Creative Style Sheet",
            "Color Style Sheet"
        ],
        correct: 1
    },
    {
        q: "JavaScript is a",
        options: [
            "Compiled language",
            "Markup language",
            "Scripting language",
            "Styling language"
        ],
        correct: 2
    }
];

let index = 0;
let answers = new Array(questions.length).fill(null);
let visited = new Array(questions.length).fill(false);
let time = 30;
let timer;

document.getElementById("startForm").onsubmit = e => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const branch = document.getElementById("branch").value;
    const reg = document.getElementById("regno").value;

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("quizScreen").style.display = "block";
    document.getElementById("timerBox").style.display = "block";

    const infoString = `Name: ${name} | Branch: ${branch} | Reg No: ${reg}`;
    document.getElementById("studentInfo").innerText = infoString;
    document.getElementById("finalStudentInfo").innerText = infoString;

    loadQ();
};

function startTimer() {
    clearInterval(timer);
    time = 30;
    document.getElementById("timer").innerText = time;

    timer = setInterval(() => {
        time--;
        document.getElementById("timer").innerText = time;
        if (time === 0) {
            if (index === questions.length - 1) {
                save();
                checkSubmitAccess();
                clearInterval(timer);
            } else {
                nextQ();
            }
        }
    }, 1000);
}

function loadQ() {
    startTimer();
    visited[index] = true; 

    document.getElementById("qNum").innerText = index + 1;
    document.getElementById("question").innerText = questions[index].q;

    const nextBtn = document.getElementById("nextBtn");
    if (index === questions.length - 1) {
        nextBtn.style.display = "none";
    } else {
        nextBtn.style.display = "inline-block";
    }

    const opt = document.getElementById("options");
    opt.innerHTML = "";

    questions[index].options.forEach((text, i) => {
        opt.innerHTML += `
            <label>
                <input type="radio" name="ans" value="${i}" ${answers[index] == i ? "checked" : ""}>
                ${text}
            </label>
        `;
    });

    checkSubmitAccess(); // Check if button should appear
}

function save() {
    const selected = document.querySelector('input[name="ans"]:checked');
    if (selected) answers[index] = selected.value;
}

function nextQ() {
    save();
    if (index < questions.length - 1) {
        index++;
        loadQ();
    }
}

function prevQ() {
    save();
    if (index > 0) {
        index--;
        loadQ();
    }
}

// Logic: Submit button appears only when all questions have been seen
function checkSubmitAccess() {
    const allVisited = visited.every(v => v === true);
    const submitBtn = document.getElementById("submitBtn");
    
    if (allVisited) {
        submitBtn.style.display = "inline-block";
        submitBtn.disabled = false;
    } else {
        submitBtn.style.display = "none";
    }
}

function submitQuiz() {
    save();

    if (!visited.every(v => v)) {
        alert(" Hold up!\nReview all questions once before submitting ");
        return;
    }

    clearInterval(timer);
    document.getElementById("quizScreen").style.display = "none";
    document.getElementById("timerBox").style.display = "none";
    document.getElementById("scoreScreen").style.display = "block";

    let score = 0;
    answers.forEach((a, i) => {
        if (a == questions[i].correct) score++;
    });

    document.getElementById("finalScore").innerText = score;
    document.getElementById("totalQuestions").innerText = questions.length;

    const feedback = document.getElementById("feedbackText");
    if (score === questions.length) {
        feedback.innerText = "Wow! You're a genius! ";
    } else if (score >= questions.length / 2) {
        feedback.innerText = "Solid effort! You know your stuff. ";
    } else {
        feedback.innerText = "Good try! Time for a quick review? ";
    }
}