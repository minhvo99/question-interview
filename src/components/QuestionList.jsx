import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import QuestionDetail from './QuestionDetail';
import { Chip } from '@mui/material';

function QuestionList({ title, description, idx, level }) {
  const levelMapping = {
    BAS: {
      name: 'Basic',
      color: 'primary',
    },
    JUN: {
      name: 'Junior',
      color: 'secondary',
    },
    MID: {
      name: 'Middle',
      color: 'success',
    },
    SEN: {
      name: 'Senior',
      color: 'warning',
    },
    MAS: {
      name: 'Master',
      color: 'error',
    },
  };
  return (
    <div className='mt-2 pb-1'>
      <Accordion className='mb-2'>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel2-content'
          id='panel2-header'
        >
          <Typography
            component='span'
            className='flex justify-between items-center w-full'
          >
            <p className='text-lg font-semibold'>
              {idx}. {title}
            </p>
            <Chip
              label={levelMapping[level].name}
              color={levelMapping[level].color}
            />
          </Typography>
        </AccordionSummary>

        <QuestionDetail description={description} />
      </Accordion>
    </div>
  );
}

export default QuestionList;
