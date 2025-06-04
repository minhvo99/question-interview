import { AccordionDetails } from '@mui/material';
import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css'; // Dark theme giống VS Code

function QuestionDetail({ description }) {
  const cleanHtml = description
    .replace(/<!DOCTYPE html>/g, '')
    .replace(/<html[^>]*>/g, '')
    .replace(/<\/html>/g, '')
    .replace(/<head[^>]*>[\s\S]*?<\/head>/g, '')
    .replace(/<body[^>]*>/g, '')
    .replace(/<\/body>/g, '')
    .trim();

  useEffect(() => {
    // Tự động detect và highlight tất cả code blocks
    document.querySelectorAll('pre code').forEach((el) => {
      hljs.highlightElement(el);
    });
  }, [cleanHtml]);
  if (!description) return null;

  return (
    <AccordionDetails>
      <div
        className='question-content p-4 rounded-lg '
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
    </AccordionDetails>
  );
}

export default QuestionDetail;
