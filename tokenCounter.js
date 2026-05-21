function cleanText(text) {
  return text.trim();
}

function splitIntoWords(text) {
  return text.split(" ");
}

function removeEmptyWords(words) {
  return words.filter(function(word) {
    return word !== "";
  });
}

function estimateTokens(words) {
  return Math.ceil(words.length * 0.75);
}

function countTokens(text) {
  const cleaned = cleanText(text);
  const words = splitIntoWords(cleaned);
  const filtered = removeEmptyWords(words);
  return estimateTokens(filtered);
}

function analyzeText(text) {
  const cleaned = cleanText(text);
  const words = splitIntoWords(cleaned);
  const filtered = removeEmptyWords(words);

  return {
    characters: cleaned.length,
    words: filtered.length,
    tokens: estimateTokens(filtered)
  };
}

function renderHistory() {
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

const textarea     = document.querySelector('#inputText');
const statChars    = document.querySelector('#stat-chars');
const statWords    = document.querySelector('#stat-words');
const statTokens   = document.querySelector('#stat-tokens');
const saveBtn      = document.querySelector('#save-btn');
const clearBtn     = document.querySelector('#clear-btn');
const historyList  = document.querySelector('#history-list');
const maxTokensEl  = document.querySelector('#max-tokens');

const history = [];

textarea.addEventListener('input', function() {
  const analysis = analyzeText(textarea.value);
  statChars.textContent  = 'Characters: '       + analysis.characters;
  statWords.textContent  = 'Words: '            + analysis.words;
  statTokens.textContent = 'Estimated tokens: ' + analysis.tokens;

  saveBtn.disabled = textarea.value.trim() === '';
});


saveBtn.addEventListener('click', function() {
  const analysis = analyzeText(textarea.value);
  analysis.label = 'Snapshot ' + (history.length + 1);
  history.push(analysis);
  renderHistory();
});


clearBtn.addEventListener('click', function() {
  history.length = 0;
  renderHistory();
});