// Función para mostrar la sección seleccionada
function showSection(sectionId) {
  // Ocultar todas las secciones
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.remove('active'));

  // Mostrar la sección seleccionada
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Cambio de pestañas
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover clase active de todos los botones y contenidos
      document.querySelectorAll('.tab-button.active').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content.active').forEach(content => content.classList.remove('active'));
      
      // Agregar clase active al botón clickeado
      button.classList.add('active');
      
      // Mostrar el contenido correspondiente
      const tabId = button.getAttribute('data-tab') + '-tab';
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Modal de fórmulas
  const formulaButtons = document.querySelectorAll('.formula-btn');
  const formulaModal = document.querySelector('.formula-modal');
  const closeModal = document.querySelector('.close-modal');
  
  formulaButtons.forEach(button => {
    button.addEventListener('click', () => {
      formulaModal.classList.add('active');
    });
  });
  
  closeModal.addEventListener('click', () => {
    formulaModal.classList.remove('active');
  });
  
  // Cambio de pestañas en el modal
  const formulaTabButtons = document.querySelectorAll('.formula-tab-btn');
  formulaTabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover clase active de todos los botones y contenidos del modal
      document.querySelectorAll('.formula-tab-btn.active').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.formula-content.active').forEach(content => content.classList.remove('active'));
      
      // Agregar clase active al botón clickeado
      button.classList.add('active');
      
      // Mostrar el contenido correspondiente
      const formulasId = button.getAttribute('data-formulas');
      document.getElementById(formulasId).classList.add('active');
    });
  });
  
  // Ejemplos clickables
  const exampleChips = document.querySelectorAll('.example-chip');
  const calcInput = document.getElementById('calc-input');
  
  exampleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      calcInput.value = chip.textContent;
    });
  });
  
  // Historial - usar expresiones anteriores
  const historyUseButtons = document.querySelectorAll('.history-use');
  historyUseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const expression = button.closest('.history-item').querySelector('.history-expression').textContent;
      calcInput.value = expression;
    });
  });
});


