const config = {
    vidas: 3,
    energiaInicial: 100,
    tiempoPorPregunta: 50,
    dificultad: {
        facil: ['aritmetica', 'algebra-basica'],
        medio: ['aritmetica', 'algebra', 'geometria-basica'],
        dificil: ['algebra', 'geometria', 'ecuaciones']
    },
    puntosPorNivel: {
        facil: 10,
        medio: 20,
        dificil: 30
    }
};

const preguntas = {
    'aritmetica': [
        { pregunta: "15 + 27 = ?", respuesta: "42" },
        { pregunta: "8 × 7 = ?", respuesta: "56" },
        { pregunta: "√144 = ?", respuesta: "12" },
        { pregunta: "5² + 10 = ?", respuesta: "35" },
        { pregunta: "100 ÷ 4 = ?", respuesta: "25" }
    ],
    'algebra-basica': [
        { pregunta: "x + 5 = 12 → x = ?", respuesta: "7" },
        { pregunta: "2y = 16 → y = ?", respuesta: "8" },
        { pregunta: "3z - 6 = 9 → z = ?", respuesta: "5" },
        { pregunta: "a/4 = 3 → a = ?", respuesta: "12" },
        { pregunta: "2b + 3 = 11 → b = ?", respuesta: "4" }
    ],
    'algebra': [
        { pregunta: "2x + 5 = 17 → x = ?", respuesta: "6" },
        { pregunta: "Factoriza: x² - 9", respuesta: "(x+3)(x-3)" },
        { pregunta: "Desarrolla: (x+2)(x-3)", respuesta: "x²-x-6" },
        { pregunta: "Resuelve: 3(x + 2) = 24", respuesta: "6" },
        { pregunta: "Simplifica: (2x² + 4x)/2x", respuesta: "x+2" }
    ],
    'geometria-basica': [
        { pregunta: "Área de cuadrado (lado=5)", respuesta: "25" },
        { pregunta: "Perímetro de triángulo (lados=6)", respuesta: "18" },
        { pregunta: "Área de rectángulo (5×8)", respuesta: "40" },
        { pregunta: "Volumen de cubo (arista=2)", respuesta: "8" },
        { pregunta: "Área de triángulo (base=4, altura=3)", respuesta: "6" }
    ],
    'geometria': [
        { pregunta: "Área de círculo (radio=4, π=3.14)", respuesta: "50.24" },
        { pregunta: "Volumen de cubo (arista=3)", respuesta: "27" },
        { pregunta: "Teorema de Pitágoras (3,4,?)", respuesta: "5" },
        { pregunta: "Área de rombo (D=6, d=4)", respuesta: "12" },
        { pregunta: "Volumen de esfera (radio=3, π=3.14)", respuesta: "113.04" }
    ],
    'ecuaciones': [
        { pregunta: "3(x - 2) = 21 → x = ?", respuesta: "9" },
        { pregunta: "x² - 5x + 6 = 0 → x = ?", respuesta: "2,3" },
        { pregunta: "2x² + 4x - 6 = 0 → x = ?", respuesta: "1,-3" },
        { pregunta: "Sistema: x+y=5, x-y=1 → x,y = ?", respuesta: "3,2" },
        { pregunta: "Ecuación: 2/x = 1/3 → x = ?", respuesta: "6" }
    ]
};

const elements = {
    scenario: document.getElementById("scenario"),
    character: document.getElementById("character"),
    enemy: document.getElementById("enemy"),
    sceneText: document.getElementById("scene-text"),
    question: document.getElementById("question"),
    answer: document.getElementById("answer"),
    submit: document.getElementById("submit"),
    feedback: document.getElementById("feedback"),
    energy: document.getElementById("energy"),
    score: document.getElementById("score"),
    bonus: document.getElementById("bonus"),
    highscore: document.getElementById("highscore"),
    timeLeft: document.getElementById("time-left"),
    hearts: [
        document.getElementById("heart1"),
        document.getElementById("heart2"),
        document.getElementById("heart3")
    ],
    effects: document.getElementById("effects"),
    bgMusic: document.getElementById("bgMusic"),
    correctSound: document.getElementById("correctSound"),
    wrongSound: document.getElementById("wrongSound"),
    soundBtn: document.getElementById("soundBtn")
};

