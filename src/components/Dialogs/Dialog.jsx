import { DialogTitle, IconButton, Dialog as MUIDialog } from '@mui/material';
import { closeDialog } from '@redux/slices/dialogSlice';

import { useDispatch, useSelector } from 'react-redux';

import { Close } from '@mui/icons-material';
import ConfirmDialog from './ConfirmDialog';
import UpdateQuestion from './UpdateQuestion';
import CreateQuestion from './CreateQuestion';

const DynamicContent = ({ contentType, additionalData }) => {
  switch (contentType) {
    case 'CONFIRM_DIALOG':
      return (
        <ConfirmDialog
          id={additionalData.id}
          collection={additionalData.collection}
        />
      );
    case 'NEW_QUESTION_DIALOG':
      return <CreateQuestion collection={additionalData} />;
    case 'UPDATE_QUESTION_DIALOG':
      return (
        <UpdateQuestion
          question={additionalData?.question}
          collection={additionalData.collection}
        />
      );
    default:
      return <p></p>;
  }
};

const Dialog = () => {
  const dialog = useSelector((state) => state.dialog);
  const dispatch = useDispatch();
  return (
    <div>
      <MUIDialog
        fullScreen={dialog.fullScreen}
        open={dialog.open}
        maxWidth={dialog.maxWidth}
        fullWidth={dialog.fullWidth}
        onClose={() => dispatch(closeDialog())}
      >
        {dialog.hasTitle && (
          <DialogTitle className='flex items-center justify-between border-b border-b-slate-200'>
            {dialog.title}
            <IconButton onClick={() => dispatch(closeDialog())}>
              <Close />
            </IconButton>
          </DialogTitle>
        )}
        {!dialog.hasTitle && (
          <div className='flex justify-items-start'>
            <IconButton onClick={() => dispatch(closeDialog())}>
              <Close />
            </IconButton>
          </div>
        )}

        <DynamicContent
          contentType={dialog.contentType}
          additionalData={dialog.additionalData}
        />
      </MUIDialog>
    </div>
  );
};

export default Dialog;
