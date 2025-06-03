import { useState, useEffect } from 'react';

export const useQuestions = (category) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return;

    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/${category}.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${category} questions`);
        }
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        setError(err.message);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category]);

  return { questions, loading, error };
};