let state = {
    score: 0,
    energy: config.energiaInicial,
    bonus: 1.0,
    timeLeft: config.tiempoPorPregunta,
    timer: null,
    correctAnswer: null,
    currentLevel: 'facil',
    soundOn: true,
    highscore: localStorage.getItem('mathSurvivorHighscore') || 0,
    vidas: config.vidas
};

const scenarios = [
    {
        name: "jungle",
        text: "¡Una serpiente gigante te ataca! Resuelve para defenderte.",
        enemySvg: `<path d="M20,50 Q50,20 80,50 Q50,80 20,50" fill="#2ecc71" stroke="#27ae60" stroke-width="3"/>`,
        characterHappy: `<circle cx="50" cy="50" r="40" fill="#FFD700"/><circle cx="35" cy="40" r="5" fill="#000"/><circle cx="65" cy="40" r="5" fill="#000"/><path d="M30 70 Q50 85 70 70" stroke="#000" fill="transparent" stroke-width="3"/>`,
        characterSad: `<circle cx="50" cy="50" r="40" fill="#FFD700"/><circle cx="35" cy="40" r="5" fill="#000"/><circle cx="65" cy="40" r="5" fill="#000"/><path d="M30 70 Q50 50 70 70" stroke="#000" fill="transparent" stroke-width="3"/>`
    },
    {
        name: "cave",
        text: "¡La cueva se está derrumbando! Resuelve para escapar.",
        enemySvg: `<circle cx="50" cy="50" r="40" fill="#7f8c8d"/><rect x="30" y="60" width="40" height="10" fill="#5d6d7e"/>`,
        characterHappy: `<rect x="20" y="20" width="60" height="60" rx="10" fill="#FFD700"/><circle cx="40" cy="40" r="5" fill="#000"/><circle cx="60" cy="40" r="5" fill="#000"/><path d="M30 70 Q50 85 70 70" stroke="#000" fill="transparent" stroke-width="3"/>`,
        characterSad: `<rect x="20" y="20" width="60" height="60" rx="10" fill="#FFD700"/><circle cx="40" cy="40" r="5" fill="#000"/><circle cx="60" cy="40" r="5" fill="#000"/><path d="M30 70 Q50 50 70 70" stroke="#000" fill="transparent" stroke-width="3"/>`
    },
    {
        name: "beach",
        text: "¡Un cangrejo furioso te persigue! Resuelve para detenerlo.",
        enemySvg: `<path d="M30,60 L50,30 L70,60 L50,90 Z" fill="#e74c3c"/><circle cx="40" cy="40" r="5" fill="#000"/><circle cx="60" cy="40" r="5" fill="#000"/>`,
        characterHappy: `<path d="M20,20 L50,50 L80,20 L50,80 Z" fill="#FFD700"/><circle cx="40" cy="30" r="3" fill="#000"/><circle cx="60" cy="30" r="3" fill="#000"/><path d="M35 50 Q50 60 65 50" stroke="#000" fill="transparent" stroke-width="2"/>`,
        characterSad: `<path d="M20,20 L50,50 L80,20 L50,80 Z" fill="#FFD700"/><circle cx="40" cy="30" r="3" fill="#000"/><circle cx="60" cy="30" r="3" fill="#000"/><path d="M35 50 Q50 40 65 50" stroke="#000" fill="transparent" stroke-width="2"/>`
    },
    {
        name: "volcano",
        text: "¡Lava ardiente se acerca! Resuelve para crear un puente.",
        enemySvg: `<path d="M20,80 L50,20 L80,80 Z" fill="#e67e22"/><circle cx="50" cy="40" r="10" fill="#e74c3c"/>`,
        characterHappy: `<circle cx="50" cy="50" r="40" fill="#FFD700"/><path d="M30,30 L40,40 M60,40 L70,30 M35,60 L45,70 M55,70 L65,60" stroke="#000" stroke-width="3"/><path d="M30 70 Q50 85 70 70" stroke="#000" fill="transparent" stroke-width="3"/>`,
        characterSad: `<circle cx="50" cy="50" r="40" fill="#FFD700"/><path d="M30,30 L40,40 M60,40 L70,30 M35,60 L45,70 M55,70 L65,60" stroke="#000" stroke-width="3"/><path d="M30 70 Q50 50 70 70" stroke="#000" fill="transparent" stroke-width="3"/>`
    },
    {
        name: "temple",
        text: "¡Los guardianes del templo te desafían! Resuelve para continuar.",
        enemySvg: `<rect x="30" y="30" width="40" height="60" fill="#8e44ad"/><circle cx="50" cy="40" r="10" fill="#f1c40f"/>`,
        characterHappy: `<path d="M20,80 L50,20 L80,80 Z" fill="#FFD700"/><circle cx="40" cy="50" r="3" fill="#000"/><circle cx="60" cy="50" r="3" fill="#000"/><path d="M35 65 Q50 75 65 65" stroke="#000" fill="transparent" stroke-width="2"/>`,
        characterSad: `<path d="M20,80 L50,20 L80,80 Z" fill="#FFD700"/><circle cx="40" cy="50" r="3" fill="#000"/><circle cx="60" cy="50" r="3" fill="#000"/><path d="M35 65 Q50 55 65 65" stroke="#000" fill="transparent" stroke-width="2"/>`
    }
];