// -----------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  // Referencias a elementos del DOM
  const calcInput = document.getElementById('calc-input');
  const solveBtn = document.getElementById('solve-btn');
  const calcResult = document.getElementById('calc-result');
  const calcHistory = document.getElementById('calc-history');
  const clearHistoryBtn = document.querySelector('.clear-btn');
  
  // Cambio de pestañas
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-button.active').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content.active').forEach(content => content.classList.remove('active'));
      
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab') + '-tab';
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Modal de fórmulas
  const formulaButtons = document.querySelectorAll('.formula-btn');
  const formulaModal = document.querySelector('.formula-modal');
  const closeModal = document.querySelector('.close-modal');
  
  formulaButtons.forEach(button => {
    button.addEventListener('click', () => {
      formulaModal.classList.add('active');
    });
  });
  
  closeModal.addEventListener('click', () => {
    formulaModal.classList.remove('active');
  });
  
  // Cambio de pestañas en el modal
  const formulaTabButtons = document.querySelectorAll('.formula-tab-btn');
  formulaTabButtons.forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.formula-tab-btn.active').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.formula-content.active').forEach(content => content.classList.remove('active'));
      
      button.classList.add('active');
      const formulasId = button.getAttribute('data-formulas');
      document.getElementById(formulasId).classList.add('active');
    });
  });
  
  // Diccionario de símbolos para la traducción - MEJORADO
  const symbolMap = {
    'π': 'PI',
    '√': 'sqrt',
    '∛': 'cbrt',
    '∫': 'integrate',
    'log': 'log',
    'ln': 'log',
    '≤': '<=',
    '≥': '>=',
    '÷': '/',
    '×': '*',
    '⋅': '*',
    'x²': 'x^2',
    'x³': 'x^3',
    'xⁿ': 'x^n',
    'd/dx': 'derivative',
    '∂/∂x': 'derivative',
    '∠': 'angle',
    '⊥': 'perpendicular',
    '∥': 'parallel',
    '△': 'triangle',
    '□': 'square',
    '○': 'circle',
    '°': 'deg',
    'x̄': 'mean',
    'Med': 'median',
    'Mod': 'mode',
    'σ': 'std',
    'σ²': 'variance',
    '∑': 'sum',
    'Q': 'quartile',
    'n!': 'factorial',
    'C(n,r)': 'combinations',
    'P(n,r)': 'permutations',
    'P(A)': 'probability',
    'P(A|B)': 'conditional',
    '∪': 'union',
    '∩': 'intersection',
    'sin': 'sin',
    'cos': 'cos',
    'tan': 'tan',
    'csc': 'csc',
    'sec': 'sec',
    'cot': 'cot',
    'arcsin': 'asin',
    'arccos': 'acos',
    'arctan': 'atan',
    '|x|': 'abs(x)',
    '^': '^'
  };
  
  // Ejemplos clickables
  const exampleChips = document.querySelectorAll('.example-chip');
  
  exampleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      calcInput.value = chip.textContent;
    });
  });
  
  // Historial - usar expresiones anteriores
  function setupHistoryButtons() {
    const historyUseButtons = document.querySelectorAll('.history-use');
    historyUseButtons.forEach(button => {
      button.addEventListener('click', () => {
        const expression = button.closest('.history-item').querySelector('.history-expression').textContent;
        calcInput.value = expression;
      });
    });
    
    const historyDeleteButtons = document.querySelectorAll('.history-delete');
    historyDeleteButtons.forEach(button => {
      button.addEventListener('click', () => {
        button.closest('.history-item').remove();
      });
    });
  }
  
  // Inicializar los botones del historial existente
  setupHistoryButtons();
  
  // Botones matemáticos - MEJORADO
  const mathButtons = document.querySelectorAll('.math-btn');
  mathButtons.forEach(button => {
    button.addEventListener('click', () => {
      const symbol = button.textContent;
      // Agregar espacio antes y después de operadores para mejorar la legibilidad
      if (['+', '-', '×', '÷', '=', '<', '>', '≤', '≥'].includes(symbol)) {
        insertAtCursor(calcInput, ` ${symbol} `);
      } else {
        insertAtCursor(calcInput, symbol);
      }
    });
  });
  
  // Botones de herramientas
  const toolButtons = document.querySelectorAll('.tool-btn:not(.formula-btn)');
  toolButtons.forEach(button => {
    button.addEventListener('click', () => {
      const action = button.textContent.trim();
      handleToolAction(action, calcInput);
    });
  });
  
  // Resolver problema
  solveBtn.addEventListener('click', solveProblem);
  
  // Tecla Enter para resolver
  calcInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      solveProblem();
    }
  });
  
  // Limpiar historial
  clearHistoryBtn.addEventListener('click', clearHistory);
  
  // Función para insertar texto en la posición del cursor
  function insertAtCursor(input, text) {
    const startPos = input.selectionStart;
    const endPos = input.selectionEnd;
    const beforeText = input.value.substring(0, startPos);
    const afterText = input.value.substring(endPos, input.value.length);
    
    input.value = beforeText + text + afterText;
    input.selectionStart = input.selectionEnd = startPos + text.length;
    input.focus();
  }
  
  // Traducir expresión con símbolos especiales a la sintaxis de math.js - CORREGIDO
  function translateExpression(expression) {
    let translated = expression;
    
    // Pre-procesamiento para casos especiales antes de la traducción principal
    // Reemplazar notaciones matemáticas comunes
    translated = translated.replace(/(\d+)([a-zA-Z])/g, '$1*$2');  // 2x → 2*x
    translated = translated.replace(/([a-zA-Z])(\d+)/g, '$1^$2');  // x2 → x^2
    translated = translated.replace(/x²/g, 'x^2');
    translated = translated.replace(/x³/g, 'x^3');
    
    // Asegurarse que haya multiplicación explícita entre paréntesis: (2)(3) → (2)*(3)
   // translated = translated.replace(/\)(\(/g, ')*(');
    
    // Asegurarse que haya multiplicación explícita entre números y paréntesis: 2(3) → 2*(3)
    translated = translated.replace(/(\d+)(\()/g, '$1*$2');
    
    // Asegurarse que haya multiplicación explícita entre variables y paréntesis: x(3) → x*(3)
    translated = translated.replace(/([a-zA-Z])(\()/g, '$1*$2');
    
    // Reemplazar todos los símbolos conocidos
    for (const [symbol, mathJsEquivalent] of Object.entries(symbolMap)) {
      const safeSymbol = symbol.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(safeSymbol, 'g');
      translated = translated.replace(regex, mathJsEquivalent);
    }
    
    // Post-procesamiento para funciones y expresiones especiales
    
    // Convertir raíces cuadradas correctamente
    translated = translated.replace(/sqrt\s*(\w+)/g, 'sqrt($1)');
    translated = translated.replace(/sqrt\s*\(([^)]+)\)/g, 'sqrt($1)');
    
    // Convertir integrales
    translated = translated.replace(/integrate\s*(\w+)/g, 'integrate("$1", "x")');
    translated = translated.replace(/integrate\s*\(([^,]+)\)/g, 'integrate("$1", "x")');
    
    // Convertir derivadas
    translated = translated.replace(/derivative\s*(\w+)/g, 'derivative("$1", "x")');
    translated = translated.replace(/derivative\s*\(([^,]+)\)/g, 'derivative("$1", "x")');
    
    // Reemplazar potencias - asegurarse de manejar casos especiales
    translated = translated.replace(/(\w+)\^(\w+|\d+)/g, 'pow($1, $2)');
    
    // Manejar funciones trigonométricas
    translated = translated.replace(/(sin|cos|tan|asin|acos|atan)\s*(\w+)(?!\()/g, '$1($2)');
    
    // Valor absoluto
    translated = translated.replace(/\|([^|]+)\|/g, 'abs($1)');
    
    // Asegurar que PI sea reconocido como Math.PI
    translated = translated.replace(/\bPI\b/g, 'PI');
    
    // Log natural
    translated = translated.replace(/ln\s*\(([^)]+)\)/g, 'log($1)');
    
    console.log("Expresión original:", expression);
    console.log("Expresión traducida:", translated);
    
    return translated;
  }
  
  // Función para manejar acciones de herramientas - MEJORADO
  function handleToolAction(action, input) {
    const expression = input.value;
    const translatedExpr = translateExpression(expression);
    let result = '';
    
    try {
      switch(action) {
        case 'Simplificar':
          result = math.simplify(translatedExpr).toString();
          break;
        case 'Resolver para':
          // Asumimos que queremos resolver para x
          const equation = expression.split('=');
          if (equation.length === 2) {
            result = solveEquation(expression);
          } else {
            result = 'Formato incorrecto. Use: expresión = expresión';
          }
          break;
        case 'Inversa':
          if (expression.includes('(') && expression.includes(')')) {
            // Si es una función, calcular la inversa
            result = `f^(-1)(x) = (cálculo pendiente)`;
          } else {
            // Si es un número, calcular el recíproco
            const value = math.evaluate(translatedExpr);
            result = `1/${value} = ${1/value}`;
          }
          break;
        case 'Área':
          result = calculateGeometry(expression, 'area');
          break;
        case 'Perímetro':
          result = calculateGeometry(expression, 'perimeter');
          break;
        case 'Volumen':
          result = calculateGeometry(expression, 'volume');
          break;
        case 'Analizar datos':
          result = analyzeData(expression);
          break;
        case 'Regresión':
          result = linearRegression(expression);
          break;
        case 'Correlación':
          result = calculateCorrelation(expression);
          break;
        case 'Probabilidad':
          result = calculateProbability(expression);
          break;
        case 'Binomial':
          result = binomialDistribution(expression);
          break;
        case 'Normal':
          result = normalDistribution(expression);
          break;
        default:
          result = 'Acción no implementada';
      }
      
      // Mostrar resultado
      calcResult.innerHTML = `<p>${action}: <strong>${result}</strong></p>`;
      addToHistory(expression, result);
    } catch (error) {
      calcResult.innerHTML = `<p class="error">Error al ${action.toLowerCase()}: ${error.message}</p>`;
      console.error("Error completo:", error);
    }
  }
  
  // Función para resolver el problema principal - MEJORADO
  function solveProblem() {
    const expression = calcInput.value.trim();
    
    if (!expression) {
      calcResult.innerHTML = '<p class="error">Por favor ingrese un problema</p>';
      return;
    }
    
    try {
      // Verificar si es una ecuación (contiene un signo igual)
      if (expression.includes('=')) {
        const result = solveEquation(expression);
        
        // Mostrar resultado
        calcResult.innerHTML = `
          <p>Ecuación: <strong>${expression}</strong></p>
          <p>Solución: <strong>${result}</strong></p>
        `;
        
        // Añadir al historial
        addToHistory(expression, result);
      } else {
        // Es una expresión, evaluar normalmente
        const translatedExpr = translateExpression(expression);
        const result = math.evaluate(translatedExpr);
        
        // Formatear el resultado según el tipo
        let formattedResult;
        if (typeof result === 'number') {
          // Limitar a máximo 8 decimales para números
          formattedResult = Math.abs(result) < 0.000001 && result !== 0 ? 
                          result.toExponential(4) : 
                          result.toString().includes('.') ? 
                            Number(result.toFixed(8)).toString() : 
                            result.toString();
        } else {
          formattedResult = result.toString();
        }
        
        // Mostrar resultado
        calcResult.innerHTML = `
          <p>Expresión: <strong>${expression}</strong></p>
          <p>Resultado: <strong>${formattedResult}</strong></p>
          <p class="steps">Pasos: ${showCalculationSteps(translatedExpr)}</p>
        `;
        
        // Añadir al historial
        addToHistory(expression, formattedResult);
      }
    } catch (error) {
      calcResult.innerHTML = `<p class="error">Error al resolver: ${error.message}</p>`;
      console.error("Error completo:", error);
    }
  }
  
  // Función para resolver ecuaciones - MEJORADO
  function solveEquation(equation) {
    console.log("Resolviendo ecuación:", equation);
    
    // Separar la ecuación en lado izquierdo y derecho
    const sides = equation.split('=');
    
    if (sides.length !== 2) {
      throw new Error('La ecuación debe tener exactamente un signo =');
    }
    
    const leftSide = sides[0].trim();
    const rightSide = sides[1].trim();
    
    // Traducir ambos lados
    const leftTranslated = translateExpression(leftSide);
    const rightTranslated = translateExpression(rightSide);
    
    // Mover todo al lado izquierdo (restar el lado derecho de ambos lados)
    let expression = `(${leftTranslated})-(${rightTranslated})`;
    
    console.log("Expresión normalizada:", expression);
    
    // Identificar el tipo de ecuación
    if (expression.includes('^2') || expression.includes('pow(x, 2)')) {
      console.log("Detectada ecuación cuadrática");
      // Es una ecuación cuadrática, resolver usando la fórmula general
      return solveQuadraticEquation(equation);
    } else if (expression.includes('x')) {
      console.log("Detectada ecuación lineal");
      // Es una ecuación lineal
      return solveLinearEquation(equation);
    } else {
      console.log("Detectada expresión sin variables");
      // Es una expresión sin variables
      const result = math.evaluate(expression);
      return Math.abs(result) < 0.00001 ? 'La ecuación es una identidad (verdadera para todo x)' : 'La ecuación no tiene solución';
    }
  }
  
  // Función para resolver ecuaciones lineales - MEJORADA
  function solveLinearEquation(equation) {
    try {
      // Separar la ecuación
      const sides = equation.split('=');
      const leftSide = translateExpression(sides[0].trim());
      const rightSide = translateExpression(sides[1].trim());
      
      // Expresión: leftSide - rightSide = 0
      const expression = `(${leftSide})-(${rightSide})`;
      
      // Simplificar usando mathjs
      let simplified;
      try {
        simplified = math.simplify(expression).toString();
      } catch (e) {
        // Si la simplificación falla, usar la expresión original
        simplified = expression;
      }
      console.log("Ecuación lineal simplificada:", simplified);
      
      // Extraer coeficientes manualmente del polinomio simplificado
      let a = 0, b = 0;
      
      // Buscar el coeficiente de x
      const xMatch = simplified.match(/([+-]?\s*\d*\.?\d*)[\s*]?x/);
      if (xMatch && xMatch[1]) {
        let coef = xMatch[1].trim();
        if (coef === '+' || coef === '') {
          a = 1;
        } else if (coef === '-') {
          a = -1; 
        } else {
          a = parseFloat(coef);
        }
      } else if (simplified.includes('x')) {
        // Si hay una x pero no se capturó el coeficiente, debe ser 1 o -1
        a = simplified.includes('-x') ? -1 : 1;
      }
      
      // Buscar el término independiente
      const constMatch = simplified.match(/([+-]?\s*\d+\.?\d*)(?!\w)/);
      if (constMatch && constMatch[1]) {
        b = parseFloat(constMatch[1]);
      }
      
      console.log("Coeficientes de ecuación lineal:", {a, b});
      
      // Resolver la ecuación
      if (a === 0) {
        return b === 0 ? 'Infinitas soluciones' : 'Sin solución';
      }
      
      // Calcular la solución y redondear apropiadamente
      const solution = -b / a;
      return `x = ${Math.abs(solution) < 0.000001 && solution !== 0 ? 
              solution.toExponential(4) : solution.toFixed(4)}`;
    } catch (error) {
      console.error("Error en solveLinearEquation:", error);
      
      // Método alternativo por si falla el método principal
      try {
        // Usar el método de evaluación con sustitución
        const sides = equation.split('=');
        const leftSide = sides[0].trim();
        const rightSide = sides[1] ? sides[1].trim() : '0';
        
        const leftTranslated = translateExpression(leftSide);
        const rightTranslated = translateExpression(rightSide);
        
        // Crear una función que evalúe la ecuación para un valor dado de x
        const evaluateEquation = (x) => {
          const scope = { x: x };
          return math.evaluate(leftTranslated, scope) - math.evaluate(rightTranslated, scope);
        };
        
        // Búsqueda binaria para encontrar la solución
        let xMin = -1000;
        let xMax = 1000;
        let x, valor;
        
        for (let i = 0; i < 20; i++) { // 20 iteraciones suele ser suficiente para buena precisión
          x = (xMin + xMax) / 2;
          valor = evaluateEquation(x);
          
          if (Math.abs(valor) < 0.0001) {
            // Encontramos una solución muy cercana
            break;
          }
          
          if (valor < 0) {
            xMax = x;
          } else {
            xMin = x;
          }
        }
        
        return `x ≈ ${x.toFixed(4)}`;
      } catch (fallbackError) {
        console.error("Error en método alternativo:", fallbackError);
        return "Error al resolver la ecuación lineal";
      }
    }
  }
  
  // Función para resolver ecuaciones cuadráticas - MEJORADA
  function solveQuadraticEquation(equation) {
    try {
      // Separar la ecuación
      const sides = equation.split('=');
      const leftSide = translateExpression(sides[0].trim());
      const rightSide = translateExpression(sides[1].trim());
      
      // Expresión: leftSide - rightSide = 0
      const expression = `(${leftSide})-(${rightSide})`;
      
      // Simplificar la expresión
      let simplified;
      try {
        simplified = math.simplify(expression).toString();
      } catch (e) {
        // Si la simplificación falla, usar la expresión original
        simplified = expression;
      }
      console.log("Ecuación cuadrática simplificada:", simplified);
      
      // Extraer coeficientes manualmente de la forma ax^2 + bx + c = 0
      let a = 0, b = 0, c = 0;
      
      // Coeficiente de x^2
      const aMatch = simplified.match(/([+-]?\s*\d*\.?\d*)[\s*]?x\^2/);
      if (aMatch && aMatch[1]) {
        let coefA = aMatch[1].trim();
        if (coefA === '+' || coefA === '') {
          a = 1;
        } else if (coefA === '-') {
          a = -1;
        } else {
          a = parseFloat(coefA);
        }
      } else if (simplified.includes('x^2')) {
        // Si hay x^2 pero no se capturó el coeficiente, debe ser 1 o -1
        a = simplified.includes('-x^2') ? -1 : 1;
      } else if (simplified.includes('pow(x, 2)')) {
        // Buscar coeficiente en notación pow
        const powMatch = simplified.match(/([+-]?\s*\d*\.?\d*)[\s*]?pow\(x,\s*2\)/);
        if (powMatch && powMatch[1]) {
          let coefA = powMatch[1].trim();
          if (coefA === '+' || coefA === '') {
            a = 1;
          } else if (coefA === '-') {
            a = -1;
          } else {
            a = parseFloat(coefA);
          }
        } else {
          a = simplified.includes('-pow(x, 2)') ? -1 : 1;
        }
      }
      
      // Coeficiente de x
      const bMatch = simplified.match(/([+-]?\s*\d*\.?\d*)[\s*]?x(?!\^)/);
      if (bMatch && bMatch[1]) {
        let coefB = bMatch[1].trim();
        if (coefB === '+' || coefB === '') {
          b = 1;
        } else if (coefB === '-') {
          b = -1;
        } else {
          b = parseFloat(coefB);
        }
      } else if (simplified.match(/[^x\^]x[^\^]/)) {
        // Si hay una x (no seguida por ^) pero no se capturó el coeficiente, debe ser 1 o -1
        b = simplified.includes('-x') && !simplified.includes('-x^') ? -1 : 1;
      }
      
      // Término independiente
      const cMatch = simplified.match(/([+-]?\s*\d+\.?\d*)(?![a-zA-Z\^])/);
      if (cMatch && cMatch[1]) {
        c = parseFloat(cMatch[1]);
      }
      
      console.log("Coeficientes de ecuación cuadrática:", {a, b, c});
      
      // Si no es una ecuación cuadrática sino lineal
      if (a === 0) {
        return solveLinearEquation(equation);
      }
      
      // Aplicar la fórmula general: x = (-b ± √(b² - 4ac)) / (2a)
      const discriminante = b * b - 4 * a * c;
      
      if (discriminante < 0) {
        return 'Sin soluciones reales';
      } else if (Math.abs(discriminante) < 0.0001) { // Casi 0
        const x = -b / (2 * a);
        return `x = ${Math.abs(x) < 0.000001 && x !== 0 ? x.toExponential(4) : x.toFixed(4)}`;
      } else {
        const x1 = (-b + Math.sqrt(discriminante)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminante)) / (2 * a);
        return `x₁ = ${Math.abs(x1) < 0.000001 && x1 !== 0 ? x1.toExponential(4) : x1.toFixed(4)}, 
                x₂ = ${Math.abs(x2) < 0.000001 && x2 !== 0 ? x2.toExponential(4) : x2.toFixed(4)}`;
      }
    } catch (error) {
      console.error("Error en solveQuadraticEquation:", error);
      
      // Método alternativo que intenta detectar y extraer coeficientes directamente
      try {
        // Podrías implementar un método aún más robusto si fuera necesario
        return "No se pudo resolver la ecuación cuadrática automáticamente. Intente con el formato: ax² + bx + c = 0";
      } catch (fallbackError) {
        console.error("Error en método alternativo:", fallbackError);
        return "Error al resolver la ecuación cuadrática";
      }
    }
  }
  
  // Función para mostrar pasos de cálculo - MEJORADA
  function showCalculationSteps(expr) {
    try {
      const node = math.parse(expr);
      const steps = [];
      
      // Intenta simplificar paso a paso
      let current = expr;
      steps.push(current);
      
      // Simplificaciones básicas que podríamos mostrar
      try {
        current = math.simplify(current).toString();
        if (current !== steps[steps.length - 1]) {
          steps.push(current);
        }
        
        // Intenta evaluar si es posible (si no hay variables)
        if (!current.match(/[a-zA-Z]/)) {
          const evaluated = math.evaluate(current);
          if (evaluated.toString() !== current) {
            steps.push(evaluated.toString());
          }
        }
      } catch (e) {
        // Seguir si la simplificación falla
      }
      
      // Si es solo un paso, muestra la expresión original
      if (steps.length === 1) {
        return node.toString({parenthesis: 'keep'});
      }
      
      // Mostrar los pasos
      return steps.join(' → ');
    } catch (error) {
      console.error("Error al mostrar pasos:", error);
      return 'No se pudieron mostrar los pasos detallados';
    }
  }
  
  // Función para añadir al historial
  function addToHistory(expression, result) {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    
    historyItem.innerHTML = `
      <div class="history-expression">${expression}</div>
      <div class="history-result">${result}</div>
      <div class="history-actions">
        <button class="history-use" title="Usar esta expresión">Usar</button>
        <button class="history-delete" title="Eliminar del historial">×</button>
      </div>
    `;
    
    // Insertar al principio
    calcHistory.insertBefore(historyItem, calcHistory.firstChild);
    
    // Configurar eventos para los nuevos botones
    const useBtn = historyItem.querySelector('.history-use');
    useBtn.addEventListener('click', () => {
      calcInput.value = expression;
    });
    
    const deleteBtn = historyItem.querySelector('.history-delete');
    deleteBtn.addEventListener('click', () => {
      historyItem.remove();
    });
    
    // Limitar historial a 50 items
    if (calcHistory.children.length > 50) {
      calcHistory.removeChild(calcHistory.lastChild);
    }
  }
  
  // Función para limpiar historial
  function clearHistory() {
    while (calcHistory.firstChild) {
      calcHistory.removeChild(calcHistory.firstChild);
    }
  }
  
  // Funciones específicas para geometría - MEJORADO
