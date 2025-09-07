import React, { useState, useEffect, useCallback } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import QuestionDetail from './QuestionDetail';
import { Chip } from '@mui/material';
import { useGetAllQuestionsQuery } from '@services/rootApi';
import Loading from './Loading';
import { LEVELMAPPING } from '../constants/constant';

function QuestionList({ selectedCategory }) {
  const [queryParams, setQueryParams] = useState({
    collection: selectedCategory,
    page: 1,
  });
  const [questions, setQuestions] = useState([]);

  const { data: posts, isFetching } = useGetAllQuestionsQuery(queryParams);

  useEffect(() => {
    setQueryParams({ collection: selectedCategory, page: 1 });
    setQuestions([]);
  }, [selectedCategory]);

  useEffect(() => {
    if (posts?.data) {
      setQuestions((prev) => {
        let newList;
        if (queryParams.page === 1) {
          newList = posts.data;
        } else {
          newList = [...prev, ...posts.data];
        }

        const uniqueList = newList.filter(
          (item, index, self) =>
            index === self.findIndex((q) => q.id === item.id),
        );

        return uniqueList;
      });
    }
  }, [posts, queryParams.page]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 50 >=
      document.documentElement.offsetHeight
    ) {
      if (!isFetching && posts?.data?.length > 0) {
        setQueryParams((prev) => ({
          ...prev,
          page: prev.page + 1,
        }));
      }
    }
  }, [isFetching, posts]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className='mt-2 pb-1'>
      {questions.map((ques, idx) => (
        <Accordion className='mb-2' key={ques.id}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls='panel2-content'
            id={`panel2-header-${idx}`}
          >
            <Typography
              component='span'
              className='flex justify-between items-center w-full'
            >
              <p className='text-lg font-semibold'>
                {idx + 1}. {ques.Title}
              </p>
              <Chip label={ques.Level} color={ques.Level} />
            </Typography>
          </AccordionSummary>
          <QuestionDetail description={ques.Description} />
        </Accordion>
      ))}

      {isFetching && <Loading />}
    </div>
  );
}

export default QuestionList;
