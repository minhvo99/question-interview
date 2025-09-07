import { AccordionDetails } from '@mui/material';

import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';

import 'prismjs/themes/prism-tomorrow.css';

function highlightCode(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  doc.querySelectorAll('pre code').forEach((block) => {
    const language = block.className.replace('language-', '') || 'javascript';
    const code = block.textContent;

    const grammar = Prism.languages[language] || Prism.languages.javascript;
    const highlighted = Prism.highlight(code, grammar, language);

    block.innerHTML = highlighted;
    block.classList.add('language-' + language);
  });

  return doc.body.innerHTML;
}

function QuestionDetail({ description }) {
  const highlightedHtml = highlightCode(description);

  if (!description) return null;

  return (
    <AccordionDetails>
      <div
        className='question-content p-4 rounded-lg '
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </AccordionDetails>
  );
}

export default QuestionDetail;
