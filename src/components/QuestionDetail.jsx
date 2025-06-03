import { AccordionDetails, Typography } from '@mui/material';

function QuestionDetail({ description }) {
  if (!description) return null;

  return (
    <AccordionDetails>
      <Typography
        className='prose max-w-none'
        dangerouslySetInnerHTML={{ __html: description }}
      ></Typography>
    </AccordionDetails>
  );
}

export default QuestionDetail;
