import { useGetAllQuestionsQuery } from '@services/rootApi';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { cleanHtml } from '@utils/index';
import { Button, Skeleton } from '@mui/material';
import { QUESTIONS } from '@constants/constant';
import { useDispatch } from 'react-redux';
import { openDialog } from '@redux/slices/dialogSlice';
import { LightTooltip } from './LightToolTip';

const TableQuestion = () => {
  const { id } = useParams();
  const [page, setPage] = useState(0);
  const [queryParams, setQueryParams] = useState({
    collection: id,
    page: 1,
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setQueryParams((pre) => ({
      ...pre,
      page: newPage + 1,
    }));
  };
  const handleDeleteQuestion = (questionId) => {
    dispatch(
      openDialog({
        title: 'Are you sure you want delete this question?',
        contentType: 'CONFIRM_DIALOG',
        additionalData: {
          collection: id,
          id: questionId,
        },
      }),
    );
  };
  const handeUpdateQuestion = (question) => {
    dispatch(
      openDialog({
        title: 'Update Question',
        contentType: 'UPDATE_QUESTION_DIALOG',
        additionalData: { question, collection: id },
      }),
    );
  };

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      page: 1,
      collection: id,
    }));
    setPage(0);
  }, [id]);

  const columns = [
    {
      id: 'Title',
      label: 'Question Name',
      minWidth: 170,
      align: 'left',
      showTooltip: true,
    },
    {
      id: 'Description',
      label: 'Description',
      minWidth: 100,
      align: 'center',
      showTooltip: true,
      format: (value) => cleanHtml(value),
    },
    {
      id: 'Level',
      label: 'Level',
      minWidth: 100,
      align: 'center',
      showTooltip: true,
    },
    {
      id: 'createdAt',
      label: 'Created At',
      minWidth: 100,
      align: 'center',
      showTooltip: false,
    },
    {
      id: 'updatedAt',
      label: 'Updated At',
      minWidth: 100,
      align: 'center',
      showTooltip: false,
    },
    {
      id: 'action',
      label: '',
      minWidth: 100,
      align: 'center',
      showTooltip: false,
    },
  ];
  const { Name } = QUESTIONS.find((ques) => ques.url === id);
  const dispatch = useDispatch();

  const { data: rows, isFetching } = useGetAllQuestionsQuery(queryParams);
  const ActionButton = ({ onEdit, onDelete }) => {
    return (
      <div className='flex justify-evenly items-center'>
        <FontAwesomeIcon
          icon={faPencil}
          className='cursor-pointer'
          onClick={onEdit}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className='cursor-pointer'
          onClick={onDelete}
        />
      </div>
    );
  };

  return (
    <>
      <div className='flex justify-between items-center my-4'>
        <h1 className='text-xl text-zinc-800 font-medium'>Table: {Name}</h1>
        <Button
          variant='outlined'
          startIcon={<FontAwesomeIcon icon={faPlus} />}
          onClick={() =>
            dispatch(
              openDialog({
                title: 'New Question',
                contentType: 'NEW_QUESTION_DIALOG',
                additionalData: id,
                maxWidth: 'md',
              }),
            )
          }
        >
          New Question
        </Button>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 800 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows && !isFetching
                ? rows?.data.map((row) => {
                    return (
                      <TableRow
                        hover
                        role='checkbox'
                        tabIndex={-1}
                        key={row.id || row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <LightTooltip
                              title={
                                column.format ? column.format(value) : value
                              }
                              showTooltip={column.showTooltip}
                              key={column.id}
                            >
                              <TableCell
                                align={column.align}
                                style={{
                                  maxWidth: 100,
                                  maxHeight: 50,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {column.id === 'action' ? (
                                  <ActionButton
                                    onDelete={() => {
                                      handleDeleteQuestion(row.id);
                                    }}
                                    onEdit={() => {
                                      handeUpdateQuestion(row);
                                    }}
                                  />
                                ) : column.id === 'Description' &&
                                  column.format ? (
                                  column.format(value)
                                ) : (
                                  value
                                )}
                              </TableCell>
                            </LightTooltip>
                          );
                        })}
                      </TableRow>
                    );
                  })
                : Array.from({ length: 10 }).map((_, i) => (
                    <TableRow key={i}>
                      {columns.map((col) => (
                        <TableCell key={col.id}>
                          <Skeleton variant='text' width='100%' />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component='div'
          count={rows?.total || 0}
          rowsPerPage={10}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </>
  );
};

export default TableQuestion;
