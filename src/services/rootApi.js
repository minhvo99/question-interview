import { LEVELMAPPING } from '@constants/constant';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import dayjs from 'dayjs';

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
        transformResponse: (res) => {
          return {
            ...res,
            data: res.data.map((e) => ({
              ...e,
              createdAt: dayjs(e.createdAt).format('DD/MM/YYYY HH:mm'),
              updatedAt: dayjs(e.updatedAt).format('DD/MM/YYYY HH:mm'),
              Level: LEVELMAPPING[e.Level].name,
            })),
          };
        },
        providesTags: ['AllQuestion'],
      }),
      getQuestionById: builder.query({
        query: ({ collection, id }) => `/questions/${collection}/${id}`,
      }),
      createNewQuestion: builder.mutation({
        query: ({ collection, body }) => ({
          url: `/questions/${collection}`,
          body,
          method: 'POST',
        }),
        invalidatesTags: ['AllQuestion'],
      }),
      updateQuestion: builder.mutation({
        query: ({ collection, id, body }) => ({
          url: `/questions/${collection}/${id}`,
          body,
          method: 'PATCH',
        }),
        invalidatesTags: ['AllQuestion'],
      }),
      deleteQuestion: builder.mutation({
        query: ({ collection, id }) => ({
          url: `/questions/${collection}/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['AllQuestion'],
      }),
    };
  },
});

export const {
  useGetAllQuestionsQuery,
  useCreateNewQuestionMutation,
  useDeleteQuestionMutation,
  useGetQuestionByIdQuery,
  useUpdateQuestionMutation,
} = rootApi;