// Funciones específicas para geometría - IMPLEMENTACIÓN COMPLETA
function calculateGeometry(expression, type) {
  try {
    const parts = expression.toLowerCase().split(',');
    let result = '';
    
    // Detectar la forma geométrica
    if (parts[0].includes('circulo') || parts[0].includes('círculo')) {
      const radius = parseFloat(parts[1]) || 0;
      
      switch(type) {
        case 'area':
          result = `Área del círculo con radio ${radius}: ${(Math.PI * radius * radius).toFixed(4)} unidades²`;
          break;
        case 'perimeter':
          result = `Perímetro del círculo con radio ${radius}: ${(2 * Math.PI * radius).toFixed(4)} unidades`;
          break;
        case 'volume':
          result = 'No aplicable para círculos (figura bidimensional)';
          break;
      }
    } else if (parts[0].includes('rectangulo') || parts[0].includes('rectángulo')) {
      const width = parseFloat(parts[1]) || 0;
      const height = parseFloat(parts[2]) || 0;
      
      switch(type) {
        case 'area':
          result = `Área del rectángulo ${width}×${height}: ${(width * height).toFixed(4)} unidades²`;
          break;
        case 'perimeter':
          result = `Perímetro del rectángulo ${width}×${height}: ${(2 * (width + height)).toFixed(4)} unidades`;
          break;
        case 'volume':
          result = 'No aplicable para rectángulos (figura bidimensional)';
          break;
      }
    } else if (parts[0].includes('triangulo') || parts[0].includes('triángulo')) {
      // Para triángulos - podemos recibir lados o base y altura
      if (parts.length >= 4) {
        // Tenemos los tres lados
        const a = parseFloat(parts[1]) || 0;
        const b = parseFloat(parts[2]) || 0;
        const c = parseFloat(parts[3]) || 0;
        
        switch(type) {
          case 'area':
            // Fórmula de Herón
            const s = (a + b + c) / 2;
            const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
            result = `Área del triángulo con lados ${a}, ${b}, ${c}: ${area.toFixed(4)} unidades²`;
            break;
          case 'perimeter':
            result = `Perímetro del triángulo con lados ${a}, ${b}, ${c}: ${(a + b + c).toFixed(4)} unidades`;
            break;
          case 'volume':
            result = 'No aplicable para triángulos (figura bidimensional)';
            break;
        }
      } else {
        // Base y altura
        const base = parseFloat(parts[1]) || 0;
        const height = parseFloat(parts[2]) || 0;
        
        switch(type) {
          case 'area':
            result = `Área del triángulo con base ${base} y altura ${height}: ${(0.5 * base * height).toFixed(4)} unidades²`;
            break;
          case 'perimeter':
            result = 'Se necesitan los tres lados para calcular el perímetro';
            break;
          case 'volume':
            result = 'No aplicable para triángulos (figura bidimensional)';
            break;
        }
      }
    } else if (parts[0].includes('cubo')) {
      const side = parseFloat(parts[1]) || 0;
      
      switch(type) {
        case 'area':
          result = `Área superficial del cubo con lado ${side}: ${(6 * side * side).toFixed(4)} unidades²`;
          break;
        case 'perimeter':
          result = `Suma de las aristas del cubo con lado ${side}: ${(12 * side).toFixed(4)} unidades`;
          break;
        case 'volume':
          result = `Volumen del cubo con lado ${side}: ${(side * side * side).toFixed(4)} unidades³`;
          break;
      }
    } else if (parts[0].includes('esfera')) {
      const radius = parseFloat(parts[1]) || 0;
      
      switch(type) {
        case 'area':
          result = `Área superficial de la esfera con radio ${radius}: ${(4 * Math.PI * radius * radius).toFixed(4)} unidades²`;
          break;
        case 'perimeter':
          result = 'No aplicable para esferas (no tienen perímetro)';
          break;
        case 'volume':
          result = `Volumen de la esfera con radio ${radius}: ${((4/3) * Math.PI * radius * radius * radius).toFixed(4)} unidades³`;
          break;
      }
    } else if (parts[0].includes('cilindro')) {
      const radius = parseFloat(parts[1]) || 0;
      const height = parseFloat(parts[2]) || 0;
      
      switch(type) {
        case 'area':
          const baseArea = Math.PI * radius * radius;
          const lateralArea = 2 * Math.PI * radius * height;
          result = `Área superficial del cilindro con radio ${radius} y altura ${height}: ${(2 * baseArea + lateralArea).toFixed(4)} unidades²`;
          break;
        case 'perimeter':
          result = 'No aplicable para cilindros (figura tridimensional)';
          break;
        case 'volume':
          result = `Volumen del cilindro con radio ${radius} y altura ${height}: ${(Math.PI * radius * radius * height).toFixed(4)} unidades³`;
          break;
      }
    } else {
      result = `Formato no reconocido. Ejemplos: "circulo, 5" o "rectangulo, 4, 6"`;
    }
    
    return result;
  } catch (error) {
    console.error("Error en calculateGeometry:", error);
    return `Error al calcular la geometría: ${error.message}`;
  }
}

