import { AccordionDetails, Typography } from '@mui/material';

function QuestionDetail({ description }) {
  if (!description) return null;

  return (
    <AccordionDetails>
      <Typography
        className='prose max-w-none bg-slate-200 text-gray-500 p-4 rounded-lg'
        dangerouslySetInnerHTML={{ __html: description }}
      ></Typography>
    </AccordionDetails>
  );
}

export default QuestionDetail;
