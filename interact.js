let currentInput = '0';
let historyInput = '';
const currentDisplay = document.getElementById('current');
const historyDisplay = document.getElementById('history');
const historyLogContainer = document.getElementById('history-log');

function toggleTheme() {
    const body = document.documentElement;
    const currentTheme = body.getAttribute('data-theme');
    const icon = document.getElementById('theme-icon');
    const text = document.getElementById('theme-text');

    if (currentTheme === 'light') {
        body.removeAttribute('data-theme');
        icon.innerText = '☀️';
        text.innerText = 'Light Mode';
    } else {
        body.setAttribute('data-theme', 'light');
        icon.innerText = '🌙';
        text.innerText = 'Dark Mode';
    }
}

function switchMode(mode) {
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${mode}`).classList.add('active');

    document.getElementById('calc-display').style.display = mode === 'converter' ? 'none' : 'flex';
    document.getElementById('normal-keypad').classList.toggle('active', mode === 'normal');
    document.getElementById('scientific-keypad').classList.toggle('active', mode === 'scientific');
    document.getElementById('converter-container').style.display = mode === 'converter' ? 'flex' : 'none';

    if(mode === 'converter') updateConverterUnits();
}

function appendNumber(num) {
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        if (num === '.' && currentInput.includes('.')) return;
        currentInput += num;
    }
    updateDisplay();
}

function appendOperator(op) {
    if(historyInput.endsWith('^')) {
        historyInput += currentInput + ' ' + op + ' ';
        currentInput = '0';
    } else if (currentInput !== '0' || historyInput === '') {
        historyInput += currentInput + ' ' + op + ' ';
        currentInput = '0';
    }
    updateDisplay();
}

function appendScientific(type) {
    let val = parseFloat(currentInput);
    let label = `${type}(${currentInput})`;
    
    switch(type) {
        case 'sin': currentInput = Math.sin(val * Math.PI / 180).toFixed(6); break;
        case 'cos': currentInput = Math.cos(val * Math.PI / 180).toFixed(6); break;
        case 'tan': currentInput = Math.tan(val * Math.PI / 180).toFixed(6); break;
        case 'log': currentInput = Math.log10(val).toString(); break;
        case 'ln':  currentInput = Math.log(val).toString(); break;
        case 'sqrt': currentInput = Math.sqrt(val).toString(); label = `√(${val})`; break;
        case 'pi':  currentInput = Math.PI.toString(); return updateDisplay();
        case 'pow': 
            historyInput = currentInput + ' ^ ';
            currentInput = '0';
            return updateDisplay();
    }
    
    if(currentInput.includes('.')) currentInput = parseFloat(currentInput).toString();
    addHistoryItem(label, currentInput);
    updateDisplay();
}

function clearAll() {
    currentInput = '0';
    historyInput = '';
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
    updateDisplay();
}

function calculate() {
    let expression = historyInput + currentInput;
    let cleanExpression = expression;
    
    if(expression.includes('^')) {
        let parts = expression.split('^');
        if(parts.length === 2) {
            let res = Math.pow(parseFloat(parts[0]), parseFloat(parts[1])).toString();
            addHistoryItem(cleanExpression, res);
            currentInput = res;
            historyInput = '';
            updateDisplay();
            return;
        }
    }

    try {
        let result = eval(expression.replace(/×/g, '*').replace(/÷/g, '/'));
        let dynamicResult = Number(result.toFixed(8)).toString();
        addHistoryItem(cleanExpression, dynamicResult);
        currentInput = dynamicResult;
        historyInput = '';
    } catch {
        currentInput = 'Error';
    }
    updateDisplay();
}

function updateDisplay() {
    currentDisplay.innerText = currentInput;
    historyDisplay.innerText = historyInput;
}

function addHistoryItem(expr, result) {
    if(result === "Error" || expr === "0") return;
    const item = document.createElement('div');
    item.classList.add('history-item');
    item.innerHTML = `
        <div class="hist-expr">${expr}</div>
        <div class="hist-res">${result}</div>
    `;
    historyLogContainer.prepend(item);
}

function clearHistoryLog() {
    historyLogContainer.innerHTML = '';
}

const unitOptions = {
    weight: [ {value: 'kg', label: 'Kilograms (kg)'}, {value: 'g', label: 'Grams (g)'} ],
    length: [ {value: 'cm', label: 'Centimeters (cm)'}, {value: 'm', label: 'Meters (m)'} ]
};

function updateConverterUnits() {
    const type = document.getElementById('conv-type').value;
    const fromSelect = document.getElementById('conv-from');
    const toSelect = document.getElementById('conv-to');
    
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';

    unitOptions[type].forEach((unit, idx) => {
        fromSelect.add(new Option(unit.label, unit.value));
        let opt2 = new Option(unit.label, unit.value);
        if(idx === 1) opt2.selected = true; 
        toSelect.add(opt2);
    });
    runConversion();
}

function runConversion() {
    const type = document.getElementById('conv-type').value;
    const fromUnit = document.getElementById('conv-from').value;
    const toUnit = document.getElementById('conv-to').value;
    const val = parseFloat(document.getElementById('conv-input-val').value) || 0;
    let result = 0;

    if (fromUnit === toUnit) {
        result = val;
    } else if (type === 'weight') {
        result = (fromUnit === 'kg') ? val * 1000 : val / 1000;
    } else if (type === 'length') {
        result = (fromUnit === 'cm') ? val / 100 : val * 100;
    }
    document.getElementById('conv-output-val').value = Number(result.toFixed(4));
}

function logConversion() {
    const fromUnit = document.getElementById('conv-from').value;
    const toUnit = document.getElementById('conv-to').value;
    const inputVal = document.getElementById('conv-input-val').value;
    const outputVal = document.getElementById('conv-output-val').value;
    
    addHistoryItem(`${inputVal} ${fromUnit} → ${toUnit}`, outputVal);
}