// Funciones para análisis estadístico - IMPLEMENTACIÓN COMPLETA
function analyzeData(dataText) {
  try {
    // Separar los datos por comas, espacios o tabulaciones
    const cleanData = dataText.replace(/\s+/g, ',').replace(/,+/g, ',').trim();
    const dataStrings = cleanData.split(',');
    const data = dataStrings.map(str => parseFloat(str)).filter(val => !isNaN(val));
    
    if (data.length === 0) {
      return "No se encontraron datos numéricos válidos";
    }
    
    // Ordenar los datos para facilitar cálculos
    const sortedData = [...data].sort((a, b) => a - b);
    
    // Calcular estadística básica
    const n = data.length;
    const sum = data.reduce((acc, val) => acc + val, 0);
    const mean = sum / n;
    
    // Calcular mediana
    let median;
    if (n % 2 === 0) {
      median = (sortedData[n / 2 - 1] + sortedData[n / 2]) / 2;
    } else {
      median = sortedData[Math.floor(n / 2)];
    }
    
    // Calcular moda (el valor más frecuente)
    const frequencies = {};
    let maxFreq = 0;
    let modes = [];
    
    data.forEach(val => {
      frequencies[val] = (frequencies[val] || 0) + 1;
      if (frequencies[val] > maxFreq) {
        maxFreq = frequencies[val];
        modes = [val];
      } else if (frequencies[val] === maxFreq) {
        modes.push(val);
      }
    });
    
    const modeText = modes.length === data.length ? "No hay moda (todos los valores aparecen una vez)" :
                    modes.length > 3 ? "Múltiples modas" :
                    `${modes.map(m => m.toFixed(2)).join(', ')}`;
    
    // Calcular desviación estándar
    const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    
    // Cuartiles
    const q1 = sortedData[Math.floor(n * 0.25)];
    const q3 = sortedData[Math.floor(n * 0.75)];
    
    // Rango y rango intercuartílico
    const range = sortedData[n - 1] - sortedData[0];
    const iqr = q3 - q1;
    
    // Construir resultado en formato legible
    let result = `
Análisis Estadístico (n=${n}):
• Media: ${mean.toFixed(4)}
• Mediana: ${median.toFixed(4)}
• Moda: ${modeText}
• Desviación estándar: ${stdDev.toFixed(4)}
• Varianza: ${variance.toFixed(4)}
• Mínimo: ${sortedData[0].toFixed(4)}
• Máximo: ${sortedData[n - 1].toFixed(4)}
• Rango: ${range.toFixed(4)}
• Q1 (25%): ${q1.toFixed(4)}
• Q3 (75%): ${q3.toFixed(4)}
• Rango intercuartílico: ${iqr.toFixed(4)}
    `;
    
    return result;
  } catch (error) {
    console.error("Error en analyzeData:", error);
    return `Error al analizar datos: ${error.message}`;
  }
}

