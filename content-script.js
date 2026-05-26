import { transliterate } from './transliterate.js';

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT']);

function walkTextNodes(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const original = node.textContent;
    if (original.trim()) {
      node.textContent = transliterate(original);
    }
    return;
  }

  if (node.nodeType === Node.ELEMENT_NODE && SKIP_TAGS.has(node.tagName)) {
    return;
  }

  for (const child of node.childNodes) {
    walkTextNodes(child);
  }
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'applyTransliteration') {
    document.body.dir = 'rtl';
    walkTextNodes(document.body);
  }
});
