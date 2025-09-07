import React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch } from 'react-redux';
import { closeDialog } from '@redux/slices/dialogSlice';
import { useDeleteQuestionMutation } from '@services/rootApi';
import { openSnakeBar } from '@redux/slices/snackBarSlice';

const ConfirmDialog = ({ collection, id }) => {
  const dispatch = useDispatch();
  const [deleteQuestion] = useDeleteQuestionMutation();

  const handleConfirm = async () => {
    try {
      await deleteQuestion({ collection, id }).unwrap();
      dispatch(openSnakeBar({ message: 'Delete question successfully!' }));
    } catch (error) {
      dispatch(
        openSnakeBar({
          message: `${error?.data?.message || 'Fail'}`,
          type: 'error',
        }),
      );
    } finally {
      dispatch(closeDialog());
    }
  };
  return (
    <DialogActions>
      <Button onClick={() => dispatch(closeDialog())}>Cancel</Button>
      <Button onClick={handleConfirm} autoFocus>
        Confirm
      </Button>
    </DialogActions>
  );
};

export default ConfirmDialog;