// Funciones para regresión lineal - IMPLEMENTACIÓN COMPLETA
function linearRegression(dataText) {
  try {
    // Extraer pares de datos (x,y) del texto
    // Aceptamos formatos como "1,2 3,4 5,6" o "(1,2) (3,4) (5,6)" o "1,2; 3,4; 5,6"
    dataText = dataText.replace(/[()[\]{}]/g, ''); // Eliminar paréntesis
    
    // Intentar detectar el formato de los datos
    let pairs = [];
    if (dataText.includes(';')) {
      // Formato "x,y; x,y; x,y"
      pairs = dataText.split(';').map(pair => pair.trim().split(',').map(Number));
    } else if (dataText.includes('\n')) {
      // Formato de múltiples líneas
      pairs = dataText.split('\n').map(line => line.trim().split(/[,\s]+/).map(Number));
    } else {
      // Intentar con espacios como separadores de pares
      const potentialPairs = dataText.split(/\s+/);
      if (potentialPairs.length > 0 && potentialPairs[0].includes(',')) {
        // Formato "x,y x,y x,y"
        pairs = potentialPairs.map(pair => pair.trim().split(',').map(Number));
      } else {
        // Formato "x y x y x y" (valores alternados)
        const values = dataText.split(/[,\s]+/).map(Number);
        for (let i = 0; i < values.length; i += 2) {
          if (i + 1 < values.length) {
            pairs.push([values[i], values[i + 1]]);
          }
        }
      }
    }
    
    // Filtrar pares inválidos
    pairs = pairs.filter(pair => pair.length === 2 && !isNaN(pair[0]) && !isNaN(pair[1]));
    
    if (pairs.length < 2) {
      return "Se necesitan al menos dos pares de datos para la regresión lineal";
    }
    
    // Extraer arrays x e y
    const xs = pairs.map(pair => pair[0]);
    const ys = pairs.map(pair => pair[1]);
    
    // Calcular regresión lineal: y = mx + b
    const n = pairs.length;
    const sumX = xs.reduce((acc, val) => acc + val, 0);
    const sumY = ys.reduce((acc, val) => acc + val, 0);
    const sumXY = pairs.reduce((acc, pair) => acc + pair[0] * pair[1], 0);
    const sumXX = xs.reduce((acc, val) => acc + val * val, 0);
    
    const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const b = (sumY - m * sumX) / n;
    
    // Calcular coeficiente de determinación (R²)
    const meanY = sumY / n;
    const totalVariation = ys.reduce((acc, y) => acc + Math.pow(y - meanY, 2), 0);
    
    // Calcular valores predichos y residuos
    const predicted = xs.map(x => m * x + b);
    const residualVariation = ys.reduce((acc, y, i) => acc + Math.pow(y - predicted[i], 2), 0);
    
    // R² = 1 - (residual variation / total variation)
    const rSquared = 1 - (residualVariation / totalVariation);
    
    // Calcular coeficiente de correlación (r)
    const r = Math.sqrt(rSquared) * (m >= 0 ? 1 : -1);
    
    return `
Regresión Lineal (n=${n} puntos):
• Ecuación: y = ${m.toFixed(4)}x + ${b.toFixed(4)}
• Pendiente (m): ${m.toFixed(4)}
• Intercepto (b): ${b.toFixed(4)}
• Coeficiente de determinación (R²): ${rSquared.toFixed(4)}
• Coeficiente de correlación (r): ${r.toFixed(4)}
    `;
  } catch (error) {
    console.error("Error en linearRegression:", error);
    return `Error al calcular la regresión lineal: ${error.message}`;
  }
}

// Función para calcular correlación - IMPLEMENTACIÓN COMPLETA
function calculateCorrelation(dataText) {
  try {
    // Reutilizar análisis del formato de los datos de la función de regresión
    dataText = dataText.replace(/[()[\]{}]/g, ''); // Eliminar paréntesis
    
    // Intentar detectar el formato de los datos
    let pairs = [];
    if (dataText.includes(';')) {
      // Formato "x,y; x,y; x,y"
      pairs = dataText.split(';').map(pair => pair.trim().split(',').map(Number));
    } else if (dataText.includes('\n')) {
      // Formato de múltiples líneas
      pairs = dataText.split('\n').map(line => line.trim().split(/[,\s]+/).map(Number));
    } else {
      // Intentar con espacios como separadores de pares
      const potentialPairs = dataText.split(/\s+/);
      if (potentialPairs.length > 0 && potentialPairs[0].includes(',')) {
        // Formato "x,y x,y x,y"
        pairs = potentialPairs.map(pair => pair.trim().split(',').map(Number));
      } else {
        // Formato "x y x y x y" (valores alternados)
        const values = dataText.split(/[,\s]+/).map(Number);
        for (let i = 0; i < values.length; i += 2) {
          if (i + 1 < values.length) {
            pairs.push([values[i], values[i + 1]]);
          }
        }
      }
    }
    
    // Filtrar pares inválidos
    pairs = pairs.filter(pair => pair.length === 2 && !isNaN(pair[0]) && !isNaN(pair[1]));
    
    if (pairs.length < 2) {
      return "Se necesitan al menos dos pares de datos para calcular la correlación";
    }
    
    // Extraer arrays x e y
    const xs = pairs.map(pair => pair[0]);
    const ys = pairs.map(pair => pair[1]);
    
    // Calcular correlación de Pearson
    const n = pairs.length;
    const sumX = xs.reduce((acc, val) => acc + val, 0);
    const sumY = ys.reduce((acc, val) => acc + val, 0);
    const sumXY = pairs.reduce((acc, pair) => acc + pair[0] * pair[1], 0);
    const sumXX = xs.reduce((acc, val) => acc + val * val, 0);
    const sumYY = ys.reduce((acc, val) => acc + val * val, 0);
    
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));
    
    const r = numerator / denominator;
    const rSquared = r * r;
    
    // Interpretar el coeficiente de correlación
    let interpretation;
    const absR = Math.abs(r);
    
    if (absR > 0.9) {
      interpretation = "Correlación muy fuerte";
    } else if (absR > 0.7) {
      interpretation = "Correlación fuerte";
    } else if (absR > 0.5) {
      interpretation = "Correlación moderada";
    } else if (absR > 0.3) {
      interpretation = "Correlación débil";
    } else {
      interpretation = "Correlación muy débil o inexistente";
    }
    
    if (r < 0) {
      interpretation += " negativa";
    } else if (r > 0) {
      interpretation += " positiva";
    }
    
    return `
Análisis de Correlación (n=${n} puntos):
• Coeficiente de correlación de Pearson (r): ${r.toFixed(4)}
• Coeficiente de determinación (R²): ${rSquared.toFixed(4)}
• Interpretación: ${interpretation}
    `;
  } catch (error) {
    console.error("Error en calculateCorrelation:", error);
    return `Error al calcular la correlación: ${error.message}`;
  }
}

