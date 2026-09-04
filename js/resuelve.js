const board = document.getElementById("board");
const questionText = document.getElementById("question");
const statusText = document.getElementById("status");
const input = document.getElementById("answer");
const checkButton = document.querySelector("button");

const questions = [
  { q: "¿Cuánto es 7 x 8?", a: "56" },
  { q: "Resuelve: 15 + 9 - 4", a: "20" },
  { q: "Área de un triángulo de base 6 y altura 4", a: "12" },
  { q: "¿Qué representa 'x' en 2x = 10?", a: "5" },
  { q: "Perímetro de un cuadrado de lado 3", a: "12" },
  { q: "Raíz cuadrada de 81", a: "9" },
  { q: "¿Cuánto es 3² + 4²?", a: "25" },
  { q: "Si x + 5 = 12, ¿x = ?", a: "7" },
  { q: "Volumen de un cubo de lado 2", a: "8" },
  { q: "¿Cuánto es 100 ÷ 4?", a: "25" },
  { q: "¿Cuánto es 9 x 6?", a: "54" },
  { q: "Resuelve: 20 ÷ 5 + 3", a: "7" },
  { q: "Área de un rectángulo de base 5 y altura 2", a: "10" },
  { q: "¿Qué número falta en la secuencia: 2, 4, __, 8?", a: "6" },
  { q: "¿Cuánto es 2³?", a: "8" },
  { q: "¿Cuánto es 7 + 6 x 2?", a: "19" },
  { q: "Raíz cuadrada de 49", a: "7" },
  { q: "Si 3x = 21, ¿x = ?", a: "7" },
  { q: "Perímetro de un triángulo equilátero de lado 4", a: "12" },
  { q: "Volumen de un prisma rectangular 2x3x4", a: "24" },
  { q: "¿Cuánto es 11 x 11?", a: "121" },
  { q: "Resuelve: (10 + 5) ÷ 3", a: "5" },
  { q: "Área de un círculo de radio 1 (π≈3.14)", a: "3.14" },
  { q: "¿Qué valor de x cumple: x/2 = 6?", a: "12" },
  { q: "¿Cuánto es 5²?", a: "25" },
  { q: "¿Cuánto es 81 ÷ 9?", a: "9" },
  { q: "Si 4x = 32, ¿x = ?", a: "8" },
  { q: "Perímetro de un rectángulo 3x7", a: "20" },
  { q: "Área de un cuadrado de lado 5", a: "25" },
  { q: "Raíz cuadrada de 64", a: "8" },
  { q: "¿Cuánto es 2 + 2 x 2?", a: "6" },
  { q: "Volumen de un cilindro de radio 1 y altura 3 (π≈3.14)", a: "9.42" },
  { q: "¿Cuánto es 12 ÷ 3 + 2?", a: "6" },
  { q: "¿Qué número sigue en la secuencia: 5, 10, 15, ?", a: "20" },
  { q: "¿Cuánto es 3 x 4 + 2?", a: "14" },
  { q: "Si x - 3 = 10, ¿x = ?", a: "13" },
  { q: "Área de un paralelogramo de base 6 y altura 5", a: "30" },
  { q: "¿Cuánto es 6 x 7?", a: "42" },
  { q: "Raíz cuadrada de 121", a: "11" },
  { q: "¿Cuánto es (8 + 2) x 3?", a: "30" }
];

const totalCells = 30;
let currentPos = 0;

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    if (i === 0) cell.classList.add("start");
    if (i === totalCells - 1) cell.classList.add("finish");
    board.appendChild(cell);
  }
  updateRobot();
  loadQuestion();
}

function updateRobot() {
  document.querySelectorAll(".cell").forEach((c, i) => {
    c.innerHTML = "";
    c.classList.remove("active");
    if (i === currentPos) c.classList.add("active");
  });

  const robot = document.createElement("div");
  robot.className = "robot";

  const robotEyesColor = statusText.textContent === "¡Correcto!" ? "green" : 
                         statusText.textContent.includes("Incorrecto") ? "red" : "black";

  robot.innerHTML = `
    <div class="robot-head" style="--eye-color: ${robotEyesColor};"></div>
    <div class="robot-body">
      <div class="robot-arms">
        <div class="robot-arm"></div>
        <div class="robot-arm"></div>
      </div>
      <div class="robot-legs">
        <div class="robot-leg"></div>
        <div class="robot-leg"></div>
      </div>
    </div>
  `;

  if (statusText.textContent === "¡Correcto!") {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = "¡Bien hecho!";
    robot.appendChild(bubble);
  } else if (statusText.textContent.includes("Incorrecto")) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = "¡Ups!";
    robot.appendChild(bubble);
  }

  document.querySelectorAll(".cell")[currentPos].appendChild(robot);
}

function loadQuestion() {
  const question = questions[Math.floor(Math.random() * questions.length)];
  questionText.textContent = question.q;
  questionText.dataset.answer = question.a;
  input.value = "";
  statusText.textContent = "";
}

function checkAnswer() {
  const answer = input.value.trim();
  const correct = questionText.dataset.answer;

  checkButton.disabled = true;

  if (answer === correct) {
    statusText.textContent = "¡Correcto!";
    document.body.style.backgroundColor = "#d4efdf";
    if (currentPos < totalCells - 1) {
      currentPos++;
    }
  } else {
    statusText.textContent = "Incorrecto. Retrocedes.";
    document.body.style.backgroundColor = "#f5b7b1";
    if (currentPos > 0) {
      currentPos--;
    }
  }

  updateRobot();

  if (currentPos === totalCells - 1) {
    statusText.textContent = "🎉 ¡Ganaste! 🎉";
    questionText.textContent = "¡Felicidades, llegaste a la meta!";
    checkButton.disabled = true;

    // Lanzar confeti
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Mostrar SweetAlert
    Swal.fire({
      title: '¡Felicidades!',
      text: '¡Has llegado a la meta!',
      icon: 'success',
      confirmButtonText: '¡Genial!'
    });

    return;
  }

  setTimeout(() => {
    document.body.style.backgroundColor = "#f0f8ff";
    loadQuestion();
    checkButton.disabled = false;
  }, 1500);
}

createBoard();