function initGame() {
    updateHighscoreDisplay();
    loadCharacter();
    changeScenario();
    generateQuestion();
    setupEventListeners();
    playBackgroundMusic();
}

function setupEventListeners() {
    elements.submit.addEventListener("click", checkAnswer);
    elements.answer.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            checkAnswer();
        }
    });
    elements.soundBtn.addEventListener("click", toggleSound);
}

function toggleSound() {
    state.soundOn = !state.soundOn;
    elements.soundBtn.textContent = state.soundOn ? "🔊 Sonido ON" : "🔇 Sonido OFF";
    
    if (state.soundOn) {
        elements.bgMusic.play();
    } else {
        elements.bgMusic.pause();
    }
}

function playBackgroundMusic() {
    if (state.soundOn) {
        elements.bgMusic.volume = 0.3;
        elements.bgMusic.play().catch(e => console.log("Error al reproducir música:", e));
    }
}

function playSound(sound) {
    if (state.soundOn) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log("Error al reproducir sonido:", e));
    }
}

function loadCharacter() {
    elements.character.innerHTML = scenarios[0].characterHappy;
}

function changeScenario() {
    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    elements.scenario.className = `scenario ${randomScenario.name}`;
    elements.sceneText.textContent = randomScenario.text;
    
    elements.enemy.innerHTML = randomScenario.enemySvg;
    elements.enemy.style.display = "block";
    elements.enemy.classList.add("enemy-attack");
    
    elements.character.innerHTML = randomScenario.characterHappy;
    
    setTimeout(() => {
        elements.enemy.classList.remove("enemy-attack");
    }, 1500);
    
    return randomScenario;
}

function generateQuestion() {
    clearInterval(state.timer);
    state.timeLeft = config.tiempoPorPregunta;
    updateTimeDisplay();
    
    if (state.score >= 100) {
        state.currentLevel = 'dificil';
    } else if (state.score >= 50) {
        state.currentLevel = 'medio';
    } else {
        state.currentLevel = 'facil';
    }
    
    const categoria = config.dificultad[state.currentLevel][
        Math.floor(Math.random() * config.dificultad[state.currentLevel].length)
    ];
    
    const preguntaObj = preguntas[categoria][
        Math.floor(Math.random() * preguntas[categoria].length)
    ];
    
    elements.question.textContent = preguntaObj.pregunta;
    state.correctAnswer = preguntaObj.respuesta;
    
    state.timer = setInterval(() => {
        state.timeLeft--;
        updateTimeDisplay();
        
        if (state.timeLeft <= 0) {
            handleAnswer(false);
        }
    }, 1000);
}

function updateTimeDisplay() {
    elements.timeLeft.style.width = `${(state.timeLeft / config.tiempoPorPregunta) * 100}%`;
    
    if (state.timeLeft < config.tiempoPorPregunta * 0.3) {
        elements.timeLeft.style.background = "#e74c3c";
    } else if (state.timeLeft < config.tiempoPorPregunta * 0.6) {
        elements.timeLeft.style.background = "#f39c12";
    } else {
        elements.timeLeft.style.background = "#2ecc71";
    }
}