// Función para calcular probabilidad - IMPLEMENTACIÓN COMPLETA
function calculateProbability(expression) {
  try {
    // Verificar si la expresión contiene una probabilidad condicional
    if (expression.includes('|')) {
      // Probabilidad condicional P(A|B)
      const parts = expression.split('|');
      const eventA = parts[0].trim().replace(/P\s*\(\s*/, '').replace(/\s*\)\s*$/, '');
      const eventB = parts[1].trim().replace(/\s*\)\s*$/, '');
      
      return `Probabilidad condicional P(${eventA}|${eventB}): Especifique los valores numéricos para calcular.`;
    } else if (expression.includes('∩') || expression.includes('intersección')) {
      // Probabilidad de intersección P(A∩B)
      let events;
      if (expression.includes('∩')) {
        events = expression.split('∩').map(e => e.trim().replace(/P\s*\(\s*/, '').replace(/\s*\)\s*$/, ''));
      } else {
        events = expression.split('intersección').map(e => e.trim().replace(/P\s*\(\s*/, '').replace(/\s*\)\s*$/, ''));
      }
      
      return `Probabilidad de intersección P(${events.join('∩')}): Especifique los valores numéricos para calcular.`;
    } else if (expression.includes('∪') || expression.includes('unión')) {
      // Probabilidad de unión P(A∪B)
      let events;
      if (expression.includes('∪')) {
        events = expression.split('∪').map(e => e.trim().replace(/P\s*\(\s*/, '').replace(/\s*\)\s*$/, ''));
      } else {
        events = expression.split('unión').map(e => e.trim().replace(/P\s*\(\s*/, '').replace(/\s*\)\s*$/, ''));
      }
      
      return `Probabilidad de unión P(${events.join('∪')}): Especifique los valores numéricos para calcular.`;
    } else {
      // Intentar interpretar como una expresión numérica directa
      try {
        // Traducir la expresión y evaluarla
        const translatedExpr = translateExpression(expression);
        const result = math.evaluate(translatedExpr);
        
        if (typeof result === 'number' && result >= 0 && result <= 1) {
          return `Probabilidad P = ${result.toFixed(4)}`;
        } else {
          return `El resultado ${result} no es una probabilidad válida (debe estar entre 0 y 1)`;
        }
      } catch (e) {
        // Si no podemos evaluar, devolver un mensaje genérico
        return `Probabilidad: Especifique la expresión en formato evaluable.`;
      }
    }
  } catch (error) {
    console.error("Error en calculateProbability:", error);
    return `Error al calcular la probabilidad: ${error.message}`;
  }
}

