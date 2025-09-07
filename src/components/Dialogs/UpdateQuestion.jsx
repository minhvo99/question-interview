import React, { useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useUpdateQuestionMutation } from '@services/rootApi';
import { closeDialog } from '@redux/slices/dialogSlice';
import { useDispatch } from 'react-redux';
import TextInput from '@components/FormInputs/TextInput';
import Editor from '@components/FormInputs/Editor';
import DropDown from '@components/FormInputs/DropDown';
import { openSnakeBar } from '@redux/slices/snackBarSlice';
import { LEVELMAPPING } from '@constants/constant';
import { Button, CircularProgress, DialogContent } from '@mui/material';
import FormField from '@components/FormInputs/FormField';
import { getLevelKeyFromName } from '@utils/index';

const UpdateQuestion = ({ question, collection }) => {
  const formBuilder = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    level: yup.string().required('Level is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
    setValue,
  } = useForm({
    resolver: yupResolver(formBuilder),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const dispatch = useDispatch();
  const [updateQuestion, { isLoading }] = useUpdateQuestionMutation();

  const onSubmit = async (data) => {
    try {
      const body = {
        Title: data.title,
        Description: data.description,
        Level: data.level,
      };
      await updateQuestion({
        collection,
        id: question.id,
        body,
      }).unwrap();
      dispatch(
        openSnakeBar({
          message: 'Update question is successfully!',
        }),
      );
    } catch (error) {
      dispatch(openSnakeBar(`${error.message}`));
      dispatch(
        openSnakeBar({
          message: `${error?.data?.message}`,
          type: 'error',
        }),
      );
    } finally {
      dispatch(closeDialog());
    }
  };

  const level = Object.keys(LEVELMAPPING);
  useEffect(() => {
    setValue('title', question.Title, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('description', question.Description, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('level', getLevelKeyFromName(question.Level), {
      shouldValidate: true,
      shouldDirty: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(question), setValue]);

  return (
    <DialogContent className='pt-4'>
      <form
        className=' flex flex-col items-center justify-center gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          name='title'
          label='Title'
          control={control}
          Component={TextInput}
          error={errors['title']}
        />
        <FormField
          name='description'
          label='Description'
          control={control}
          Component={Editor}
          error={errors['description']}
        />

        <FormField
          name='level'
          label='Level'
          control={control}
          Component={DropDown}
          error={errors['level']}
          options={level}
        />
        <Button
          variant='contained'
          className='w-full'
          type='submit'
          disabled={!isValid || isSubmitting || !isDirty}
        >
          {isLoading && (
            <CircularProgress color='#ffffff' size='16px' className='mr-1' />
          )}
          Update new question
        </Button>
      </form>
    </DialogContent>
  );
};

export default UpdateQuestion;
