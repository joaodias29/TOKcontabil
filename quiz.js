// Quiz questions and answers
const quizQuestions = [
    {
        question: "Uma empresa teve R$ 25.000 em receitas e R$ 18.000 em despesas. Qual foi o lucro líquido?",
        options: [
            { text: "R$ 5.000", correct: false },
            { text: "R$ 7.000", correct: true },
            { text: "R$ 8.000", correct: false },
            { text: "R$ 10.000", correct: false }
        ]
    },
    {
        question: "Se um produto custa R$ 80,00 e sofre um aumento de 15%, qual será seu novo valor?",
        options: [
            { text: "R$ 90,00", correct: false },
            { text: "R$ 92,00", correct: true },
            { text: "R$ 95,00", correct: false },
            { text: "R$ 98,00", correct: false }
        ]
    },
    {
        question: "O que significa a sigla DRE na contabilidade?",
        options: [
            { text: "Demonstração de Resultados do Exercício", correct: true },
            { text: "Documento de Receita Estadual", correct: false },
            { text: "Declaração de Rendimentos Empresariais", correct: false },
            { text: "Demonstrativo de Receitas Efetivas", correct: false }
        ]
    },
    {
        question: "Qual destes NÃO é um tributo federal?",
        options: [
            { text: "IRRF", correct: false },
            { text: "IPI", correct: false },
            { text: "ICMS", correct: true },
            { text: "PIS", correct: false }
        ]
    },
    {
        question: "Qual a finalidade principal da Nota Fiscal Eletrônica?",
        options: [
            { text: "Controlar estoque", correct: false },
            { text: "Documentar operações comerciais e atender exigências fiscais", correct: true },
            { text: "Substituir contratos trabalhistas", correct: false },
            { text: "Controlar ponto de funcionários", correct: false }
        ]
    },
    {
        question: "Ao encontrar um erro que beneficia a empresa em uma declaração fiscal já enviada, qual a atitude correta?",
        options: [
            { text: "Ignorar, pois beneficia a empresa", correct: false },
            { text: "Corrigir imediatamente e regularizar a situação", correct: true },
            { text: "Esperar ser descoberto", correct: false },
            { text: "Cobrar para corrigir", correct: false }
        ]
    },
    {
        question: "Qual função do Excel é usada para somar valores em um intervalo?",
        options: [
            { text: "COUNT", correct: false },
            { text: "SUM", correct: true },
            { text: "ADD", correct: false },
            { text: "TOTAL", correct: false }
        ]
    },
    {
        question: "Um cliente questiona uma cobrança. Como você procederia?",
        options: [
            { text: "Dizer que não é seu problema", correct: false },
            { text: "Verificar os documentos, explicar educadamente e solucionar a dúvida", correct: true },
            { text: "Encaminhar para outro setor sem explicações", correct: false },
            { text: "Pedir para ele retornar outro dia", correct: false }
        ]
    }
];

let currentQuestion = 0;
let userAnswers = new Array(quizQuestions.length).fill(null);
let score = 0;

// Initialize quiz
function initializeQuiz() {
    showQuestion();
    updateProgress();
    
    document.getElementById('prev-btn').addEventListener('click', previousQuestion);
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('submit-btn').addEventListener('click', showResults);
}

// Show current question
function showQuestion() {
    const quizContent = document.getElementById('quiz-content');
    const question = quizQuestions[currentQuestion];
    
    let optionsHTML = question.options.map((option, index) => `
        <div class="option ${userAnswers[currentQuestion] === index ? 'selected' : ''}" 
             onclick="selectOption(${index})">
            ${option.text}
        </div>
    `).join('');
    
    quizContent.innerHTML = `
        <div class="quiz-question">
            <h3>${question.question}</h3>
            <div class="quiz-options">
                ${optionsHTML}
            </div>
        </div>
    `;
    
    updateNavigationButtons();
}

// Select an option
function selectOption(optionIndex) {
    userAnswers[currentQuestion] = optionIndex;
    showQuestion();
}

// Update navigation buttons
function updateNavigationButtons() {
    document.getElementById('prev-btn').disabled = currentQuestion === 0;
    
    if (currentQuestion === quizQuestions.length - 1) {
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('submit-btn').style.display = 'block';
    } else {
        document.getElementById('next-btn').style.display = 'block';
        document.getElementById('submit-btn').style.display = 'none';
    }
    
    // Enable submit only if all questions are answered
    const allAnswered = userAnswers.every(answer => answer !== null);
    document.getElementById('submit-btn').disabled = !allAnswered;
}

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `Pergunta ${currentQuestion + 1} de ${quizQuestions.length}`;
}

// Navigate to next question
function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        showQuestion();
        updateProgress();
    }
}

// Navigate to previous question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
        updateProgress();
    }
}

// Calculate score and show results
function showResults() {
    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer !== null && quizQuestions[index].options[answer].correct) {
            score++;
        }
    });
    
    const percentage = (score / quizQuestions.length) * 100;
    let perfil, description, perfilClass;
    
    if (percentage >= 87.5) { // 7-8 correct
        perfil = "Perfil Ideal";
        description = "Excelente! Você demonstrou ter conhecimentos sólidos em contabilidade e habilidades importantes para a vaga. Seu perfil está muito alinhado com o que buscamos.";
        perfilClass = "perfil-alto";
    } else if (percentage >= 50) { // 4-6 correct
        perfil = "Perfil Compatível";
        description = "Muito bom! Você tem conhecimentos básicos e demonstra potencial. Com algum treinamento, pode se tornar um excelente auxiliar contábil.";
        perfilClass = "perfil-medio";
    } else { // 0-3 correct
        perfil = "Perfil em Desenvolvimento";
        description = "Seus conhecimentos em contabilidade ainda estão em desenvolvimento. Recomendamos estudar mais sobre os temas antes de se candidatar, mas não desanime!";
        perfilClass = "perfil-baixo";
    }
    
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';
    document.getElementById('quiz-result').innerHTML = `
        <h2 class="result-title">Resultado do Quiz</h2>
        <div class="result-score">${score}/${quizQuestions.length}</div>
        <div class="result-perfil ${perfilClass}">${perfil}</div>
        <p class="result-description">${description}</p>
        <button onclick="restartQuiz()" class="cta-button">Refazer Quiz</button>
        <p style="margin-top: 2rem; font-style: italic;">
            Independente do resultado, inscreva-se na vaga! O desenvolvimento profissional é contínuo.
        </p>
    `;
    
    // Scroll to results
    document.getElementById('quiz-result').scrollIntoView({ behavior: 'smooth' });
}

// Restart quiz
function restartQuiz() {
    currentQuestion = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    score = 0;
    
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
    
    showQuestion();
    updateProgress();
    updateNavigationButtons();
}
