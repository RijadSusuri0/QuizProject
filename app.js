const questions = [
    {q: "Capital of France?", a: ["Paris","Berlin","Rome","Madrid"], correct: 0},
    {q: "2 + 2 = ?", a: ["3","4","5","6"], correct: 1},
    {q: "Planet nearest the Sun?", a: ["Venus","Earth","Mercury","Mars"], correct: 2},
    {q: "Color of the sky (day)?", a: ["Green","Blue","Red","Black"], correct: 1},
    {q: "HTML stands for?", a: ["Hyper Text Markup Language","Home Tool Markup","HighText","None"], correct: 0},
    {q: "JS file extension?", a: [".java",".js",".json",".jv"], correct: 1},
    {q: "Largest ocean?", a: ["Atlantic","Indian","Arctic","Pacific"], correct: 3},
    {q: "Fastest land animal?", a: ["Lion","Cheetah","Horse","Elephant"], correct: 1},
    {q: "Primary color", a: ["Pink","Yellow","Brown","Purple"], correct: 1},
    {q: "Square root of 9", a: ["1","2","3","4"], correct: 2},
    {q: "Opposite of hot", a: ["Warm","Cold","Cool","Boiling"], correct: 1},
    {q: "H2O is", a: ["Oxygen","Hydrogen","Water","Helium"], correct: 2},
    {q: "Binary of decimal 2", a: ["10","01","11","00"], correct: 0},
    {q: "Who wrote 'Hamlet'?", a: ["Dante","Shakespeare","Homer","Tolstoy"], correct: 1},
    {q: "Atom's center is called?", a: ["Shell","Electron","Proton","Nucleus"], correct: 3},
    {q: "Symbol for gold?", a: ["Au","Ag","G","Go"], correct: 0},
    {q: "Square of 5", a: ["10","20","25","30"], correct: 2},
    {q: "Largest continent?", a: ["Africa","Asia","Europe","Antarctica"], correct: 1},
    {q: "Light speed approx (km/s)?", a: ["300","3000","30000","300000"], correct: 3},
    {q: "Primary currency of Japan?", a: ["Yuan","Won","Yen","Dollar"], correct: 2}
];

let index = 0;
const selected = Array(questions.length).fill(null);

function $(sel){ return document.querySelector(sel); }
function render() {
    const qEl = $('#question');
    const optsEl = $('#options');
    qEl.textContent = questions[index].q;
    optsEl.innerHTML = '';
    questions[index].a.forEach((opt, i) => {
        const li = document.createElement('li');
        li.textContent = opt;
        li.tabIndex = 0;
        li.className = (selected[index] === i) ? 'selected' : '';
        li.addEventListener('click', () => {
            selected[index] = i;
            render();
        });
        li.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { selected[index] = i; render(); e.preventDefault(); }
        });
        optsEl.appendChild(li);
    });
    $('#progressText').textContent = `${index+1} / ${questions.length}`;
    const pct = ((index) / (questions.length-1)) * 100;
    $('#progressFill').style.width = pct + '%';

    $('#prevBtn').disabled = index === 0;
    $('#nextBtn').textContent = index === questions.length - 1 ? 'Finish' : 'Next';
}

function finish() {
    const score = selected.reduce((acc, sel, i) => acc + ((sel === questions[i].correct)?1:0), 0);
    const best = Number(localStorage.getItem('best') || 0);
    if (score > best) localStorage.setItem('best', score);
    $('#result').style.display = 'block';
    $('#result').innerHTML = `<strong>Your score: ${score} / ${questions.length}</strong><br>Best: ${Math.max(score,best)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    render();
    $('#nextBtn').addEventListener('click', () => {
        if (index === questions.length - 1) return finish();
        index++; render();
    });
    $('#prevBtn').addEventListener('click', () => { if (index>0) index--; render(); });
});