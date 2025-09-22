const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let expression = '';

function updateDisplay() {
  display.textContent = expression || '0';
}

function appendToExpression(value) {
  if (expression === 'Erro') expression = '';
  
  const lastChar = expression.slice(-1);
  const operators = ['+', '-', '*', '/'];

  if (operators.includes(value)) {
    if (expression === '') return; // Não começa com operador
    if (operators.includes(lastChar)) {
      // substitui operador se último for operador
      expression = expression.slice(0, -1) + value;
    } else {
      expression += value;
    }
  } else if (value === '.') {
    // Evitar múltiplos pontos no número atual
    let lastNumber = expression.split(/[\+\-\*\/]/).pop();
    if (!lastNumber.includes('.')) {
      if (lastNumber === '') {
        expression += '0.';
      } else {
        expression += '.';
      }
    }
  } else {
    // Número
    if (expression === '0') {
      expression = value;
    } else {
      expression += value;
    }
  }
  updateDisplay();
}

function clearExpression() {
  expression = '';
  updateDisplay();
}

function deleteLast() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function calculate() {
  if (expression === '') return;

  const lastChar = expression.slice(-1);
  const operators = ['+', '-', '*', '/'];
  if (operators.includes(lastChar)) {
    expression = expression.slice(0, -1);
  }

  try {
    // Avalia a expressão
    let result = eval(expression);
    // Limitar casas decimais e remover zeros finais
    if (typeof result === 'number') {
      result = +parseFloat(result.toFixed(8));
    }
    expression = result.toString();
  } catch {
    expression = 'Erro';
  }
  updateDisplay();
}

// Event listeners

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const val = button.dataset.value;
    if (button.id === 'clear') {
      clearExpression();
    } else if (button.id === 'delete') {
      deleteLast();
    } else if (button.id === 'equals') {
      calculate();
    } else if (val !== undefined) {
      appendToExpression(val);
    }
  });
});

updateDisplay();