function checkAnswer() {
    const userAnswer = elements.answer.value.trim().replace(/\s/g, '');
    let isCorrect = false;
    
    if (userAnswer === state.correctAnswer.toString()) {
        isCorrect = true;
    } else {
        const correctAnswers = state.correctAnswer.toString().split(',');
        if (correctAnswers.length > 1) {
            const userAnswers = userAnswer.split(',');
            if (userAnswers.length === correctAnswers.length) {
                isCorrect = userAnswers.every(ans => correctAnswers.includes(ans));
            }
        }
    }
    
    handleAnswer(isCorrect);
    elements.answer.value = "";
}

function handleAnswer(isCorrect) {
    clearInterval(state.timer);
    
    if (isCorrect) {
        playSound(elements.correctSound);
        createEffect("+10", "explosion", "#f1c40f");
        
        const puntosGanados = config.puntosPorNivel[state.currentLevel] * state.bonus;
        state.score += Math.floor(puntosGanados);
        
        const rapidez = state.timeLeft / config.tiempoPorPregunta;
        state.bonus = Math.min(state.bonus + 0.2 * rapidez, 3.0);
        
        state.energy = Math.min(state.energy + 15, 100);
        
        elements.feedback.textContent = `✅ ¡Correcto! +${Math.floor(puntosGanados)} puntos`;
        elements.feedback.style.color = "#2ecc71";
        
        const currentScenario = document.querySelector(".scenario").className.split(" ")[1];
        const scenario = scenarios.find(s => s.name === currentScenario);
        elements.character.innerHTML = scenario.characterHappy;
    } else {
        playSound(elements.wrongSound);
        createEffect("✖", "fire", "#e74c3c");
        
        state.bonus = Math.max(state.bonus - 0.5, 1.0);
        
        state.energy -= 20;
        
        elements.feedback.textContent = `❌ ¡Fallaste! La respuesta era ${state.correctAnswer}`;
        elements.feedback.style.color = "#e74c3c";
        
        const currentScenario = document.querySelector(".scenario").className.split(" ")[1];
        const scenario = scenarios.find(s => s.name === currentScenario);
        elements.character.innerHTML = scenario.characterSad;
        
        if (state.energy <= 0) {
            loseLife();
        }
    }
    
    updateStats();
    
    if (state.vidas <= 0) {
        endGame();
    } else {
        setTimeout(() => {
            changeScenario();
            generateQuestion();
        }, 1500);
    }
}

function createEffect(text, className, color) {
    const effect = document.createElement("div");
    effect.className = className;
    effect.textContent = text;
    effect.style.color = color;
    effect.style.left = `${Math.random() * 80 + 10}%`;
    effect.style.top = `${Math.random() * 40 + 30}%`;
    
    elements.effects.appendChild(effect);
    
    setTimeout(() => {
        effect.remove();
    }, 1000);
}

function loseLife() {
    state.vidas--;
    state.energy = config.energiaInicial;
    
    for (let i = 0; i < elements.hearts.length; i++) {
        elements.hearts[i].style.visibility = i < state.vidas ? "visible" : "hidden";
    }
}

function updateStats() {
    elements.energy.textContent = Math.max(0, state.energy);
    elements.score.textContent = Math.floor(state.score);
    elements.bonus.textContent = state.bonus.toFixed(1);
    
    if (state.score > state.highscore) {
        state.highscore = state.score;
        localStorage.setItem('mathSurvivorHighscore', state.highscore);
        updateHighscoreDisplay();
    }
}

function updateHighscoreDisplay() {
    elements.highscore.textContent = state.highscore;
}

function endGame() {
    clearInterval(state.timer);
    
    elements.question.textContent = "💀 GAME OVER";
    elements.answer.disabled = true;
    elements.submit.disabled = true;
    
    elements.feedback.textContent = `🏁 Puntaje final: ${Math.floor(state.score)}`;
    elements.feedback.style.color = "#f1c40f";
    
    const restartBtn = document.createElement("button");
    restartBtn.textContent = "🔄 Jugar de nuevo";
    restartBtn.addEventListener("click", () => {
        location.reload();
    });
    elements.gameUi.appendChild(restartBtn);
}

window.onload = initGame;