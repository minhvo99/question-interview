import FormField from '@components/FormInputs/FormField';
import { Button, CircularProgress, DialogContent } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import TextInput from '@components/FormInputs/TextInput';
import { useCreateNewQuestionMutation } from '@services/rootApi';
import DropDown from '@components/FormInputs/DropDown';
import { LEVELMAPPING } from '@constants/constant';
import { useDispatch } from 'react-redux';
import { openSnakeBar } from '@redux/slices/snackBarSlice';
import { closeDialog } from '@redux/slices/dialogSlice';
import Editor from '@components/FormInputs/Editor';

const CreateQuestion = ({ collection }) => {
  const formBuilder = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    level: yup.string().required('Level is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(formBuilder),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const dispatch = useDispatch();
  const [createNewQuestion, { isLoading }] = useCreateNewQuestionMutation();

  const onSubmit = async (data) => {
    try {
      const body = {
        Title: data.title,
        Description: data.description,
        Level: data.level,
      };

      await createNewQuestion({ collection, body }).unwrap();
      dispatch(
        openSnakeBar({
          message: 'Create new question is successfully!',
        }),
      );
    } catch (error) {
      dispatch(openSnakeBar(`${error.message}`));
    } finally {
      dispatch(closeDialog());
    }
  };

  const level = Object.keys(LEVELMAPPING);

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
          disabled={!isValid || isSubmitting}
        >
          {isLoading && (
            <CircularProgress color='#ffffff' size='16px' className='mr-1' />
          )}
          Create new question
        </Button>
      </form>
    </DialogContent>
  );
};

export default CreateQuestion;