// Función para distribución binomial - IMPLEMENTACIÓN COMPLETA
function binomialDistribution(expression) {
  try {
    // Buscar valores de n, p y k
    // Formatos aceptados: "n=10, p=0.5, k=3" o "10, 0.5, 3" o "binomial(10, 0.5, 3)"
    let n, p, k;
    
    // Eliminar "binomial(" y ")" si están presentes
    expression = expression.replace(/binomial\s*\(\s*/, '').replace(/\s*\)\s*$/, '');
    
    // Dividir por comas
    const parts = expression.split(',').map(part => part.trim());
    
    if (parts.length >= 3) {
      // Extraer n, p y k
      for (const part of parts) {
        if (part.includes('=')) {
          const [param, value] = part.split('=').map(item => item.trim());
          if (param.toLowerCase() === 'n') n = parseFloat(value);
          else if (param.toLowerCase() === 'p') p = parseFloat(value);
          else if (param.toLowerCase() === 'k') k = parseFloat(value);
        }
      }
      
      // Si no se encontraron etiquetas, asumir orden n, p, k
      if (n === undefined) n = parseFloat(parts[0]);
      if (p === undefined) p = parseFloat(parts[1]);
      if (k === undefined) k = parseFloat(parts[2]);
    }
    
    // Validar parámetros
    if (isNaN(n) || isNaN(p) || (k !== undefined && isNaN(k))) {
      return "Parámetros inválidos. Formato: n=intentos, p=probabilidad, k=éxitos";
    }
    
    if (n <= 0 || !Number.isInteger(n)) {
      return "n debe ser un entero positivo";
    }
    
    if (p < 0 || p > 1) {
      return "p debe estar entre 0 y 1";
    }
    
    // Función para calcular combinaciones (n choose k)
    function combinations(n, k) {
      // Si k está fuera de rango, retornar 0
      if (k < 0 || k > n) return 0;
      
      // Optimización para valores extremos
      if (k > n - k) k = n - k;
      
      let result = 1;
      for (let i = 1; i <= k; i++) {
        result *= (n - (k - i));
        result /= i;
      }
      
      return result;
    }
    
    // Función para calcular la PMF (Función de Masa de Probabilidad) binomial
    function binomialPMF(n, p, k) {
      return combinations(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
    }
    
    // Si se proporciona k, calcular P(X = k)
    if (k !== undefined) {
      if (k < 0 || !Number.isInteger(k) || k > n) {
        return "k debe ser un entero entre 0 y n";
      }
      
      const probability = binomialPMF(n, p, k);
      
      return `
Distribución Binomial B(${n}, ${p}):
• Probabilidad de exactamente ${k} éxitos: P(X = ${k}) = ${probability.toFixed(6)}
      `;
    } else {
      // Calcular la media y la varianza
      const mean = n * p;
      const variance = n * p * (1 - p);
      const stdDev = Math.sqrt(variance);
      
      // Calcular probabilidades para algunos valores clave
      let results = `
Distribución Binomial B(${n}, ${p}):
• Media: ${mean.toFixed(4)}
• Varianza: ${variance.toFixed(4)}
• Desviación estándar: ${stdDev.toFixed(4)}
      `;
      
      // Añadir tabla de probabilidades para valores pequeños de n
      if (n <= 20) {
        results += `\nTabla de probabilidades P(X = k):`;
        for (let i = 0; i <= Math.min(10, n); i++) {
          const prob = binomialPMF(n, p, i);
          results += `\n• P(X = ${i}) = ${prob.toFixed(6)}`;
        }
      }
      
      return results;
    }
  } catch (error) {
    console.error("Error en binomialDistribution:", error);
    return `Error al calcular la distribución binomial: ${error.message}`;
  }
}

    // -----------------------------------------------------------------------------------------------------------------------------------------------------
// Función para distribución normal - IMPLEMENTACIÓN COMPLETA
function normalDistribution(expression) {
  try {
    // Buscar valores de media (μ), desviación estándar (σ) y x
    // Formatos aceptados: "μ=0, σ=1, x=1.96" o "0, 1, 1.96" o "normal(0, 1, 1.96)"
    let mean, stdDev, x, operation;
    
    // Eliminar "normal(" y ")" si están presentes
    expression = expression.replace(/normal\s*\(\s*/, '').replace(/\s*\)\s*$/, '');
    
    // Dividir por comas
    const parts = expression.split(',').map(part => part.trim());
    
    if (parts.length >= 2) {
      // Extraer μ, σ y posiblemente x
      for (const part of parts) {
        if (part.includes('=')) {
          const [param, value] = part.split('=').map(item => item.trim());
          if (param === 'μ' || param.toLowerCase() === 'mu' || param.toLowerCase() === 'mean') {
            mean = parseFloat(value);
          } else if (param === 'σ' || param.toLowerCase() === 'sigma' || param.toLowerCase() === 'std') {
            stdDev = parseFloat(value);
          } else if (param.toLowerCase() === 'x') {
            x = parseFloat(value);
          } else if (param.toLowerCase() === 'op' || param.toLowerCase() === 'operation') {
            operation = value.trim();
          }
        } else if (part.includes('<') || part.includes('>') || part.includes('≤') || part.includes('≥')) {
          // Es una operación como "x < 1.96"
          const matches = part.match(/(.*?)(<|>|≤|≥)(.*)/);
          if (matches && matches.length === 4) {
            const left = matches[1].trim();
            operation = matches[2];
            const right = matches[3].trim();
            
            if (left.toLowerCase() === 'x') {
              x = parseFloat(right);
            } else if (right.toLowerCase() === 'x') {
              x = parseFloat(left);
              // Invertir la operación si x está a la derecha
              operation = operation === '<' ? '>' : operation === '>' ? '<' : 
                          operation === '≤' ? '≥' : operation === '≥' ? '≤' : operation;
            }
          }
        }
      }
      
      // Si no se encontraron etiquetas, asumir orden μ, σ, x
      if (mean === undefined) mean = parseFloat(parts[0]);
      if (stdDev === undefined) stdDev = parseFloat(parts[1]);
      if (x === undefined && parts.length >= 3) x = parseFloat(parts[2]);
    }
    
    // Validar parámetros
    if (isNaN(mean) || isNaN(stdDev)) {
      return "Parámetros inválidos. Formato: μ=media, σ=desviación estándar, x=valor (opcional)";
    }
    
    if (stdDev <= 0) {
      return "La desviación estándar (σ) debe ser positiva";
    }
    
    // Función para aproximar la función de distribución acumulativa normal estándar (CDF)
    function normalCDF(z) {
      // Aproximación de la función error
      function erf(x) {
        // Constantes
        const a1 =  0.254829592;
        const a2 = -0.284496736;
        const a3 =  1.421413741;
        const a4 = -1.453152027;
        const a5 =  1.061405429;
        const p  =  0.3275911;

        // Guardar el signo de x
        const sign = x < 0 ? -1 : 1;
        x = Math.abs(x);
        
        // Aproximación de Abramowitz y Stegun
        const t = 1.0 / (1.0 + p * x);
        const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
        
        return sign * y;
      }
      
      return 0.5 * (1 + erf(z / Math.sqrt(2)));
    }
    
    // Función para calcular la densidad de probabilidad (PDF)
    function normalPDF(z) {
      return Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
    }
    
    // Si se proporciona x, calcular probabilidades
    if (x !== undefined) {
      // Calcular z-score
      const z = (x - mean) / stdDev;
      
      // Determinar qué operación calcular
      let probability, operationText;
      if (!operation) {
        // Por defecto, calcular P(X ≤ x)
        probability = normalCDF(z);
        operationText = `P(X ≤ ${x})`;
      } else {
        switch(operation) {
          case '<':
            probability = normalCDF(z);
            operationText = `P(X < ${x})`;
            break;
          case '>':
            probability = 1 - normalCDF(z);
            operationText = `P(X > ${x})`;
            break;
          case '≤':
            probability = normalCDF(z);
            operationText = `P(X ≤ ${x})`;
            break;
          case '≥':
            probability = 1 - normalCDF(z);
            operationText = `P(X ≥ ${x})`;
            break;
          default:
            // Asumir que es un rango (ej. "1 < x < 2")
            const rangeParts = operation.split(/[<>≤≥]+/).map(part => parseFloat(part.trim()));
            if (rangeParts.length === 2 && !isNaN(rangeParts[0]) && !isNaN(rangeParts[1])) {
              const z1 = (rangeParts[0] - mean) / stdDev;
              const z2 = (rangeParts[1] - mean) / stdDev;
              probability = normalCDF(z2) - normalCDF(z1);
              operationText = `P(${rangeParts[0]} < X < ${rangeParts[1]})`;
            } else {
              return "Operación no reconocida. Use <, >, ≤, ≥ o un rango como '1 < x < 2'";
            }
        }
      }
      
      // Calcular densidad de probabilidad
      const density = normalPDF(z) / stdDev;
      
      return `
Distribución Normal N(${mean}, ${stdDev}²):
• ${operationText} = ${probability.toFixed(6)}
• Densidad de probabilidad en x=${x}: ${density.toFixed(6)}
• Z-score: ${z.toFixed(4)}
      `;
    } else {
      // Mostrar información general de la distribución
      return `
Distribución Normal N(${mean}, ${stdDev}²):
• Media (μ): ${mean}
• Desviación estándar (σ): ${stdDev}
• Varianza (σ²): ${stdDev * stdDev}
• Para calcular probabilidades, especifique un valor x (ej. "μ=0, σ=1, x=1.96")
      `;
    }
  } catch (error) {
    console.error("Error en normalDistribution:", error);
    return `Error al calcular la distribución normal: ${error.message}`;
  }
}

// Función para manejar operaciones con matrices - IMPLEMENTACIÓN COMPLETA
function matrixOperations(expression, operation) {
  try {
    // Extraer matrices de la expresión
    // Formatos aceptados: "[1,2;3,4]", "[[1,2],[3,4]]", "1 2;3 4"
    const matrices = [];
    let currentMatrix = [];
    
    // Normalizar la expresión
    expression = expression.replace(/\s+/g, '');
    
    // Dividir en matrices si hay múltiples (separadas por algo)
    const matrixParts = expression.split(/[^\d\.,;\[\]]+/).filter(part => part.trim() !== '');
    
    for (const part of matrixParts) {
      let matrixStr = part;
      
      // Eliminar corchetes exteriores si existen
      if (matrixStr.startsWith('[') && matrixStr.endsWith(']')) {
        matrixStr = matrixStr.slice(1, -1);
      }
      
      // Dividir en filas
      const rows = matrixStr.split(';').filter(row => row.trim() !== '');
      const matrix = [];
      
      for (const row of rows) {
        // Dividir cada fila en elementos
        const elements = row.split(',').filter(el => el.trim() !== '');
        const numElements = elements.map(el => parseFloat(el));
        
        if (numElements.length > 0) {
          matrix.push(numElements);
        }
      }
      
      if (matrix.length > 0) {
        matrices.push(math.matrix(matrix));
      }
    }
    
    if (matrices.length === 0) {
      return "No se encontraron matrices válidas en la expresión";
    }
    
    // Realizar la operación solicitada
    let result;
    switch(operation.toLowerCase()) {
      case 'determinante':
        if (matrices.length !== 1) {
          return "Se necesita exactamente una matriz para calcular el determinante";
        }
        if (matrices[0].size().length !== 2 || matrices[0].size()[0] !== matrices[0].size()[1]) {
          return "La matriz debe ser cuadrada para calcular el determinante";
        }
        result = math.det(matrices[0]);
        return `Determinante: ${result}`;
        
      case 'inversa':
        if (matrices.length !== 1) {
          return "Se necesita exactamente una matriz para calcular la inversa";
        }
        if (matrices[0].size().length !== 2 || matrices[0].size()[0] !== matrices[0].size()[1]) {
          return "La matriz debe ser cuadrada para calcular la inversa";
        }
        try {
          result = math.inv(matrices[0]);
          return `Matriz inversa:\n${result.toString()}`;
        } catch (e) {
          return "La matriz es singular (no tiene inversa)";
        }
        
      case 'transpuesta':
        if (matrices.length !== 1) {
          return "Se necesita exactamente una matriz para calcular la transpuesta";
        }
        result = math.transpose(matrices[0]);
        return `Matriz transpuesta:\n${result.toString()}`;
        
      case 'multiplicar':
        if (matrices.length !== 2) {
          return "Se necesitan exactamente dos matrices para multiplicar";
        }
        try {
          result = math.multiply(matrices[0], matrices[1]);
          return `Producto matricial:\n${result.toString()}`;
        } catch (e) {
          return "Las dimensiones de las matrices no son compatibles para multiplicación";
        }
        
      case 'sumar':
        if (matrices.length !== 2) {
          return "Se necesitan exactamente dos matrices para sumar";
        }
        try {
          result = math.add(matrices[0], matrices[1]);
          return `Suma matricial:\n${result.toString()}`;
        } catch (e) {
          return "Las matrices deben tener las mismas dimensiones para sumarse";
        }
        
      case 'restar':
        if (matrices.length !== 2) {
          return "Se necesitan exactamente dos matrices para restar";
        }
        try {
          result = math.subtract(matrices[0], matrices[1]);
          return `Resta matricial:\n${result.toString()}`;
        } catch (e) {
          return "Las matrices deben tener las mismas dimensiones para restarse";
        }
        
      case 'rango':
        if (matrices.length !== 1) {
          return "Se necesita exactamente una matriz para calcular el rango";
        }
        result = math.rank(matrices[0]);
        return `Rango de la matriz: ${result}`;
        
      default:
        return `Operación matricial "${operation}" no reconocida`;
    }
  } catch (error) {
    console.error("Error en matrixOperations:", error);
    return `Error al realizar operación matricial: ${error.message}`;
  }
}

// Función para manejar operaciones con vectores - IMPLEMENTACIÓN COMPLETA
function vectorOperations(expression, operation) {
  try {
    // Extraer vectores de la expresión
    // Formatos aceptados: "[1,2,3]", "1 2 3", "(1,2,3)"
    const vectors = [];
    
    // Normalizar la expresión
    expression = expression.replace(/[()]/g, '');
    
    // Dividir en vectores si hay múltiples (separados por algo)
    const vectorParts = expression.split(/[^\d\.,\s]+/).filter(part => part.trim() !== '');
    
    for (const part of vectorParts) {
      let vectorStr = part;
      
      // Eliminar corchetes exteriores si existen
      if (vectorStr.startsWith('[') && vectorStr.endsWith(']')) {
        vectorStr = vectorStr.slice(1, -1);
      }
      
      // Dividir en elementos
      const elements = vectorStr.split(/[,\s]+/).filter(el => el.trim() !== '');
      const numElements = elements.map(el => parseFloat(el));
      
      if (numElements.length > 0) {
        vectors.push(numElements);
      }
    }
    
    if (vectors.length === 0) {
      return "No se encontraron vectores válidos en la expresión";
    }
    
    // Realizar la operación solicitada
    let result;
    switch(operation.toLowerCase()) {
      case 'magnitud':
        if (vectors.length !== 1) {
          return "Se necesita exactamente un vector para calcular la magnitud";
        }
        result = math.norm(vectors[0]);
        return `Magnitud del vector: ${result.toFixed(4)}`;
        
      case 'productopunto':
      case 'producto punto':
        if (vectors.length !== 2) {
          return "Se necesitan exactamente dos vectores para el producto punto";
        }
        if (vectors[0].length !== vectors[1].length) {
          return "Los vectores deben tener la misma dimensión";
        }
        result = math.dot(vectors[0], vectors[1]);
        return `Producto punto: ${result.toFixed(4)}`;
        
      case 'productocruz':
      case 'producto cruz':
        if (vectors.length !== 2) {
          return "Se necesitan exactamente dos vectores para el producto cruz";
        }
        if (vectors[0].length !== 3 || vectors[1].length !== 3) {
          return "El producto cruz solo está definido para vectores en R3";
        }
        result = math.cross(vectors[0], vectors[1]);
        return `Producto cruz: [${result.map(v => v.toFixed(4)).join(', ')}]`;
        
      case 'angulo':
      case 'ángulo':
        if (vectors.length !== 2) {
          return "Se necesitan exactamente dos vectores para calcular el ángulo";
        }
        if (vectors[0].length !== vectors[1].length) {
          return "Los vectores deben tener la misma dimensión";
        }
        const dotProduct = math.dot(vectors[0], vectors[1]);
        const mag1 = math.norm(vectors[0]);
        const mag2 = math.norm(vectors[1]);
        const angleRad = Math.acos(dotProduct / (mag1 * mag2));
        const angleDeg = angleRad * 180 / Math.PI;
        return `Ángulo entre vectores: ${angleDeg.toFixed(2)}° (${angleRad.toFixed(4)} rad)`;
        
      case 'sumar':
        if (vectors.length !== 2) {
          return "Se necesitan exactamente dos vectores para sumar";
        }
        if (vectors[0].length !== vectors[1].length) {
          return "Los vectores deben tener la misma dimensión";
        }
        result = vectors[0].map((val, i) => val + vectors[1][i]);
        return `Suma de vectores: [${result.map(v => v.toFixed(4)).join(', ')}]`;
        
      case 'restar':
        if (vectors.length !== 2) {
          return "Se necesitan exactamente dos vectores para restar";
        }
        if (vectors[0].length !== vectors[1].length) {
          return "Los vectores deben tener la misma dimensión";
        }
        result = vectors[0].map((val, i) => val - vectors[1][i]);
        return `Resta de vectores: [${result.map(v => v.toFixed(4)).join(', ')}]`;
        
      default:
        return `Operación vectorial "${operation}" no reconocida`;
    }
  } catch (error) {
    console.error("Error en vectorOperations:", error);
    return `Error al realizar operación vectorial: ${error.message}`;
  }
}

// Función para manejar operaciones con números complejos - IMPLEMENTACIÓN COMPLETA
function complexOperations(expression, operation) {
  try {
    // Extraer números complejos de la expresión
    // Formatos aceptados: "3+4i", "(3,4)", "3 4"
    const complexNumbers = [];
    
    // Normalizar la expresión
    expression = expression.replace(/\s+/g, ' ');
    
    // Dividir en números complejos si hay múltiples
    const complexParts = expression.split(/[^0-9i,.+-]+/).filter(part => part.trim() !== '');
    
    for (const part of complexParts) {
      let complexStr = part;
      
      // Eliminar paréntesis si existen
      if (complexStr.startsWith('(') && complexStr.endsWith(')')) {
        complexStr = complexStr.slice(1, -1);
      }
      
      // Intentar parsear como a+bi
      const match = complexStr.match(/([+-]?\d*\.?\d*)([+-]\d*\.?\d*)i/);
      if (match) {
        const real = parseFloat(match[1] || '0');
        const imag = parseFloat(match[2] || '1');
        complexNumbers.push(math.complex(real, imag));
      } else {
        // Intentar como dos números separados por coma o espacio
        const parts = complexStr.split(/[, ]+/);
        if (parts.length >= 2) {
          const real = parseFloat(parts[0]);
          const imag = parseFloat(parts[1]);
          if (!isNaN(real) && !isNaN(imag)) {
            complexNumbers.push(math.complex(real, imag));
          }
        } else if (parts.length === 1 && parts[0].includes('i')) {
          // Solo parte imaginaria
          const imag = parseFloat(parts[0].replace('i', '')) || 1;
          complexNumbers.push(math.complex(0, imag));
        } else if (parts.length === 1) {
          // Solo parte real
          const real = parseFloat(parts[0]);
          if (!isNaN(real)) {
            complexNumbers.push(math.complex(real, 0));
          }
        }
      }
    }
    
    if (complexNumbers.length === 0) {
      return "No se encontraron números complejos válidos en la expresión";
    }
    
    // Realizar la operación solicitada
    let result;
    switch(operation.toLowerCase()) {
      case 'modulo':
      case 'módulo':
        if (complexNumbers.length !== 1) {
          return "Se necesita exactamente un número complejo para calcular el módulo";
        }
        result = math.abs(complexNumbers[0]);
        return `Módulo: ${result.toFixed(4)}`;
        
      case 'argumento':
      case 'fase':
        if (complexNumbers.length !== 1) {
          return "Se necesita exactamente un número complejo para calcular el argumento";
        }
        const phaseRad = math.arg(complexNumbers[0]);
        const phaseDeg = phaseRad * 180 / Math.PI;
        return `Argumento (fase): ${phaseDeg.toFixed(2)}° (${phaseRad.toFixed(4)} rad)`;
        
      case 'conjugado':
        if (complexNumbers.length !== 1) {
          return "Se necesita exactamente un número complejo para calcular el conjugado";
        }
        result = math.conj(complexNumbers[0]);
        return `Conjugado: ${result.toString()}`;
        
      case 'sumar':
        if (complexNumbers.length !== 2) {
          return "Se necesitan exactamente dos números complejos para sumar";
        }
        result = math.add(complexNumbers[0], complexNumbers[1]);
        return `Suma: ${result.toString()}`;
        
      case 'restar':
        if (complexNumbers.length !== 2) {
          return "Se necesitan exactamente dos números complejos para restar";
        }
        result = math.subtract(complexNumbers[0], complexNumbers[1]);
        return `Resta: ${result.toString()}`;
        
      case 'multiplicar':
        if (complexNumbers.length !== 2) {
          return "Se necesitan exactamente dos números complejos para multiplicar";
        }
        result = math.multiply(complexNumbers[0], complexNumbers[1]);
        return `Producto: ${result.toString()}`;
        
      case 'dividir':
        if (complexNumbers.length !== 2) {
          return "Se necesitan exactamente dos números complejos para dividir";
        }
        try {
          result = math.divide(complexNumbers[0], complexNumbers[1]);
          return `División: ${result.toString()}`;
        } catch (e) {
          return "División por cero no permitida";
        }
        
      case 'potencia':
        if (complexNumbers.length !== 2) {
          return "Se necesitan exactamente dos números complejos para potencia (base y exponente)";
        }
        result = math.pow(complexNumbers[0], complexNumbers[1]);
        return `Potencia: ${result.toString()}`;
        
      case 'raiz':
      case 'raíz':
        if (complexNumbers.length !== 1) {
          return "Se necesita exactamente un número complejo para calcular la raíz cuadrada";
        }
        result = math.sqrt(complexNumbers[0]);
        return `Raíz cuadrada: ${result.toString()}`;
        
      case 'exponencial':
        if (complexNumbers.length !== 1) {
          return "Se necesita exactamente un número complejo para calcular la exponencial";
        }
        result = math.exp(complexNumbers[0]);
        return `Exponencial: ${result.toString()}`;
        
      case 'logaritmo':
        if (complexNumbers.length !== 1) {
          return "Se necesita exactamente un número complejo para calcular el logaritmo natural";
        }
        result = math.log(complexNumbers[0]);
        return `Logaritmo natural: ${result.toString()}`;
        
      default:
        return `Operación con complejos "${operation}" no reconocida`;
    }
  } catch (error) {
    console.error("Error en complexOperations:", error);
    return `Error al realizar operación con números complejos: ${error.message}`;
  }
}
});
