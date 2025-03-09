import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Typography from '@mui/material/Typography';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { TBook } from '../../libs/types';
import { bookDelete, bookListing } from '../../libs/model/book';
import { toChapterList } from '../../libs/model/chapter';
import Confirmation from '../../components/Confirmation';
import { useGithubConfig } from '../../libs/hooks/github/useGithubConfig';
import { useError } from '../../libs/hooks/error/useError';

const BookList = () => {
  const navigate = useNavigate();
  const { addError } = useError();
  const githubConfig = useGithubConfig();
  const [books, setBooks] = useState<TBook[]>([]);
  const [deleteId, setDeleteId] = useState<string | undefined>();

  useEffect(() => {
    const load = async () => {
      const result = await bookListing(githubConfig);
      if (result.isOk()) {
        setBooks(result.getValue());
      } else {
        addError(result.getMessage());
      }
    };

    load();
  }, []);

  const onDelete = async (value: string) => {
    const result = await bookDelete(githubConfig, value);

    if (result.hasError()) {
      addError(result.getMessage());
      return;
    }

    setBooks(result.getValue());
  };

  const onUpdate = (id: string) => {
    navigate(`/trainer/books/update/${id}`);
  };

  const onShow = (id: string) => {
    navigate(toChapterList(id));
  };

  return (
    <>
      <Paper sx={{ paddingX: 8, paddingY: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <Typography variant='h6'>Book List</Typography>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead color='primary'>
                <TableRow hover>
                  <TableCell>Id</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((book) => (
                  <TableRow hover key={book.id}>
                    <TableCell>{book.id}</TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.description}</TableCell>
                    <TableCell>
                      <Tooltip title={`Delete book: ${book.id}`}>
                        <IconButton
                          color='primary'
                          onClick={() => {
                            setDeleteId(book.id);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={`Edit book: ${book.id}`}>
                        <IconButton
                          color='primary'
                          onClick={() => onUpdate(book.id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={`Show chapters: ${book.id}`}>
                        <IconButton
                          color='primary'
                          onClick={() => onShow(book.id)}
                        >
                          <FormatListBulletedIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction={'row'} gap={3}>
            <Button variant='contained' component={Link} to='/trainer/'>
              Cancel
            </Button>
            <Button
              variant='contained'
              component={Link}
              to='/trainer/books/create'
            >
              Create
            </Button>
          </Stack>
        </Box>
      </Paper>

      <Confirmation<string>
        title='Delete Book'
        message={`Do you want to delete the book: ${deleteId}?`}
        confirmValue={deleteId}
        setConfirmValue={setDeleteId}
        confirmFct={onDelete}
      />
    </>
  );
};

export default BookList;
