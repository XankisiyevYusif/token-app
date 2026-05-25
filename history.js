import { analyzeText } from './utils.js';

const history = [];

export function addSnapshot(text) {
  const analysis = analyzeText(text);
  analysis.label = 'Snapshot ' + (history.length + 1);
  history.push(analysis);
}

export function getHistory() {
  return history;
}

export function clearHistory() {
  history.length = 0;
}
