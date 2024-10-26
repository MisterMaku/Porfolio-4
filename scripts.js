const questions = [
    {
        question: "What is a fixed gear bike?",
        choices: ["A bike with gears", "A bike with no freewheel", "A mountain bike", "A bike with multiple speeds"],
        correct: 1
    },
    {
        question: "What gear ratio is commonly used for urban commuting?",
        choices: ["49x18", "52x14", "42x28", "34x16"],
        correct: 0
    },
    {
        question: "What is a tracklocross setup?",
        choices: ["A BMX bike setup", "A fixed gear bike used for off-road riding", "A downhill bike", "A bike for stunts"],
        correct: 1
    },
    {
        question: "Which component is essential for braking on a fixed gear bike?",
        choices: ["Rear brake", "Freewheel hub", "Lockring", "Suspension fork"],
        correct: 0
    },
    {
        question: "What does 'fixed gear' mean?",
        choices: ["No gears", "Cannot coast", "Has suspension", "Only single speed"],
        correct: 1
    },
    {
        question: "Which popular tire width is used in tracklocross setups?",
        choices: ["23mm", "28mm", "38mm", "50mm"],
        correct: 2
    },
    {
        question: "What is a skid stop?",
        choices: ["A way to stop by pedaling backward", "A braking technique using the bike's front brake", "A technique where the rider locks their rear wheel", "A method for adjusting gears while riding"],
        correct: 0
    },
    {
        question: "What is the benefit of riding a fixed gear bike?",
        choices: ["Better at climbing steep hills", "Helps improve pedaling efficiency", "Allows easier gear shifting", "Provides a smoother ride"],
        correct: 1
    },
    {
        question: "What type of handlebars is most common for fixed-gear bikes?",
        choices: ["Drop bars", "Flat bars", "Bullhorn bars", "Aero bars"],
        correct: 0
    },
    {
        question: "Why do fixed-gear riders often remove the front and rear brakes?",
        choices: ["Brakes are not required on flat terrain", "Brakes reduce speed efficiency", "Riders stop using the fixed rear wheel movement", "Brakes are heavy and unnecessary"],
        correct: 2
    },
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const nextButton = document.getElementById("next-btn");
const retryButton = document.getElementById("retry-btn");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";

    currentQuestion.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.className = "choice";
        choiceButton.onclick = () => {
            selectAnswer(index);
            nextQuestion();
        };
        choicesElement.appendChild(choiceButton);
    });
}

function selectAnswer(index) {
    selectedAnswers[currentQuestionIndex] = index; 
    if (index === questions[currentQuestionIndex].correct) {
        score++;
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    questionElement.style.display = "none";
    choicesElement.style.display = "none";
    scoreContainer.style.display = "block";

    scoreElement.innerHTML = `<h2>Your score: ${score} out of ${questions.length}</h2><br>`;

    questions.forEach((question, index) => {
        const isCorrect = selectedAnswers[index] === question.correct;
        const resultText = document.createElement("div");

        resultText.innerHTML = `
            <p><strong>Q${index + 1}:</strong> ${question.question}</p>
            <p style="color: ${isCorrect ? 'green' : 'red'};">
                Your answer: ${question.choices[selectedAnswers[index]] || "No answer selected"} 
                ${isCorrect ? "(Correct)" : "(Wrong)"}
            </p>
            ${!isCorrect ? `<p style="color: green;">Correct answer: ${question.choices[question.correct]}</p>` : ""}
            <hr>
        `;

        scoreElement.appendChild(resultText);
    });
}

function retryQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers = [];

    questionElement.style.display = "block";
    choicesElement.style.display = "block";
    scoreContainer.style.display = "none";

    loadQuestion();
}

window.onload = () => {
    loadQuestion();
};
