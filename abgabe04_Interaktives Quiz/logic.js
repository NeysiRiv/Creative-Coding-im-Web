// Array mit den Quizfragen und den dazugehörigen Antworten
const questions = [
    {
        question: "Was ist die Hauptstadt von Deutschland?",
        answers: ["Berlin", "München", "Hamburg"],
        correct: 0,
    },
    {
        question: "Wie viele Planeten hat unser Sonnensystem?",
        answers: ["7", "8", "9"],
        correct: 1,
    },
    {
        question: "Welches Element ist für die Fotosynthese in Pflanzen verantwortlich?",
        answers: ["Wasser", "Chlorophyll", "Sauerstoff"],
        correct: 1,
    },
    {
        question: "Wie heißt die höchste Bergspitze der Welt?",
        answers: ["K2", "Mount Everest", "Mont Blanc"],
        correct: 1,
    },
    {
        question: "Wer schrieb 'Die Verwandlung'?",
        answers: ["Franz Kafka", "Goethe", "Thomas Mann"],
        correct: 0,
    },
];

// Selektiere die HTML-Elemente
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');

// Dynamisch Quizfragen generieren
questions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    questionDiv.innerHTML = `<p><strong>${index + 1}. ${q.question}</strong></p>`;

    q.answers.forEach((answer, i) => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="radio" name="question${index}" value="${i}">
            ${answer}
        `;
        questionDiv.appendChild(label);
        questionDiv.appendChild(document.createElement('br'));
    });

    quizContainer.appendChild(questionDiv);
});

// Antworten überprüfen und Ergebnisse anzeigen
submitButton.addEventListener('click', () => {
    let score = 0;
    let unansweredQuestions = [];
    let wrongAnswers = [];

    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);

        if (!selectedOption) {
            unansweredQuestions.push(index + 1);
        } else if (parseInt(selectedOption.value) === q.correct) {
            score++;
        } else {
            wrongAnswers.push({
                question: q.question,
                correctAnswer: q.answers[q.correct],
            });
        }
    });

    // Ergebnisse anzeigen
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `<p>Sie haben <strong>${score}</strong> von ${questions.length} Fragen richtig beantwortet.</p>`;

    // Fragen ohne Antwort anzeigen
    if (unansweredQuestions.length > 0) {
        resultContainer.innerHTML += `
            <p class="wrong">Bitte beantworten Sie die folgenden Fragen: ${unansweredQuestions.join(', ')}</p>
        `;
        return;
    }

    // Falsche Antworten anzeigen
    if (wrongAnswers.length > 0) {
        resultContainer.innerHTML += `<h3>Falsche Antworten:</h3><ul>`;
        wrongAnswers.forEach(wrong => {
            resultContainer.innerHTML += `<li>${wrong.question} - <span class="wrong">Richtige Antwort: ${wrong.correctAnswer}</span></li>`;
        });
        resultContainer.innerHTML += `</ul>`;
    }

    // Hinzufügen des Reset-Buttons
    addResetButton();
});

// Funktion zum Hinzufügen des Reset-Buttons
function addResetButton() {
    if (document.getElementById('reset')) return;

    const resetButton = document.createElement('button');
    resetButton.id = 'reset';
    resetButton.textContent = 'Quiz Neustarten';
    resetButton.style.marginTop = '10px';
    resetButton.addEventListener('click', resetQuiz);

    resultContainer.appendChild(resetButton);
}

// Funktion zum Zurücksetzen des Quizzes
function resetQuiz() {
    // Entferne alle ausgewählten Antworten
    const inputs = document.querySelectorAll('input[type="radio"]');
    inputs.forEach(input => (input.checked = false));

    // Verstecke das Ergebnis
    resultContainer.style.display = 'none';
    resultContainer.innerHTML = '';

    // Entferne den Reset-Button
    const resetButton = document.getElementById('reset');
    if (resetButton) resetButton.remove();

    // Scroll zum Anfang
    scrollToTop();
}

// Funktion zum Scrollen zum Seitenanfang
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth', // Weicher Scroll-Effekt
    });
}
