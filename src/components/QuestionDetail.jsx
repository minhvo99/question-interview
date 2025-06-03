import { AccordionDetails } from '@mui/material';

function QuestionDetail({ description }) {
  if (!description) return null;

  // Xử lý HTML để loại bỏ DOCTYPE và html wrapper
  const cleanHtml = description
    .replace(/<!DOCTYPE html>/g, '')
    .replace(/<html[^>]*>/g, '')
    .replace(/<\/html>/g, '')
    .replace(/<head[^>]*>[\s\S]*?<\/head>/g, '')
    .replace(/<body[^>]*>/g, '')
    .replace(/<\/body>/g, '')
    .trim();

  return (
    <AccordionDetails>
      <div
        className='question-content p-4 rounded-lg overflow-auto max-h-96'
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
    </AccordionDetails>
  );
}

export default QuestionDetail;
