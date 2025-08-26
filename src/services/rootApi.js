import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rootApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => {
    return {
      getAllQuestions: builder.query({
        query: ({ collection, page }) => ({
          url: `/questions/${collection}?page=${page}`,
          method: 'GET',
        }),
      }),
    };
  },
});

export const { useGetAllQuestionsQuery } = rootApi;
