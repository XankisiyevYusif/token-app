import { analyzeText } from './utils.js';
import { addSnapshot, getHistory, clearHistory } from './history.js';

const textarea     = document.querySelector('#inputText');
const statChars    = document.querySelector('#stat-chars');
const statWords    = document.querySelector('#stat-words');
const statTokens   = document.querySelector('#stat-tokens');
const saveBtn      = document.querySelector('#save-btn');
const clearBtn     = document.querySelector('#clear-btn');
const historyList  = document.querySelector('#history-list');
const maxTokensEl  = document.querySelector('#max-tokens');

function renderHistory() {
  const history = getHistory();
  historyList.innerHTML = '';

  history.forEach(function(entry) {
    const li = document.createElement('li');
    li.textContent = entry.label + ' — ' + entry.tokens + ' tokens, ' + entry.words + ' words, ' + entry.characters + ' characters';
    historyList.appendChild(li);
  });

  if (history.length > 0) {
    const maxTokens = Math.max(...history.map(function(e) { return e.tokens; }));
    maxTokensEl.textContent = 'Highest token count: ' + maxTokens;
    maxTokensEl.style.display = 'block';
  } else {
    maxTokensEl.style.display = 'none';
  }
}

textarea.addEventListener('input', function() {
  const analysis = analyzeText(textarea.value);
  statChars.textContent  = 'Characters: '       + analysis.characters;
  statWords.textContent  = 'Words: '            + analysis.words;
  statTokens.textContent = 'Estimated tokens: ' + analysis.tokens;

  saveBtn.disabled = textarea.value.trim() === '';
});

saveBtn.addEventListener('click', function() {
  addSnapshot(textarea.value);
  renderHistory();
});

clearBtn.addEventListener('click', function() {
  clearHistory();
  renderHistory();
});
