import Loading from '@components/Loading';
import QuestionList from '@components/QuestionList';
import { QUESTIONS } from '@constants/constant';
import { useQuestions } from '@hooks/useQuestions';
import { Avatar } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useState } from 'react';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { questions = [], loading, error } = useQuestions(selectedCategory);
  const [sesstion, setSesstion] = useState({
    title: '',
    total: 0,
  });

  return (
    <div className='flex  min-h-screen bg-gray-100 px-4'>
      <div className='w-full max-w-4xl mx-auto'>
        <div className='h-80  overflow-auto p-4 bg-white rounded-lg shadow-sm'>
          <ul className='flex flex-wrap gap-2 justify-center'>
            {QUESTIONS.map((question) => (
              <li key={question.Id} className='list-none cursor-pointer'>
                <Chip
                  avatar={
                    <Avatar
                      alt='Natacha'
                      src={`data:image/png;base64, ${question.Icon}`}
                    />
                  }
                  label={`${question.Name} (${question.QuestionsNumber})`}
                  onClick={() => {
                    setSelectedCategory(question.url);
                    setSesstion({
                      title: question.Name,
                      total: question.QuestionsNumber,
                    });
                  }}
                  className={`hover:bg-blue-100 ${
                    selectedCategory === question.url
                      ? '!bg-slate-500 !text-white'
                      : ''
                  }`}
                  variant='outlined'
                />
              </li>
            ))}
          </ul>
          {sesstion.title && (
            <div className='mt-10 mb-2 text-center border rounded p-2 shadow-md border-gray-300'>
              <h2 className='text-2xl font-semibold'>
                {sesstion.total} Câu hỏi phỏng vấn {sesstion.title}
              </h2>
            </div>
          )}
        </div>

        {loading && <Loading />}
        {error && <p className='text-center mt-4 text-red-500'>{error}</p>}
        {!loading && !error && !selectedCategory && (
          <p className='text-center mt-4'>Please select a category</p>
        )}
        {questions &&
          questions.map((question, index) => (
            <QuestionList
              key={question.Id}
              title={question.Title}
              description={question.Description}
              idx={index + 1}
              level={question.Level}
              url={question.URL}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
